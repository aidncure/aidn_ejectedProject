import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import HomeScreen from "../screens/Home/HomeScreen";
import ScheduleScreen from "../screens/Schedule/ScheduleScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import QrScreen from "../screens/Profile/QrScreen";
import UsersProfileScreen from "../screens/Profile/userProfileScreen"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TabNavigator = createAppContainer(
    createBottomTabNavigator(
        {
            Home: {
                screen: HomeScreen,
                navigationOptions: {
                    header: () => null,
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Ionicons name="logo-electron" size={24} color={tintColor} />
                            </TouchableOpacity>
                            : <Ionicons name="logo-electron" size={24} color={tintColor} />
                    ),
                },
            },
            Scedule: {
                screen: ScheduleScreen,
                navigationOptions: {
                    tabBarLabel: 'Schedule',
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Ionicons name="newspaper-outline" size={24} color={tintColor} />
                            </TouchableOpacity>
                            : <Ionicons name="newspaper-outline" size={24} color={tintColor} />
                    ),
                },
            },
            Chat: {
                screen: QrScreen,
                navigationOptions: {
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Ionicons name="qr-code-outline" size={24} color={tintColor} />
                            </TouchableOpacity>
                            : <Ionicons name="qr-code-outline" size={24} color={tintColor} />
                    ),
                }
            },
            Profile: {
                screen: UsersProfileScreen,
                navigationOptions: {
                    header: () => null,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Ionicons name="happy-outline" size={24} color={tintColor} />
                            </TouchableOpacity>
                            : <Ionicons name="happy-outline" size={24} color={tintColor} />
                    ),
                }
            },
        },
        {
            initialRouteName: "Home",
            barStyle: { backgroundColor: 'white' },
            tabBarOptions: {
                showLabel: false,
                activeTintColor: '#6979F8',
                style: { height: 70.0, elevation: 0.0, borderTopWidth: 0 },
            },
        },
    )
);

export default TabNavigator;

const styles = StyleSheet.create({
    circleStyle: {
        height: 50.0,
        width: 50.0,
        backgroundColor: '#F5F5F5',
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});