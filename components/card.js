import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, FontAwesomeIcon } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



const Card = ({ title, imageUrl, price }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => {
      setIsFavorited(!isFavorited);
      // Add additional logic if needed to handle adding/removing from a global favorites list
    };

  return (
    <SafeAreaView style={styles.card}>
       <Image source={imageUrl} style={styles.image} /> 

      <View style={styles.cardContent}>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price} </Text>

       </View>

       <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
         {isFavorited ? (
          <AntDesign name="heart" size={24} color="red" />
        ) : (
          <AntDesign name="hearto" size={24} color="black" />
        )}
        </TouchableOpacity> 

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    overflow: 'hidden',
    flex: 1,
    maxWidth: '50%',
    borderWidth: 0.35, // Set the width of the border
    borderColor: 'gray', // Set the color of the border
    borderStyle: 'solid',
  },

  image: {
    width: '100%',
    height: 200, // set a fixed height for the image
  },

  cardContent: {
    padding: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  price: {
  fontSize: 14,
  fontWeight: '700',
  marginTop: 5,
  marginBottom: 10,
  color: 'black', // Blue color for price
},

});

export default Card;
