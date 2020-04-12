import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import {mapStyle} from '../Styles/MapStyle';
import * as Location from "expo-location";
import {watchPositionAsync} from "expo-location";
import MarkerImage from '../marker.png';

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
            height: Dimensions.get('window').height,
        },
    });



    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                         provider={PROVIDER_GOOGLE}
                         customMapStyle={mapStyle}
                         initialRegion={{
                             latitude: 41.3959454,
                             longitude: 2.17863,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}>
                    <Marker
                        coordinate={
                            {
                                latitude: 41.3959454,
                                longitude: 2.17863
                            }
                        }
                        title={"Pussy"}
                        description={"description"}
                        image={MarkerImage}
                    />
                </MapView>
            </View>
        </View>
    );
}


export default HomeScreen;
