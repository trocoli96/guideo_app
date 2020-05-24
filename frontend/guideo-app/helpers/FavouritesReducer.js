import React, {useReducer} from 'react';


/*
This reducer has 2 main actions for now, adding a favourite when we call the action type add-favourite, we push it to the initial state.

In case the action is remove, we find if the requested poi is already in the favourites, and then we deleted with the splice method
 */

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