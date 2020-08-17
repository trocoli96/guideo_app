import React, {useEffect, useState, useReducer} from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./views/HomeScreen";
import MyProfileScreen from "./views/MyProfileScreen";
import LanguageScreen from "./views/LanguageScreen";
import FavouritesScreen from './views/FavouritesScreen';
import ExploreScreen from "./views/ExploreScreen";
import * as Location from "expo-location";
import {FavouritesContext} from "./helpers/FavouritesContext";
import {FavouritesReducer} from "./helpers/FavouritesReducer";

const Tab = createBottomTabNavigator();

export default function App({navigation}) {

    //Declare the reducer to send it to all the child components
    const [favouritesList, dispatch] = FavouritesReducer();

    const [errorMsg, setErrorMsg] = useState(null);
    const [locationData, setLocationData] = useState({
        "lon": Number(null),
        "lat": Number(null)
    });

    //We will load since the beginning our main location to send it as params to each component and use it for fetching, etc..
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({accuracy: 1});
            setLocationData({
                "lon": location.coords.longitude,
                "lat": location.coords.latitude,
            });
        })();
    },[]);

    return (
        <FavouritesContext.Provider
            value={{favouritesList, dispatch}}
        >
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={'Home'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home' : 'ios-home';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'ios-star' : 'ios-star';
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
                        borderTopWidth: 1 
                    }
                }}
            >
                <Tab.Screen name="Settings" component={FavouritesScreen} />
                <Tab.Screen name="Locations">
                    {() => <ExploreScreen
                        //Sending here location params to all the child components inside this view
                        {...locationData} />}
                </Tab.Screen>
                <Tab.Screen name="Home">
                    {() => <HomeScreen
                        //Sending here location params to all the child components inside this view
                        {...locationData} />}
                </Tab.Screen>
                <Tab.Screen name="Language" component={LanguageScreen} />
                <Tab.Screen name="Profile" component={MyProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
        </FavouritesContext.Provider>

    );

};

