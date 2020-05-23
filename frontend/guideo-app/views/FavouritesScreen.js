import React, {useContext, useState} from "react";
import {FavouritesContext} from "../helpers/FavouritesContext";
import FavouritesList from "../components/FavouritesList";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


function FavouritesScreen() {

    return (<Stack.Navigator>
            <Stack.Screen
                name="Favourites"
                component={FavouritesList}
                />
        </Stack.Navigator>
    );
}

export default FavouritesScreen;