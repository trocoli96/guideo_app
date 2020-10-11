import React from "react";
import LoginForm from "../components/LoginForm";

import { createStackNavigator } from '@react-navigation/stack';
import SignUpForm from "../components/SignUpForm";

const Stack = createStackNavigator();

function MyProfileScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login " component={LoginForm} />
            <Stack.Screen name="Signup" component={SignUpForm} />
        </Stack.Navigator>

    );
}

export default MyProfileScreen;