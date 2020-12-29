import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';


const HomeNavigator = createStackNavigator();
const MenuNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

/*-------------------         Asignment 1 Changes          -------------------*/
const ContactNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();

function ContactNavigatorScreen() {
    return(
        <ContactNavigator.Navigator
            initialRouteName='Contact'
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
            <ContactNavigator.Screen 
                name="Contact"
                component={Contact}
                options={{ headerTitle: "Contact Us"}}
            />
        </ContactNavigator.Navigator>
    );
}

function AboutNavigatorScreen() {
    return(
        <AboutNavigator.Navigator
            initialRouteName='About'
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
            <ContactNavigator.Screen 
                name="About"
                component={About}
                options={{ headerTitle: "About Us"}}
            />
        </AboutNavigator.Navigator>
    );
}



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
                name="About Us"
                component={AboutNavigatorScreen}
                options={{ title: 'About', drawerLabel: 'About Us'}}
            />
            <MainNavigator.Screen 
                name="Menu" 
                component={MenuNavigatorScreen} 
                options={{ title: 'Menu', drawerLabel: 'Menu'}}
            />
            <MainNavigator.Screen
                name="Contact"
                component={ContactNavigatorScreen}
                options={{ title: 'Contact', drawerLabel: 'Contact Us'}}
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