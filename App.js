import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ZARA</Text>
      </View>
        <Image
          source={require('./assets/home.jpg')}
          style={styles.flowerImage}
        />
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>MENU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>BAG (0)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute', // Position header absolutely
    top: '5%', // Position from the top of the imageContainer
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure the header is above the image
  },
  headerText: {
    fontSize: 140,
    fontWeight: 'bold',
    color: 'black', // Assuming a light text color would be visible on your image
  },
  imageContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
    position: 'relative', // Establish positioning context
  },
  flowerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Position image absolutely to fill the container
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute', // Position navbar absolutely
    bottom: 30, // Position from the bottom of the container view
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
  },
});


export default App;
