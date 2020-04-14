import {Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import * as Location from 'expo-location';

function ListLocationsScreen() {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>List of Locations</Text>
        </View>
        );
}

export default ListLocationsScreen;