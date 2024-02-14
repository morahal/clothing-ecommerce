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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="Login" component={LoginPage} />
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

// const App = () => {

//   return (
//     <CombinedProviders>
//           <NavigationContainer>
//     <Tab.Navigator
//       tabBar={props => <NavBar {...props} />}
//       screenOptions={{
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: { height: navbarHeight },
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Menu" component={MenuStackScreen} />
//       <Tab.Screen name="Account" component={AccountScreen} />
//       <Tab.Screen name="Bag" component={BagScreen} />
//     </Tab.Navigator>
//   </NavigationContainer>
//     </CombinedProviders>
//   );
// };


// const styles = StyleSheet.create({
//   pageContainer: {
//     height: viewportHeight - navbarHeight,
//   },
// });

export default App;
