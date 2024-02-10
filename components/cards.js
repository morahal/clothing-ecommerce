import React from 'react';
import { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Card from './card'; // Assuming Card is in the same directory
import SlideInMenu from './slide-in-menu';
import { useNavigation, useRoute } from '@react-navigation/native';

const navbarHeight = 80;
const {width: viewPortWidth, height: viewPortHeight} = Dimensions.get('window');

const cardsData = [
  {
    id: '1',
    title: 'BASIC PUFFER JACKET',
    imageUrl: require('../assets/b2.jpg'),
    price: 100,
  },

  {
    id: '2',
    title: 'Blazer Lightning',
    imageUrl: require('../assets/b1.jpg'),
    price: 100,
  },

  {
    id: '3',
    title: 'Boneless Jacket',
    imageUrl: require('../assets/b1.jpg'),
    price: 100,
  },

  {
    id: '4',
    title: 'BLACK COAT',
    imageUrl: require('../assets/b1.jpg'),
    price: 100,
  },

  {
    id: '4',
    title: 'BLACK COAT',
    imageUrl: require('../assets/b1.jpg'),
    price: 100,
  },

  {
    id: '4',
    title: 'BLACK COAT',
    imageUrl: require('../assets/b1.jpg'),
    price: 100,
  },

  {
    id: '1',
    title: 'BASIC PUFFER JACKET',
    imageUrl: require('../assets/b2.jpg'),
    price: 100,
  },
  {
    id: '1',
    title: 'BASIC PUFFER JACKET',
    imageUrl: require('../assets/b2.jpg'),
    price: 100,
  },


];

const Cards = () => {

  const navigation = useNavigation(); // Hook to get access to navigation object
  const route = useRoute(); // Hook to get access to route object
  const { category } = route.params; 

  useEffect(() => {
    navigation.setOptions({ 
      title: category,
      headerBackTitle: 'Menu',
      headerBackTitleVisible: true,
      headerTintColor: 'black', });
  }, [category, navigation]);

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      imageUrl={item.imageUrl}
      price = {item.price}
    />
  );

  return (
  <>
 <View style= {styles.all}> 
   <SlideInMenu />
    <FlatList
      data={cardsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      style={styles.container}
    />
    </View>
   </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //overflow: 'auto',
    backgroundColor: '#f0f0f0',
    width: viewPortWidth,
    //borderBlockColor: 'black',
    //marginTop: 50,

    // borderWidth: 2, // Set the width of the border
    // borderColor: 'red', // Set the color of the border
    // borderStyle: 'solid',

    marginBottom: navbarHeight,
    // Add some padding if needed
  },

  all: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    // borderWidth: 2, // Set the width of the border
    // borderColor: 'yelllow', // Set the color of the border
    // borderStyle: 'solid',


  }

 
  // You might need additional styles for the Card component to look good in a grid layout
});
export default Cards;
