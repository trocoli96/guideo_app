import React, {useEffect, useState} from "react";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {Button, View, ScrollView, RefreshControl} from 'react-native';
import {Card, CardItem, Body, Text, Title, Icon} from "native-base";
import {styles} from "../Styles/Styles";


function NearPoisList(props){

    const [pois, setPois] = useState([]);
    const [error, setError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reload, setReload] = useState(1);
    const data = ({
        lat: `${props.route.params.lat}`,
        lon: `${props.route.params.lon}`
    });


    useEffect( () => {
        //Let's search for near locations in our backend
        setRefreshing(true);
            const url = GUIDEO_API_URL + '/api/locations';
            const options = {
                method: "POST",
                body: JSON.stringify(data),
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

    return (
        <View style={{flex: 1}}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleReload}/>
                }
            >
                {
                    pois.map((poi) => {
                        return <View key={poi.id}>
                            <Card style={styles.cardListLocations}>
                                <CardItem style={{width: '100%'}}>
                                    <View style={{backgroundColor: 'grey', height: 80, width: 80}}/>
                                    <Body style={{flex: 1, paddingLeft: 10}}>
                                        <Title style={{
                                            fontFamily: (Platform.OS === 'ios') ? 'Verdana' : null,
                                            paddingLeft: 0,
                                            color: 'black'
                                        }}>{poi.name}</Title>
                                        <Text note style={{fontSize: 12}} numberOfLines={2}>{poi.description} que te va
                                            a esneeñlsjd dfjv lkeerob efoivjvve hola que tal jaja </Text>
                                        <View style={{flexDirection: 'row', paddingTop: 7}}>
                                            <Icon name='play' style={{color: '#cecdcc', fontSize: 20}}/><Text note
                                                                                                              style={{
                                                                                                                  paddingTop: 2,
                                                                                                                  paddingLeft: 4
                                                                                                              }}>01:40</Text>
                                        </View>
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