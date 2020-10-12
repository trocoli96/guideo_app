import React, {useContext} from 'react';
import {styles} from "../Styles/Styles";
import PoiCard from "./PoiCard";
import {ScrollView, View} from "react-native";
import {FavouritesContext} from "../helpers/FavouritesHelper/FavouritesContext";



function FavouritesList(){

    //we get the favourites from the context in App.js to map each poi with the same component as in ExploreScreen
    const favouritesContext = useContext(FavouritesContext);

    return(
        <View style={{ flex: 1}}>
        <ScrollView
            contentContainerStyle={styles.scrollView}
        >
            {
                favouritesContext.favouritesList.favourites.map((poi) => {
                    return <PoiCard {...poi} key={poi.id}/>
                })
            }

        </ScrollView>
        </View>

    )
}

export default FavouritesList;