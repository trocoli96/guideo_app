import React, {useState, useContext} from 'react';
import {Text, View, TextInput, Button} from "react-native";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {storeToken, removeToken} from '../helpers/authHelpers';

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

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

    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {loggedIn ?
            <View>
                <Text>You are logged in</Text>
                <Button title="Logout" onPress={logout}/>
            </View>
            : <View>
                <Text>My Profile</Text>
                <Text style={{textAlign: 'left'}}>Email</Text>
                <TextInput
                    style={{marginBottom: 20, width: 300, height: 40, borderColor: 'gray', borderWidth: 1}}
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)}
                    placeholder="Your email address"
                    returnKeyType="next"
                    editable
                />
                <Text>Password</Text>
                <TextInput
                    style={{marginBottom: 20, width: 300, height: 40, borderColor: 'gray', borderWidth: 1}}
                    textContentType="password"
                    autoCompleteType="password"
                    onChangeText={text => setPassword(text)}
                    placeholder="Your password"
                    returnKeyType="done"
                    secureTextEntry
                    editable
                />
                <Button
                    title="Login"
                    onPress={handleLogin}
                />
                {error ? <Text>ha habido algun error</Text> : null}
            </View>
        }</View>)


}


export default LoginForm;