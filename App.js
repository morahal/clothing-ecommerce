import React from 'react';
import { View, Dimensions, StyleSheet,Animated, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './components/home';
import MenuPage from './components/menu';
import NavBar from './components/navbar';
import AccountPage from './components/account';
import MenuStackScreen from './components/menu';

const Tab = createBottomTabNavigator();


const { height: viewportHeight } = Dimensions.get('window');
const navbarHeight = 80; // Adjust as needed

function HomeScreen() {
  return <HomePage />;
}

function MenuScreen() {
  return <MenuPage />;
}

function AccountScreen() {
  return <AccountPage />;
}

function BagScreen() {
  return <BagPage />;
}

const headerHeight = 130; // Height of the header, adjust as needed

const App = () => {

  return (
    <NavigationContainer>
    <Tab.Navigator
      tabBar={props => <NavBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: navbarHeight },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuStackScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      {/* <Tab.Screen name="Bag" component={BagScreen} /> */}
    </Tab.Navigator>
  </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    height: viewportHeight - navbarHeight,
  },
});

export default App;
