import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
})


const HomeNavigator = createStackNavigator();
const MenuNavigator = createStackNavigator();
const MainDrawerNavigator = createDrawerNavigator();
const ContactNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();


const DrawerNavigatorIcon = ({ navigation }) => {
    return (
        <Icon 
            iconStyle={{ padding: 15}}
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
    )
}

const DrawerIcon = ({ name, size, color }) => {
    return (
        <Icon 
            name={name}
            type='font-awesome'
            size={size ? size : 24}
            color={color ? color : '#000'}
        />
    )
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 1.75 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props}/>
        </SafeAreaView>
    </DrawerContentScrollView>
);

function ReservationNavigatorScreen({ navigation }) {
    return(
        <ReservationNavigator.Navigator
            initialRouteName='Reservation'
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
                name="Reservation"
                component={Reservation}
                options={{ 
                    headerTitle: "Reserve Table",
                    headerLeft: () => <DrawerNavigatorIcon navigation={navigation} />
                }}
            />
        </ReservationNavigator.Navigator>
    )
}

function ContactNavigatorScreen({ navigation }) {
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
                options={{ 
                    headerTitle: "Contact Us",
                    headerLeft: () => <DrawerNavigatorIcon navigation={navigation} />
            }}
            />
        </ContactNavigator.Navigator>
    );
}

function AboutNavigatorScreen({ navigation }) {
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
                options={{ 
                    headerTitle: "About Us",
                    headerLeft: () => <DrawerNavigatorIcon navigation={navigation} />
                }}
            />
        </AboutNavigator.Navigator>
    );
}


function MenuNavigatorScreen({ navigation }) {
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
                options={{ 
                    headerTitle: "Menu",
                    headerLeft: () => <DrawerNavigatorIcon navigation={navigation} />
                }}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ 
                    headerTitle: "Dish Detail",
                }}
            />            
        </MenuNavigator.Navigator>
    );
};

function HomeNavigatorScreen({ navigation }) {
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
                options={{ 
                    headerTitle: "Home",
                    headerLeft: () => <DrawerNavigatorIcon navigation={navigation} />
                }} 
            />
        </HomeNavigator.Navigator>
    );
};

function MainDrawerNavigatorScreen() {
    return(
        <MainDrawerNavigator.Navigator
            initialRouteName="Main"
            drawerStyle={{backgroundColor: '#D1C4E9'}}
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
        >
            <MainDrawerNavigator.Screen 
                name="Home" 
                component={HomeNavigatorScreen}
                options={{ 
                    title: 'Home', 
                    drawerLabel: 'Home',
                    drawerIcon: () => <DrawerIcon name="home" />
                }} 
            />
            <MainDrawerNavigator.Screen 
                name="About Us"
                component={AboutNavigatorScreen}
                options={{ 
                    title: 'About', 
                    drawerLabel: 'About Us',
                    drawerIcon: () => <DrawerIcon name="info-circle" />
                }}
            />
            <MainDrawerNavigator.Screen 
                name="Menu" 
                component={MenuNavigatorScreen} 
                options={{ 
                    title: 'Menu', 
                    drawerLabel: 'Menu',
                    drawerIcon: () => <DrawerIcon name="list" />
                }}
            />
            <MainDrawerNavigator.Screen
                name="Contact"
                component={ContactNavigatorScreen}
                options={{ 
                    title: 'Contact', 
                    drawerLabel: 'Contact Us',
                    drawerIcon: () => <DrawerIcon name="address-card" size={21} />
                }}
            />
            <MainDrawerNavigator.Screen
                name="Reservation"
                component={ReservationNavigatorScreen}
                options={{ 
                    title: 'Reservation', 
                    drawerLabel: 'Reserve Table',
                    drawerIcon: () => <DrawerIcon name="cutlery" size={24} />
                }}
            />
        </MainDrawerNavigator.Navigator>
    );
};

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

  render() {
    return (
        <NavigationContainer>
            <MainDrawerNavigatorScreen/>           
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);