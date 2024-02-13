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
        // Since price is an integer, there's no need to use .replace
        const itemPrice = item.price; // Directly use the integer value
        return acc + itemPrice * (item.quantity || 1); // Use item.quantity or default to 1 if undefined
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

        <View style={styles.bottom}>
            <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>CONTINUE</Text>
                </TouchableOpacity>
        </View>
      {/* <Button title="CONTINUE" onPress={() => {}} /> */}
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
      bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 50,
      },
      totalContainer: {
        // marginTop: 20,
        flex: 1,
        padding: 10,
        width: '50%',
        borderRightWidth: 1, // Add border on top as per the design
        borderRightColor: '#e1e1e1', // Light grey color for the border
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', // Align items vertically
        
      },
      totalText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        // paddingLeft: 20, // Ensure text is black
      },
      totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white', 
        paddingLeft: 15,// Ensure text is black
      },

      continueButton:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      continueText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
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