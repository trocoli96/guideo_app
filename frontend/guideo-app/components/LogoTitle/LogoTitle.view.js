import React from 'react';
import {Image} from "react-native";
import {styles} from './styles';



//The only way to take the logo and don't crash in IOS and Android
function LogoTitle() {
    return (
        <Image
            style={styles.logoTitle}
            source={require('../../Resources/logo-letters.png')}
        />
    );
}

export default LogoTitle;