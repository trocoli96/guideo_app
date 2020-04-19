import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, Button} from 'react-native';
import Logo from './logo.png';
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./views/HomeScreen";
import SettingsScreen from "./views/SettingsScreen";
import MyProfileScreen from "./views/MyProfileScreen";
import ListLocationsScreen from "./views/ListLocationsScreen";
import LanguageScreen from "./views/LanguageScreen";

const Tab = createBottomTabNavigator();


export default function App({navigation}) {

    return (
        <NavigationContainer>
            <Tab.Navigator
                
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home' : 'ios-home';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'ios-settings' : 'ios-settings';
                        } else if (route.name === 'Profile'){
                            iconName = focused ? 'ios-person' : 'ios-person';
                        } else if (route.name === 'Locations'){
                            iconName = focused ? 'ios-list' : 'ios-list';
                        } else if (route.name === 'Language'){
                            iconName = focused ? 'ios-globe' : 'ios-globe';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#4785ff',
                    inactiveTintColor: 'gray',
                    showLabel: false,
                    style: {
                        borderTopColor: '#E0E0E0',
                        borderTopWidth: '1px' 
                    }
                }}
            >
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Locations" component={ListLocationsScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Language" component={LanguageScreen} />
                <Tab.Screen name="Profile" component={MyProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: '80%',
        height:'50%'
    }
});

