import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavoritesTab from "./Account/favTab";
import InformationTab from "./Account/profileTab";
import PurchasesTab from "./Account/purchaseTab";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsPage from "./details";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("screen");

const AccountStack = createStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="FavoritesTab"
        component={FavoritesTab}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen name="DetailsPage" component={DetailsPage} />
    </AccountStack.Navigator>
  );
}

const AccountTabNavigator = createMaterialTopTabNavigator();

function AccountTabs() {
  return (
    <AccountTabNavigator.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: { display: "none" },
        headerShown: false,
      }}
    >
      <AccountTabNavigator.Screen
        name="Favorites"
        component={AccountStackScreen}
      />
      <AccountTabNavigator.Screen name="Profile" component={InformationTab} />
      <AccountTabNavigator.Screen name="Purchases" component={PurchasesTab} />
    </AccountTabNavigator.Navigator>
  );
}

const AccountPage = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.accountBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Favorites")}
            style={styles.tab}
          >
            <Text style={styles.tabText}>FAVORITES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.tab}
          >
            <Text style={styles.tabText}>PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Purchases")}
            style={styles.tab}
          >
            <Text style={styles.tabText}>PURCHASES</Text>
          </TouchableOpacity>
        </View>

        <AccountTabs />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // borderWidth: 2,
    // borderColor: 'red',
    height: viewportHeight - 80,
  },
  accountBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    //backgroundColor: 'black',
    width: "100%",
    // position: 'absolute',
    // bottom: 100,
    // borderWidth: 2,
    // borderColor: 'blue',
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 1,
    margin: 8,
  },
  activeTab: {},
  tabText: {
    fontSize: 13,
    padding: 4,
    // fontWeight: 'bold',
  },
});

export default AccountPage;
