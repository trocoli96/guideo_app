import React, {useReducer} from 'react';

const initialState = {
    isLoading: true,
    isLoggedIn: false,
    userToken: null,
}

const reducer = (prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'SIGN_IN':
                return {
                    ...prevState,
                    isLoggedIn: true,
                    userToken: action.token,
                };
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isLoggedIn: false,
                    userToken: null,
                };
        }
    };


export const AuthReducer = () => useReducer(reducer, initialState);