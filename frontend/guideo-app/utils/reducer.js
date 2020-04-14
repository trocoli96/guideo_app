import {useReducer} from 'react';

const initialState = {
    token: null
};

// actions
const DO_LOGOUT = 'DO_LOGOUT';

const AuthorizationReducer = (state = initialState, action) => {
    const newState = {...state};
    const {type} = {...action};

    if (type === DO_LOGOUT) {
        newState.token = null;
        localStorage.removeItem("TOKEN_KEY");
        console.log("Token borrado del estado y de localStorage.");
    }

    return newState;
}

export const AuthReducer = () => useReducer(AuthorizationReducer, initialState);