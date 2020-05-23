import React, {useState, useContext} from 'react';
import {View, Text, Button, Image, TextInput} from 'react-native';
import {styles} from "../Styles/Styles";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {removeToken, storeToken} from "../helpers/authHelpers";

export default function SignupForm({navigation}) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [loginAfterSignup, setLoginAfterSignup] = useState(false);

    const data = {
        first_name: name,
        last_name: surname,
        email: email,
        password: password
    };

    function returnHome() {
        navigation.navigate('Home');
    }

    const HandleOfSubmit = async () => {
        setError(false);
        setIsFetching(true);

        console.log(data);
        const url = GUIDEO_API_URL + `/api/user`;
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
            }).then(async ( data) => {
                const tokenSuccessfullyStored = await storeToken(data['access_token']);
                if (tokenSuccessfullyStored) {
                    setLoginAfterSignup(true);
                    setIsFetching(false);
                    setTimeout(()=> returnHome(), 3500) ;
                } else {
                    setError(true);
                    setIsFetching(false);
                }

            }).catch(error => {
                console.log(error);
                setIsFetching(false);
                setError(true);
            });

    };

    return (<View style={styles.centeredView}>
            {loginAfterSignup ?
                <View>
                    <Text>Signup done, welcome to Guideo! :)</Text>
                </View> :
                <View style={styles.centeredView}>
                    <Image style={styles.logo} source={require('../Resources/logo.png')}/>
                    <TextInput
                        style={styles.formTextInput}
                        textContentType="name"
                        autoCompleteType="name"
                        placeholder="Name"
                        keyboardType="default"
                        onChangeText={text => setName(text)}
                        editable
                    />
                    <TextInput
                        style={styles.formTextInput}
                        textContentType="familyName"
                        autoCompleteType="name"
                        placeholder="Surname"
                        keyboardType="default"
                        onChangeText={text => setSurname(text)}
                        editable
                    />

                    <TextInput
                        style={styles.formTextInput}
                        textContentType="emailAddress"
                        autoCompleteType="email"
                        placeholder="email@adress.com"
                        keyboardType="email-address"
                        onChangeText={text => setEmail(text)}
                        editable
                    />
                    <TextInput
                        style={styles.formTextInput}
                        textContentType="password"
                        autoCompleteType="password"
                        placeholder="Password"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        editable
                    />
                    <Button
                        title="SIGNUP"
                        onPress={HandleOfSubmit}
                    />

                    {error ?
                        <Text>There was an error in the signup process</Text> : null}
                </View>}
        </View>);
}



