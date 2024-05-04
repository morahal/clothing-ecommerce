import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constants";
import { useFavorites } from "./favContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Card = ({ id, title, imageUrl, price, onPress }) => {
  //const [isFavorited, setIsFavorited] = useState(false);

  const { state, dispatch } = useFavorites();

  console.log("THE STATE: ", state.favorites);

  //const favoritesIds = state.favorites.map(item => item.id);
  const favoritesIds = state.favorites?.map((item) => item.id) ?? [];

  const [isFavorited, setIsFavorited] = useState(favoritesIds.includes(id));

  useEffect(() => {
    setIsFavorited(favoritesIds.includes(id));
  }, [favoritesIds, id]);

  const toggleFavorite = async () => {
    const isFav = !isFavorited;
    setIsFavorited(isFav); // Update state first to reflect the UI change

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        alert("You need to login to add new favorites.");
        console.log("No access token found");
        return;
      }

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${accessToken}`);

      let url;
      let method;

      if (isFav) {
        // Add to favorites
        url = `${BASE_URL}/favorites/add/`;
        method = "POST";
        //setIsFavorited(true);
      } else {
        // Remove from favorites
        url = `${BASE_URL}/favorites/remove/`; // Adjust this URL as needed
        method = "POST";
        //setIsFavorited(false);
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify({ item: id }), // Use `id` directly as it's passed to the component
      });

      if (response.ok) {
        dispatch({
          type: isFav ? "ADD_FAVORITE" : "REMOVE_FAVORITE",
          payload: id,
        });

        console.log(
          isFav
            ? "Item added to favorites successfully"
            : "Item removed from favorites successfully"
        );
      } else if (response.status === 400) {
        console.log(
          isFav ? "Item already in favorites" : "Item not found in favorites"
        );
      } else {
        //console.log("Failed to update favorites:", response.status);
        alert("You need to login to add new favorites.");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <SafeAreaView>
        <Image source={imageUrl} style={styles.image} />

        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>$ {price} </Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          {isFavorited ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    overflow: "hidden",
    flex: 1,
    maxWidth: "50%",
    borderWidth: 0.35, // Set the width of the border
    borderColor: "gray", // Set the color of the border
    borderStyle: "solid",
  },

  image: {
    width: "100%",
    height: 200, // set a fixed height for the image
  },

  cardContent: {
    padding: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 5,
  },

  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  price: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 10,
    color: "black", // Blue color for price
  },
});

export default Card;
