import React from 'react';
import { View, Dimensions, StyleSheet,Animated, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/home';
import MenuPage from './components/menu';
import NavBar from './components/navbar';
import AccountPage from './components/account';
import CombinedProviders from './components/combinedProviders';
import BagPage from './components/bag';
import SignUpPage from './components/signup';
import LoginPage from './components/login';
import PaymentScreen from './components/payment';
import SuggestionsPage from './components/suggestions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const { height: viewportHeight } = Dimensions.get('window');
const navbarHeight = 80; // Adjust as needed

const headerHeight = 130; // Height of the header, adjust as needed

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <NavBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: 80 }, // Adjust the height as needed
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Menu" component={MenuPage} />
      <Tab.Screen name="Account" component={AccountPage} />
      <Tab.Screen name="Bag" component={BagPage} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    // mode="modal"
    // <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal'}}>
    //   <Stack.Screen name="Main" component={MainTabNavigator} />
    //   <Stack.Screen name="SignUp" component={SignUpPage} />
    //   <Stack.Screen name="Login" component={LoginPage} />
    //   <Stack.Screen name="Payment" component={PaymentScreen} />
    //   <Stack.Screen name="SuggestionsPage" component={SuggestionsPage} />
    //   <Stack.Screen name="ResultPage" component={ResultPage} />
    // </Stack.Navigator>

    <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Main" component={MainTabNavigator} />
  <Stack.Screen name="SignUp" component={SignUpPage} options={{ presentation: 'modal' }} />
  <Stack.Screen name="Login" component={LoginPage} options={{ presentation: 'modal' }} />
  <Stack.Screen name="Payment" component={PaymentScreen} options={{ presentation: 'modal' }} />
  <Stack.Screen name="SuggestionsPage" component={SuggestionsPage} options={{ presentation: 'modal' }} />
  {/* <Stack.Screen name="ResultPage" component={ResultPage} options={{ presentation: 'card' }} /> */}
  </Stack.Navigator>

  );
}

const App = () => {
  return (
    <CombinedProviders>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </CombinedProviders>
  );
};

export default App;
