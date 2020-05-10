import {View, TextInput} from "react-native";
import {Spinner, Button, Text, Icon} from "native-base";
import React, {useState, useEffect} from "react";
import {ImageBackground} from "react-native";
import * as Font from 'expo-font';
import {styles} from "../Styles/Styles";
import {AppLoading} from 'expo';


function ListLocations({route, navigation}) {

    const [reload, setReload] = useState(1);
    const [locationFound, setLocationFound] = useState(true);
    const [locationData, setLocationData] = useState({
        "lon": route.params.locationData.lon,
        "lat": route.params.locationData.lat
    });
    //Creating this Region const will help us in the future to create searchings by main cities, now not used since we don't have regions in BBDD
    const [region, setRegion] = useState({
        region: null
    });
    const [loading, setLoading] = useState(true);

    //We do this useEffect for avoid font crash in android, see this link https://medium.com/@aragonalvarez/native-base-ui-components-solve-issue-with-roboto-font-on-android-fb58a5fe02e4
    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            });
            setLoading(false);
        })()
    });

    return (       
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {loading ?
                            <AppLoading />
                        :
                        <ImageBackground source={require("../Resources/ListLocations-image.jpg")}
                                         style={styles.backgroundImage}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <TextInput
                                    style={styles.searchPoisBar}
                                    placeholder="Where you will travel?"
                                    placeholderTextColor="white"
                                    onChangeText={text => setRegion(text)}
                                    editable
                                />
                                {locationFound ?
                                    <Button
                                        large
                                        style={styles.buttonCloseToMe}
                                        transparent
                                        onPress={() => navigation.navigate('Near Locations', {...locationData})}>
                                        <Icon style={{fontSize: 40, color: 'white'}} name='globe'/>
                                        <Text style={{
                                            fontFamily: (Platform.OS === 'ios') ? 'Verdana' : 'Roboto',
                                            fontSize: 20,
                                            color: 'white'
                                        }}>
                                            Close to me
                                        </Text>
                                    </Button> :
                                    <Spinner color='#4785ff'/>
                                }
                            </View>
                        </ImageBackground>
                    }
                </View>
            );
  }

export default ListLocations;

