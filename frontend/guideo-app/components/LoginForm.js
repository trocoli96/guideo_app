import React, {useState, useContext} from 'react';
import {View, TextInput, Image, Text} from "react-native";
import {Button, Spinner, Icon} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { GUIDEO_API_URL } from 'react-native-dotenv';
import {styles} from '../Styles/Styles.js';
import {storeToken, removeToken} from '../helpers/authHelpers';

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const data = {
        email: email,
        password: password,
    };

    const handleLogin = async () => {
        setError(false);
        setIsFetching(true);

        const url = GUIDEO_API_URL + `/api/login`;
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                Accept: "application/json",
                "Content-type": "application/json"
            }),
        };

        return fetch(url, options)
            .then(response => {
                if (response.ok) {
                    console.log(response.status);
                    return response.json();
                }
                setError(true);
                return Promise.reject(response.status);
            })
            .then(async (data) => {
                const tokenSuccessfullyStored = await storeToken(data['access_token']);
                if (tokenSuccessfullyStored) {
                    setLoggedIn(true);
                }
                setIsFetching(false);
            }).catch(error => {
                console.log(error);
                setIsFetching(false);
                setError(true);
            });
    };

    const logout = async () => {
        const loggedOut = await removeToken();
        if (loggedOut) {
            setLoggedIn(false);
        }
    }

    //Se usará cuando haya Iconbutton (necesitamos libreria para eso)
    const viewpass = () => {
        setShowPassword(showPassword => !showPassword);
        console.log('changed');
    }

    return (<View style={styles.centeredView}>
        {loggedIn ?
        <View>
            <Text>You are logged in</Text>
            <Button title="Logout" onPress={logout} />
        </View>
            : 
        <View style={styles.centeredView}>
            <Image style={styles.logo} source={require('../logo.png')}/>
            <TextInput
                style={styles.formTextInput}
                placeholder="Email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCompleteType="email"
                onChangeText={text => setEmail(text)}
                editable
            />
            <TextInput
                style={styles.formTextInput}
                placeholder="Password"
                secureTextEntry={showPassword}
                autoCompleteType="password"
                onChangeText={text => setPassword(text)}
                editable
            />
            <Button iconLeft transparent onPress={viewpass} style={styles.passwordVisibleButton}>
                <Icon style={styles.passwordVisibleIcon}name='eye' />
            </Button>
            {error ? <Text style={styles.loginErrorText}>The username and or password is not correct!</Text> : null}
            { isFetching ?
            <Spinner color='#4785ff'/>
            :
            <Button
                style={styles.loginButton}
                title="LOGIN"
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>LOGIN</Text>
            </Button>
            }
            <Text>Are you new?</Text>
        </View>
    }</View> )


}


export default LoginForm;