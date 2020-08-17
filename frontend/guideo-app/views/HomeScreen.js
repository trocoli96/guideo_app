import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import {mapStyle} from '../Styles/MapStyle';
import {GUIDEO_API_URL} from "react-native-dotenv";

function HomeScreen(props) {

    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(false);
    const data =({
        query: {
            lat: `${props.lat}`,
            lon: `${props.lon}`
        },
        paginate: 100,
        only_coordinates: true
    });

    useEffect( () => {
        //Let's search for near locations in our backend
        console.log("fetching again pois...");
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
    },[props]) ;


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
    });


    return (
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
            {locations.map(marker => (
                <Marker
                    key={marker.id}
                    coordinate={{latitude: Number(`${marker.lat}`), longitude: Number(`${marker.lon}`)}}
                    anchor={{x: 1, y: 1}}
                />
            ))}
        </MapView>
    );
}

export default HomeScreen;
