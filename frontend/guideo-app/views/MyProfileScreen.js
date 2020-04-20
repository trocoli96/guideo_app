import {Text, View} from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";
import {styles} from '../Styles/Styles.js';


function MyProfileScreen() {
    return (
        <View style={styles.centeredView}>
            <LoginForm/>
        </View>
    );
}

export default MyProfileScreen;