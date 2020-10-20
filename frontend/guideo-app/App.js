import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";
import { NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {getToken} from "./helpers/AuthHelper/AuthStorage";
import HomeScreen from "./views/HomeScreen";
import MyProfileScreen from "./views/MyProfileScreen";
import LanguageScreen from "./views/LanguageScreen";
import FavouritesScreen from './views/FavouritesScreen';
import ExploreScreen from "./views/ExploreScreen";
import {DrawerMenuContentNoToken} from "./components/DrawerMenuContentNoToken/DrawerMenuContentNoToken.view";
import {DrawerMenuContent} from "./components/DrawerMenuContent/DrawerMenuContent.view";
import {FavouritesReducer} from "./helpers/FavouritesHelper/FavouritesReducer";
import {LocationReducer} from "./helpers/LocationHelper/LocationReducer";
import {AuthReducer} from "./helpers/AuthHelper/AuthReducer";
import {LocationContext} from "./helpers/LocationHelper/LocationContext";
import {FavouritesContext} from "./helpers/FavouritesHelper/FavouritesContext";
import {AuthContext} from "./helpers/AuthHelper/AuthContext";

const Drawer = createDrawerNavigator();

export default function App({navigation}) {

    console.log("Your current URL is " + GUIDEO_API_URL);

    //Declare the reducer to send it to all the child components
    const [favouritesList, dispatchFavourites] = FavouritesReducer();
    const [locationCoordinates, dispatchLocations] = LocationReducer();
    const [authState, dispatchAuth] = AuthReducer();
    const [errorMsg, setErrorMsg] = useState(null);

    //We will load since the beginning our main location to send it as params to each component and use it for fetching, etc..
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                // TODO add here the logic in case user rejects location permission
                setErrorMsg('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({accuracy: 1});
            dispatchLocations({type: 'UPDATE_LOCATION', location })
        })();
    },[]);

    useEffect(() =>{
        (async () => {
            let token = await getToken();
            if(token){
                return dispatchAuth({ type: 'RESTORE_TOKEN', token: token});
            }
            return authState.isLoggedIn(false);
        })()
    },[]);

    return (
        <AuthContext.Provider value={{authState, dispatchAuth}}>
            <LocationContext.Provider value={{locationCoordinates, dispatchLocations}}>
                <FavouritesContext.Provider
                    value={{favouritesList, dispatchFavourites}}
                >
                    <NavigationContainer>
                        <Drawer.Navigator
                            initialRouteName={'Home'}
                            drawerContent={authState.isLoggedIn ?
                                    props => <DrawerMenuContent {...props} />
                                    :
                                    props => <DrawerMenuContentNoToken {...props}
                                    />}
                        >
                            <Drawer.Screen name="Home" component={HomeScreen}/>
                            <Drawer.Screen name="Profile" component={MyProfileScreen}/>
                            <Drawer.Screen name="Favourites" component={FavouritesScreen}/>
                            <Drawer.Screen name="Locations" component={ExploreScreen}/>
                            <Drawer.Screen name="Language" component={LanguageScreen}/>
                        </Drawer.Navigator>
                    </NavigationContainer>
                </FavouritesContext.Provider>
            </LocationContext.Provider>
        </AuthContext.Provider>

    );

};

