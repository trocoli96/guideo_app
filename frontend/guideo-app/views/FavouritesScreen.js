import {Text, View} from "react-native";
import React from "react";
import { getToken } from "../helpers/authHelpers";


function FavouritesScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Favourites!</Text>
        </View>
    );
}

export default FavouritesScreen;