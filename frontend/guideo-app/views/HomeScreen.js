import React, {useEffect, useState, useContext} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';
import {mapStyle} from '../Styles/MapStyle';
import {GUIDEO_API_URL} from "react-native-dotenv";
import {Icon, Button, Text, Fab} from "native-base";
import { useNavigation } from '@react-navigation/native';
import {LocationContext} from "../helpers/LocationHelper/LocationContext";

function HomeScreen() {

    const locationContext = useContext(LocationContext);
    const navigation = useNavigation();
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(false);
    const data =({
        query: {
            lat: `${locationContext.locationCoordinates.lat}`,
            lon: `${locationContext.locationCoordinates.lon}`
        },
        paginate: 100,
        only_coordinates: true
    });

    useEffect( () => {
        //Let's search for near locations in our backend
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
                    return setLocations(data.data);
                })
                .catch(err => {
                    if (error === 401){
                        setError(true);
                    }
                });
        };
        fetchData();
    },[locationContext]) ;


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        mapStyle: {
            width: Dimensions.get('window').width,
            height: '100%',
        },
        toggleMenuButton: {
            top: '40%',
            left: '30%',
            display: 'flex',
            backgroundColor: 'white'
        }
    });

    return (
        <View>
            <MapView style={styles.mapStyle}
                     provider={PROVIDER_GOOGLE}
                     customMapStyle={mapStyle}
                     showsUserLocation={true}
                     followsUserLocation={true}
                     showsMyLocationButton={true}
                     minZoomLevel={5}
                     pitchEnabled={false}
                     loadingEnabled={true}
                     initialRegion={{
                         latitude:  41.3959454,
                         longitude: 2.17863,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }}>
                <View>
                    <Fab
                        position="topLeft"
                        style={styles.toggleMenuButton}
                        onPress={() => navigation.toggleDrawer()}
                        title='toggleMenu'
                    >
                        <Icon name='menu' style={{color: 'grey'}} />
                    </Fab>
                </View>
                {locations.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{latitude: Number(`${marker.lat}`), longitude: Number(`${marker.lon}`)}}
                        anchor={{x: 1, y: 1}}
                    />
                ))}
            </MapView>
        </View>

    );
}

export default HomeScreen;
