import React, {useEffect, useState} from "react";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {Button, Text, View} from 'react-native';
import {getToken} from '../helpers/authHelpers';


function NearPoisList(props){

    const [pois, setPois] = useState([]);
    const [error, setError] = useState(false);
    const [reload, setReload] = useState(1);

    const data = JSON.stringify({
        lat: `${props.latitude}`,
        lng: `${props.longitude}`
    });


    useEffect( () => {
        (async() => {
            const url = GUIDEO_API_URL + '/api/locations';
            const options = {
                method: "POST",
                body: data,
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await getToken()
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
        }) ()
    }, [reload]) ;

    const handleReload = () => {
        setReload(reload + 1);
    };


    return (<View>
            {pois.map((poi) =>{
                return <View key={poi.id}><Text>{poi.description}</Text></View>
            })}
            <Button onPress={handleReload} title={"hola"}/>
        </View>

    );






}


export default NearPoisList;