import React, {useState, useEffect} from "react";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {View, Text, Button} from 'react-native';
import {getToken} from '../helpers/authHelpers';


function NearPoisList(){

    const [pois, setPois] = useState([]);
    const [error, setError] = useState(false);
    const [reload, setReload] = useState(1);

    const data = {
        lat: 43.4659413,
        lng: 2.244840
    };


    useEffect(() => {
            const url = GUIDEO_API_URL + '/api/locations';
            const options = {
                method: "GET",
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }),
                mode: "cors"
            };

        const fetchData = async () => {
            return fetch(url, options)
                .then(response => {
                    if (response.status === 200){
                        return response.json();
                    }
                        return Promise.reject(response.status);
                })
                .then(data => {
                    return setPois(data);
                })
                .catch(err => {
                    if (error === 401){
                        setError(true);
                    }
                });
        };
        fetchData();
    }, [reload]);

    const handleReload = () => {
        setReload(reload + 1);
    };


    return (<View>
            <Text>hol</Text>
            <Button onPress={handleReload} title={"hola"}/>
        </View>

    );






}


export default NearPoisList;