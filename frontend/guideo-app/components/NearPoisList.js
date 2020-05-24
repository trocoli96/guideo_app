import React, {useEffect, useState, useContext} from "react";
import {GUIDEO_API_URL} from 'react-native-dotenv';
import {View, ScrollView} from 'react-native';
import {styles} from "../Styles/Styles";
import PoiCard from "../components/PoiCard";
import {AppLoading} from "expo";


function NearPoisList(props){

    const [pois, setPois] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const data = ({
        lat: `${props.route.params.lat}`,
        lon: `${props.route.params.lon}`
    });

    useEffect( () => {
        //Let's search for near locations in our backend
        setLoading(true);
            const url = GUIDEO_API_URL + '/api/locations';
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                mode: "cors"
            };
            const fetchData = async () => {
                return fetch(url, options)
                    .then(response => {
                        if (response.status === 200){
                            return response.json();
                        }
                        return Promise.reject(response.status);
                    })
                    .then(data => {
                        setLoading(false);
                        return setPois(data);
                    })
                    .catch(err => {
                        if (error === 401){
                            setError(true);
                        }
                    });
            };
            fetchData();
    }, []) ;


    return (
        <View style={{flex: 1}}>
            {loading ? <View><AppLoading/></View> :
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                >
                    {
                        pois.map((poi) => {
                            //We send the information from the poi with a key value in this case the ID
                            return <PoiCard {...poi} key={`${poi.id}`}/>
                        })
                    }
                </ScrollView>
            }
        </View>

    );
}


export default NearPoisList;