import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBag } from './bagCntext';

const NavBar = () => {
  const navigation = useNavigation(); 
  const { state } = useBag(); // Destructure to get the state from the context
  const bagItems = state.bagItems;

  // Calculate the total quantity of items in the bag
  const totalItems = bagItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
        <Text style={styles.navText}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.navItem}>
        <Text style={styles.navText}>MENU</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.navItem}>
        <Text style={styles.navText}>ACCOUNT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Bag')} style={styles.navItem}>
        <Text style={styles.navText}>BAG ({totalItems})</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
  },
  navItem: {
    paddingBottom: 20,
  },
  navText: {
    fontSize: 12,
    color: 'white',
  },
});

export default NavBar;


