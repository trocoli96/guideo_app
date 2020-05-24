import React from "react";
import FavouritesList from "../components/FavouritesList";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


function FavouritesScreen() {

    //For now this component is just to add a title "Favourites" in the Favourites Screen, then in case of routing it will be possible

    return (<Stack.Navigator>
            <Stack.Screen
                name="Favourites"
                component={FavouritesList}
                />
        </Stack.Navigator>
    );
}

export default FavouritesScreen;