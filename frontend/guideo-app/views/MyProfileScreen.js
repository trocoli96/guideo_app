import {Text, View} from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";


function MyProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoginForm/>
        </View>
    );
}

export default MyProfileScreen;