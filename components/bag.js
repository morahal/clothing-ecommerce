import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useBag } from './bagCntext';

const BagPage = () => {
    const { state, dispatch } = useBag();
    const { bagItems } = state;
    // const { bagItems, clearBag } = useBag();
  
    const totalPrice = bagItems.reduce((acc, item) => acc + item.price, 0);
  
    return (
      <View style={styles.container}>
        {bagItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.details}>
              <Text>{item.title}</Text>
              <Text>Size: {item.size}</Text>
              <Text>Color: {item.colour}</Text>
              <Text>Price: ${item.price}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.total}>Total: ${totalPrice}</Text>
        <Button title="Checkout"  />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 10,
    },
    details: {
      justifyContent: 'space-around',
    },
    total: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  
  export default BagPage;