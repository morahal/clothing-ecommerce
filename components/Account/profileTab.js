import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  ScrollSafeView,
} from "react-native";
import { BASE_URL } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const InformationTab = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (!accessToken) {
        setIsLoggedIn(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/user/info/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        throw new Error("HTTP error " + response.status);
      }

      const userProfile = await response.json();

      setUserInfo({
        email: userProfile.email ?? "", // Using optional chaining and nullish coalescing
        phoneNb: userProfile.phoneNb ?? "",
        first_name: userProfile.first_name ?? "",
        last_name: userProfile.last_name ?? "",
        address: userProfile.address ?? "",
        // Set other fields as per your user model
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.log("Failed to fetch user info:", error);
      setIsLoggedIn(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserInfo();
    })
  );

  const handleLogout = () => {
    const logout = async () => {
      try {
        const response = await fetch(`${BASE_URL}/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for cookie-based authentication
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        await AsyncStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        console.log("You're logged out.");

        // Reset userInfo state after logout
        setUserInfo({
          email: "",
          phoneNb: "",
          first_name: "",
          last_name: "",
          address: "",
        });

        navigation.navigate("Home");
      } catch (err) {
        console.error("Failed to logout:", err);
      }
    };

    logout();
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.centerContent}>
        <Text>Please Login or Register</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.infoContainer}>
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>
          {userInfo.first_name} {userInfo.last_name}
        </Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>EMAIL</Text>
        <Text style={styles.infoValue}>{userInfo.email}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>PHONE NUMBER</Text>
        <Text style={styles.infoValue}>{userInfo.phoneNb}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>ADDRESS</Text>
        <Text style={styles.infoValue}>{userInfo.address}</Text>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
        <Text style={styles.actionText}>LOGOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },
  profileSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    textAlign: "left",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 0.4,
    borderBottomColor: "grey",
  },
  infoTitle: {
    fontSize: 13,
  },
  infoValue: {
    fontSize: 12,
    color: "#808080",
  },
  actionButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    marginTop: 70,
  },
  actionText: {
    fontSize: 13,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InformationTab;
