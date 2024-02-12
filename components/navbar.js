import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation(); 
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
        <Text style={styles.navText}>BAG (0)</Text>
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


