import React, {useEffect, useState} from "react";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {Button, Text, View, ScrollView, RefreshControl} from 'react-native';
import {Card, CardItem, Image, Body, Spinner, SafeAreaView} from "native-base";
import {styles} from "../Styles/Styles";


function NearPoisList(props){

    const [pois, setPois] = useState([]);
    const [error, setError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reload, setReload] = useState(1);
    const data = JSON.stringify({
        lat: `${props.route.params.lat}`,
        lng: `${props.route.params.lon}`
    });


    useEffect( () => {
        setRefreshing(true);
            const url = GUIDEO_API_URL + '/api/locations';
            const options = {
                method: "POST",
                body: data,
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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
                        setRefreshing(false);
                        return setPois(data);
                    })
                    .catch(err => {
                        if (error === 401){
                            setError(true);
                        }
                    });
            };
            fetchData();
    }, [reload]) ;

    const handleReload = () => {
        setReload(reload + 1);
    };

    return (<View style={{flex: 1}}>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleReload} />
                        }
                    >
                    {
                        pois.map((poi) => {
                            return <View key={poi.id}>
                                <Card style={{flex: 0}}>
                                    <CardItem style={{width: 200}}>
                                        <Body>
                                            <Text>{poi.description}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        })
                    }
                    </ScrollView>
        </View>

    );
}


export default NearPoisList;