import React from 'react';
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Text} from "react-native";


export function DrawerContent(props) {


    return(
        <DrawerContentScrollView>
            <DrawerItem
                label='CloseMenu'
                onPress={() => props.navigation.closeDrawer()}
            />
        </DrawerContentScrollView>
    )
}