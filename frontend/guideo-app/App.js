import React, {useEffect, useState} from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from "./views/HomeScreen";
import MyProfileScreen from "./views/MyProfileScreen";
import LanguageScreen from "./views/LanguageScreen";
import FavouritesScreen from './views/FavouritesScreen';
import ExploreScreen from "./views/ExploreScreen";
import * as Location from "expo-location";
import {FavouritesContext} from "./helpers/FavouritesContext";
import {FavouritesReducer} from "./helpers/FavouritesReducer";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {DrawerContent} from "./components/DrawerContent";

const Drawer = createDrawerNavigator();

export default function App({navigation}) {

    console.log("Your current URL is " + GUIDEO_API_URL);

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
                // TODO add here the logic in case user rejects location permission
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
            <Drawer.Navigator
                initialRouteName={'Home'}
                drawerType={'back'}
                drawerContent={props => <DrawerContent {...props} />}
            >
                <Drawer.Screen name="Favourites" component={FavouritesScreen} />
                <Drawer.Screen name="Locations">
                    {() => <ExploreScreen
                        //Sending here location params to all the child components inside this view
                        {...locationData}/>}
                </Drawer.Screen>
                <Drawer.Screen name="Home">
                    {() => <HomeScreen
                        //Sending here location params to all the child components inside this view
                        {...locationData} />}
                </Drawer.Screen>
                <Drawer.Screen name="Language" component={LanguageScreen} />
                <Drawer.Screen name="Profile" component={MyProfileScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
        </FavouritesContext.Provider>

    );

};

