import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';


const HomeNavigator = createStackNavigator();
const MenuNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();


function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={{ headerTitle: "Menu"}}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
};

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: "#512DA8"},
                headerTitleStyle: {color: "#fff"},
                headerTintColor: "#fff"
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{ headerTitle: "Home"}} 
            />
        </HomeNavigator.Navigator>
    );
};

function MainNavigatorScreen() {
    return(
        <MainNavigator.Navigator
            initialRouteName="Main"
            drawerStyle={{backgroundColor: '#D1C4E9'}}
        >
            <MainNavigator.Screen 
                name="Home" 
                component={HomeNavigatorScreen}
                options={{ title: 'Home', drawerLabel: 'Home'}} 
            />
            <MainNavigator.Screen 
                name="Menu" 
                component={MenuNavigatorScreen} 
                options={{ title: 'Menu', drawerLabel: 'Menu'}}
            />
        </MainNavigator.Navigator>
    );
};


class Main extends Component {
  render() {
    return (
        <NavigationContainer>
            <MainNavigatorScreen/>           
        </NavigationContainer>
    );
  }
}
  
export default Main;