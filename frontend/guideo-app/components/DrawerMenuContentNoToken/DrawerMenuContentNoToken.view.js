import React from 'react';
import {DrawerContentScrollView, DrawerItem,} from "@react-navigation/drawer";
import {Header, Content, Button, Icon, Left, Right, Text} from 'native-base';
import {styles} from './styles';
import LogoTitle from "../LogoTitle";

export function DrawerMenuContentNoToken(props) {

    return(
        <DrawerContentScrollView>
            <Header style={styles.headerContainer}>
                <Left>
                    <LogoTitle />
                </Left>
                <Right>
                <Button
                        style={styles.crossButton}
                        title={"Close"}
                        onPress={() => props.navigation.closeDrawer()}
                        iconLeft
                        light
                    >
                        <Icon name='close' style={styles.crossIcon} />
                    </Button>
                </Right>
            </Header>
            <Content>
                    <DrawerContentScrollView>
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name='home'
                                style={styles.menuIcons}
                            />
                        )}
                        label='Home'
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem
                        icon={() => (
                            <Icon
                                name='person'
                                style={styles.menuIcons}
                            />
                        )}
                        label='Login'
                        onPress={() => props.navigation.navigate('Profile')}
                    />
                    <DrawerItem
                    icon={() => (
                    <Icon
                        name='star'
                        style={styles.menuIcons}
                    />
                )}
                    label='Favourites'
                    onPress={() => props.navigation.navigate('Favourites')}
                    />
                    <DrawerItem
                    icon={() => (
                    <Icon
                        name='search'
                        style={styles.menuIcons}
                    />
                )}
                    label='Locations'
                    onPress={() => props.navigation.navigate('Locations')}
                    />
                    <DrawerItem
                    icon={() => (
                    <Icon
                        name='globe'
                        style={styles.menuIcons}
                    />
                )}
                    label='Language'
                    onPress={() => props.navigation.navigate('Language')}
                    />
                    </DrawerContentScrollView>
            </Content>
        </DrawerContentScrollView>
    )
}