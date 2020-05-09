import {View, TextInput} from "react-native";
import {Spinner, Button, Text, Icon} from "native-base";
import React, {useState, useEffect} from "react";
import {ImageBackground} from "react-native";
import {styles} from "../Styles/Styles";


function ListLocations({route, navigation}) {

    const [reload, setReload] = useState(1);
    const [locationFound, setLocationFound] = useState(true);
    const [locationData, setLocationData] = useState({
        "lon": null,
        "lat": null
    });
    const [region, setRegion] = useState({
        region: null
    });

    useEffect(() => {
        if (route !== null){
            setLocationData({
                "lon": route.params.locationData.lon,
                "lat": route.params.locationData.lat
            });
            return setLocationFound(true);
        }
        setReload(reload + 1);
    },[reload]);

    return (       
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ImageBackground source={require("../Resources/ListLocations-image.jpg")} style={styles.backgroundImage}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                                    color:'white'
                                }}>
                                    Close to me
                                </Text>
                            </Button> :
                            <Spinner color='#4785ff' />
                        }
                    </View>
                    </ImageBackground>
                </View>
            );
  }

export default ListLocations;

