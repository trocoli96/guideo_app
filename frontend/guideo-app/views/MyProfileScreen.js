import React, {useContext} from "react";
import LoginForm from "../components/LoginForm";
import { createStackNavigator } from '@react-navigation/stack';
import SignUpForm from "../components/SignUpForm";
import {AuthContext} from "../helpers/AuthHelper/AuthContext";

const Stack = createStackNavigator();

function MyProfileScreen() {
    const AuthContext = useContext(AuthContext);
    console.log(AuthContext);

    return (
            <Stack.Navigator>
                <Stack.Screen name="Login " component={LoginForm} />
                <Stack.Screen name="Signup" component={SignUpForm} />
            </Stack.Navigator>
);
}

export default MyProfileScreen;