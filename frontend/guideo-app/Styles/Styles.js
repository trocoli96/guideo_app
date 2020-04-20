import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create(
{
    centeredView: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    formTextInput: {
        marginBottom: 20, 
        width: 300, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        paddingLeft: 10,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1.5,
        marginBottom: 40
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
    }
});