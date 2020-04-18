import {Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import * as Location from 'expo-location';

function ListLocationsScreen() {

    const [locationData, setLocationData] = useState({
        "longitude": null,
        "latitude": null
    });
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({accuracy: 6});
        return setLocationData({
            "longitude": location.coords.longitude,
            "latitude": location.coords.latitude
        });
      })();
    });
  
    return (       
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>hola</Text>
                        <Text>{locationData.longitude}</Text>
                        <Text>{locationData.latitude}</Text>
                    </View>
                </View>
            );
  }

export default ListLocationsScreen;

