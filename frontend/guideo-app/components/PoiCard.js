import React, {useContext, useState, useEffect} from 'react';
import {Body, Card, CardItem, Icon, Text, Title, Button} from "native-base";
import {styles} from "../Styles/Styles";
import {View} from "react-native";
import {FavouritesContext} from "../helpers/FavouritesContext";
import { Ionicons } from "@expo/vector-icons";


/**
 * @return {boolean}
 */
function PoiCard(props) {

    const favourites = useContext(FavouritesContext);
    const [alreadyFavourite, setAlreadyFavourite] = useState(false);


    //Determine the state of each poi, if it's founded in the reducer, alreadyFavourite is true
    useEffect(() => {
        if (favourites.favourite.favourites === null){
            setAlreadyFavourite(false);
        }
        const toRemove = props.id;
        const index = favourites.favourite.favourites.findIndex(x => x.id === toRemove);
        return setAlreadyFavourite(index > -1);
    });
    
    //Action for the poi to add it as a poi or remove it in case the state in already favourite is false
    const handleFavourite = () => {
        if (alreadyFavourite === false) {
            favourites.dispatch({type: "add-favourite", props})
            return setAlreadyFavourite(true);
        }
        favourites.dispatch({type: "remove-favourite", props})
        return setAlreadyFavourite(false);

    };

    return (
        <View>
            <Card style={styles.cardListLocations}>
                <CardItem style={{width: '100%'}}>
                    <View style={{backgroundColor: 'grey', height: 80, width: 80}}/>
                    <Body style={{flex: 1, paddingLeft: 10}}>
                        <Title style={{
                            fontFamily: (Platform.OS === 'ios') ? 'Verdana' : null,
                            paddingLeft: 0,
                            color: 'black'
                        }}>{props.name}</Title>
                        <Text note style={{fontSize: 12, minHeight: 30}} numberOfLines={2}>{props.description} </Text>
                        <View style={{flexDirection: 'row', paddingTop: 7, width: '100%'}}>
                            <Icon name='play' style={{color: '#cecdcc', fontSize: 20}}/>
                            <Text note
                              style={{
                                  paddingTop: 2,
                                  paddingLeft: 4
                              }}>01:40</Text>
                            <Button onPress={handleFavourite} transparent style={{height: 20}}>
                                <Ionicons name={alreadyFavourite ? 'md-heart' : 'md-heart-empty'} size={20} style={{color: '#cdcdcc', paddingLeft: 150}}/>
                            </Button>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        </View>
    );
    



}

export default PoiCard;