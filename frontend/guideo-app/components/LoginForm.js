import React, {useState, useContext} from 'react';
import {Text, View, TextInput, Button} from "react-native";


function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const data = {
        email: email,
        password: password,
    };

    const handleLogin = (e) => {
        setError(false);
        setIsFetching(true);
        const fetchData = async () =>{
            const url = "http://127.0.0.1/api/login";
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-type": "application/json"
                }),
            };
            return fetch(url, options)
                .then (response => {
                    if (response.status === 200){
                        console.log(response.status);
                        return response.json();
                    }
                    setError(true);
                    return Promise.reject(response.status);
                })
                .then(data => {
                    setLoggedIn(true);
                    setIsFetching(false);
                    console.log('login succesfully');
                }).catch(error => {
                    console.log(error);
                    setIsFetching(false);
                    if (error === 401) {
                        setError(true);
                        console.log(error);
                    }
                });
        };
        fetchData();
    };

    const logout = () => {
        setLoggedIn(false);
    }

    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {loggedIn ?
        <View>
            <Text>You are logged in</Text>
            <Button title="Logout" onPress={logout} />
        </View>
            : <View>
            <Text>My Profile</Text>
            <Text style={{textAlign: 'right'}}>Email</Text>
            <TextInput
                style={{marginBottom: 20, width: 300, height: 40, borderColor: 'gray', borderWidth: 1}}
                textContentType="emailAddress"
                autoCompleteType="email"
                onChangeText={text => setEmail(text)}
                editable
            />
            <Text>Password</Text>
            <TextInput
                style={{marginBottom: 20, width: 300, height: 40, borderColor: 'gray', borderWidth: 1}}
                textContentType="emailAddress"
                autoCompleteType="password"
                onChangeText={text => setPassword(text)}
                editable
            />
            <Button
                title="Login"
                onPress={handleLogin}
            />
            {error ? <Text>ha habido algun error</Text> : null}
            </View>
    }</View> )


}



export default LoginForm;