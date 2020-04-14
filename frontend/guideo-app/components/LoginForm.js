import React, {useEffect, useState, useContext} from 'react';
import {Text, View, TextInput, Button} from "react-native";





function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);


    const data = {
        email: email,
        password: password,
    };

    const handleLogin = (e) => {
        setError(false);
        setIsFetching(true);
        const fetchData = async () =>{
            const url = "http://127.0.0.1:80/api/login";
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-type": "application/json"
                }),
                mode: "cors"
            };
            return fetch(url, options)
                .then (response => {
                    if (response.status === 200){
                        console.log(response.status);
                        return response.json();
                    }
                    console.log(response.status);
                    return Promise.reject(response.status);
                })
                .then(data => {
                    saveToken(data);
                    setIsFetching(false);
                    console.log('login succesfully');
                }).catch(error => {
                    setIsFetching(false);
                    console.log(error);
                    if (error === 401) {
                        setError(true);
                        console.log("hola");
                    }
                });
        };
        fetchData();
    };

    return  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>My Profile!</Text>
                <Text style={{textAlign: 'right'}}>Email</Text>
                <TextInput
                            style={{ marginBottom: 20, width: 300, height: 40, borderColor: 'gray', borderWidth: 1 }}
                            textContentType = "emailAddress"
                            autoCompleteType = "email"
                            onChange={(e) => setEmail(e.target.value)}
                            editable
                        />
                <Text>Password!</Text>
                <TextInput
                                    style={{ marginBottom: 20, width: 300, height: 40, borderColor: 'gray', borderWidth: 1}}
                                    textContentType = "emailAddress"
                                    autoCompleteType = "password"
                                    secureTextEntry = 'true'
                                    onChange={(e) => setEmail(e.target.value)}
                                    editable
                        />
                <Button
                    title="Login"
                    onPress={handleLogin}
                    />

            </View>

}



export default LoginForm;