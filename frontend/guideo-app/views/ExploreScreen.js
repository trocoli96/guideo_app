import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListLocations from "../components/ListLocations";
import NearPoisList from "../components/NearPoisList";
import {Image} from 'react-native';

const Stack = createStackNavigator();


function LogoTitle() {
    return (
        <Image
            style={{ width: 200, height: 90 }}
            source={require('../Resources/logo-letters.png')}
        />
    );
}

function ExploreScreen(props){
    const [locationData, setLocationData] = useState({
        "lon": props.lon,
        "lat": props.lat
    });

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: {
                        height: 130
                    }
                }}
                name="Explore"
                component={ListLocations}
                initialParams={{locationData}}
            />
            <Stack.Screen
                name="Near Locations"
                component={NearPoisList} />
        </Stack.Navigator>
    );
}

export default ExploreScreen;