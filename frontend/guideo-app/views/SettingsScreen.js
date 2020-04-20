import {Text, View} from "react-native";
import React from "react";
import { getToken } from "../helpers/authHelpers";


function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings! Changing this to trigger Actions</Text>
        </View>
    );
}

export default SettingsScreen;