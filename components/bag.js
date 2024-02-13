import React, {useState, useEffect} from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useBag } from './bagCntext';
import { SafeAreaView } from 'react-native-safe-area-context';

const BagPage = () => {
    const { state, dispatch } = useBag();
    const { bagItems } = state;

      // Remove Item from the bag
      const removeItemFromBag = (id, size, colour) => {
        dispatch({
          type: 'REMOVE_ITEM',
          payload: { id, size, colour }
        });
      };

      const incrementQuantity = (id, size, colour) => {
        dispatch({
          type: 'INCREMENT_QUANTITY',
          payload: { id, size, colour },
        });
      };
      
      const decrementQuantity = (id, size, colour) => {
        dispatch({
          type: 'DECREMENT_QUANTITY',
          payload: { id, size, colour },
        });
      };
  
      const totalPrice = bagItems.reduce((acc, item) => {
        // Remove any non-numeric characters except for the decimal point from the price
        const cleanedPriceString = item.price.replace(/[^0-9.]+/g, '');
        const itemPrice = parseFloat(cleanedPriceString);
        // Multiply the cleaned price by the item's quantity
        return acc + itemPrice * item.quantity;
      }, 0);
      

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.itemsContainer}>
        {bagItems.map((item, index) => (
        <View key={item.selectionId} style={styles.itemContainer}>
        <Image source={item.imageUrl} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSizeColor}>{`${item.size}   |   ${item.colour}`}</Text>
            <Text style={styles.itemPrice}>{`$ ${item.price}`}</Text>
            <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decrementQuantity(item.id, item.size, item.colour)} style={styles.buttonContainer}>
                <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityNumber}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => incrementQuantity(item.id, item.size, item.colour)} style={styles.buttonContainer}>
                <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeItemFromBag(item.id, item.size, item.colour)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>
      <Button title="CONTINUE" onPress={() => {}} />
    </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 25,
      },
      itemsContainer:{
        borderTopWidth: 0.5,
        borderTopColor: 'white',
      },
      itemContainer: {
        flexDirection: 'row',
        // padding: 10,
        backgroundColor: 'black', // Changed to white as per image background
        borderBottomWidth: 0.5, // Add a border to separate items
        borderColor: 'white',// Light grey color for the border
      },
      image: {
        width: 120,
        height: 180,
      },
      itemDetails: {
        marginLeft: 10,
        flex: 1, // Take up remaining space
        justifyContent: 'space-between',
        padding: 10, // Add padding to align with the design in the image
      },
      itemTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        // paddingLeft: 5,
        paddingBottom: 20,// Ensure text is black
      },
      itemSizeColor: {
        fontSize: 16,
        color: 'white',
        // paddingLeft: 5,
        paddingBottom: 5,// Ensure text is black
        // Ensure text is black
      },
      itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        // paddingLeft: 5,
        paddingBottom: 20,// Ensure text is black
        // Ensure text is black
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // Center align the quantity controls
        marginTop: 10,
        paddingBottom: 5,
        // paddingLeft: 5,
      },
      quantityText: {
        fontSize: 16,
        padding: 5,
        color: 'white', // Ensure text is black
      },
      quantityNumber: {
        fontSize: 16,
        color: 'white', 
        padding: 5,
        width:  40,
        textAlign: 'center',
       // Ensure text is black
      },
      buttonContainer: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        // marginRight: 15,
        width: 30,
      },
      totalContainer: {
        marginTop: 20,
        padding: 10,
        borderTopWidth: 1, // Add border on top as per the design
        borderTopColor: '#e1e1e1', // Light grey color for the border
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items vertically
      },
      totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white', // Ensure text is black
      },
      totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white', // Ensure text is black
      },
      continueButton: {
        marginTop: 20,
        backgroundColor: 'white', // Change button color to black
        color: 'white', // Change button text color to white
        padding: 10,
        borderRadius: 0, // Remove border radius for square button
      },
      removeButton: {
        marginLeft: 'auto', // This will push the button to the end of the container
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderColor: 'white',
        borderWidth: 1,
      },
      removeButtonText: {
        color: 'white',
        fontSize: 16,
      },
  });
  
  export default BagPage;