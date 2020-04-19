import {AsyncStorage} from 'react-native';

export async function storeToken(token) {
    try {
        await AsyncStorage.setItem('token', token);
        console.log("Token stored successfully.");
        return true;
    } catch (error) {
        console.log("Error when storing token at AsyncStorage: " + e)
        return error;
    }
}

export async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            return token;
        }
    } catch (error) {
        console.log("Error at retrieving token from AsyncStorage: ", error)
    }
};

export async function removeToken() {
    try {
        const token = await AsyncStorage.removeItem('token');
        console.log("Token removed successfully.");
        return true;
    } catch (error) {
        console.log("Error at removing token from AsyncStorage: ", error)
    }
};
