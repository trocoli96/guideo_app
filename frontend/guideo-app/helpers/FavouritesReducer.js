import React, {useReducer} from 'react';


const initialState  = {
    favourites: []
};


const reducer = (state = initialState, action) => {
    const newState = {...state};

    if (action.type === "add-favourite"){
        newState.favourites.push(action.props);
    }
    if (action.type === "remove-favourite"){
        const toRemove = action.props.id;
        const index = newState.favourites.findIndex(x => x.id === toRemove);
        if (index > -1){
            newState.favourites.splice(index, 1);
        }
    }
    return newState


};


export const FavouritesReducer = () => useReducer(reducer, initialState);