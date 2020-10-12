import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListLocations from "../components/ListLocations";
import NearPoisList from "../components/NearPoisList";
import LogoTitle from "../components/LogoTitle";
import {LocationContext} from "../helpers/LocationHelper/LocationContext";

const Stack = createStackNavigator();

function ExploreScreen(){

    const locationContext = useContext(LocationContext);
    const locationData = ({
        "lon": locationContext.locationCoordinates.lon,
        "lat": locationContext.locationCoordinates.lat
    });

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: {
                        height: 100
                    },
                    headerTitleAlign: "center"
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
