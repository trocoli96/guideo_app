import React, {useReducer} from 'react';


/* This reducer has the actions to insert the current location and updated */


const initialState = {
    lon: Number(null),
    lat: Number(null)
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if (action.type === "UPDATE_LOCATION"){
        newState.lon = action.location.coords.longitude;
        newState.lat = action.location.coords.latitude;
    }
    return newState
};


export const LocationReducer = () => useReducer(reducer, initialState);