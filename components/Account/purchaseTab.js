import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, FlatList, ScrollSafeView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../constants';
import { useFocusEffect } from '@react-navigation/native'; 

// /********************************* The Purchase Tab  ***********************************/

const PurchasesTab = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await fetch(`${BASE_URL}/users/purchases/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }
        const result = await response.json();
        setOrders(result);
      } catch (error) {
        console.error('Error fetching purchases:', error);
        setError('Failed to load purchases. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    useFocusEffect(
      useCallback(() => {
        fetchPurchases();
      }, [])
    );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  

  const renderOrderItem = ({ item }) => <PurchaseItem order={item} />;

  return (
    <View style={styles.rootContainer}> 
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => `order-${index}`}
          contentContainerStyle={styles.purchasesContainer}
        />
      )}
    </View>
  );
};


const PurchaseItem = ({ order }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        // Assuming you have the order ID in your order object, and your endpoint is structured as mentioned
        const response = await fetch(`${BASE_URL}/purchases/${order.id}/items/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch items for purchase ID ${order.id}`);
        }

        const result = await response.json();
        setItems(result); // Assuming the API returns an array of item details directly
      } catch (error) {
        console.error(`Error fetching items for purchase ID ${order.id}:`, error);
      }
    };

    fetchItems();
  }, [order.id]); // Dependency array, re-fetch if order.id changes


  return (
    <View style={styles.purchaseItem}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemEstimatedDelivery}>{order.delivery_date_start} - {order.delivery_date_end}</Text>
        <Text style={styles.itemEstimatedDelivery}>{order.status}</Text>
        <Text style={styles.itemPrice}>{order.total_price} $</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsContainer}
      >
        {items.map((item, index) => {
          const imageUrl = `${BASE_URL}${item.image1}`; // Adjust according to how your API returns the image URL
          return (
            <Image key={index} source={{ uri: imageUrl }} style={styles.itemImage} />
          );
        })}
      </ScrollView>
    </View>
  );
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, // This ensures the container takes up the full available space
  },
  purchasesContainer: {
    flexGrow: 1, // Ensure the container can grow to accommodate its children
    marginBottom: 80,
  },
  purchaseItem: {
   
  },

  itemsContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },

  itemImage: {
    width: viewportWidth * 0.4, // Adjust the width as needed
    height: 200,
    // marginLeft: 1,
    borderWidth: 0.5,
  },
  itemDetails: {
    padding: 10,
  },
  itemEstimatedDelivery: {
    fontSize: 14,
    color: '#808080',
    paddingTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5,
  },
});

export default PurchasesTab;

// /********************************* ****************************  ***********************************/