import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import {mapStyle} from '../Styles/MapStyle';

function HomeScreen({navigation}) {

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
        </MapView>
    );
}


export default HomeScreen;
