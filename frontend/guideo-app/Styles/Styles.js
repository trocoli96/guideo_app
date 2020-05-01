import React from 'react';
import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create(
{
    centeredView: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    formTextInput: {
        width: 300, 
        height: 40, 
        borderWidth: 1,
        paddingLeft: 10,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1.5,
        marginBottom: 40,
    },
    logo :{
        width: 150,
        height: 150,
        marginTop: -50,
        marginBottom: 50
    },
    passwordview: {
        display: 'flex',
        marginTop: -300,
        borderColor: 'black'
    },
    loginErrorText : {
        color: 'red',
        fontSize: 12
    },
    loginButtonText: {
        color: 'white',
        fontSize: 20
    },
    loginButton: {
        width: 300, 
        justifyContent: 'center', 
        backgroundColor: '#4785ff',
        borderRadius: 100,
        marginBottom: 50
    },
    passwordVisibleButton: {
        display: 'flex',
        marginLeft: 250,
        marginTop: -85,
        marginBottom: 30
    },
    passwordVisibleIcon: {
        color: '#d9d9d9'
    }

});