import React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View, TextInput } from 'react-native';
import Card from './card'; // Assuming Card is in the same directory
import SlideInMenu from './slide-in-menu';
import { useNavigation, useRoute } from '@react-navigation/native';

const navbarHeight = 80;
const {width: viewPortWidth, height: viewPortHeight} = Dimensions.get('window');

const cardsData = [
  {
    id: '1',
    title: 'PUFFER JACKET',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
    price: 100,
    description: 'A jacket typically has sleeves and fastens in the front or slightly on the side. A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing. ',
  },

  {
    id: '2',
    title: 'Blazer Lightning',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
    price: 100,
  },

  {
    id: '3',
    title: 'Boneless Jacket',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
    price: 100,
  },

  {
    id: '4',
    title: 'BLACK COAT',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
    price: 100,
  },

  {
    id: '5',
    title: 'BLACK COAT',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
    price: 100,
  },

  {
    id: '6',
    title: 'BLACK COAT',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
    price: 100,
  },

  {
    id: '7',
    title: 'BASIC PUFFER JACKET',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
    price: 100,
  },
  {
    id: '8',
    title: 'BASIC PUFFER JACKET',
    imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
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

   // State to hold the search term
   const [searchTerm, setSearchTerm] = useState('');
   // State to hold the filtered data
   const [filteredData, setFilteredData] = useState(cardsData);

   useEffect(() => {
    if (searchTerm) {
      const newData = cardsData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(cardsData);
    }
  }, [searchTerm]);

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      imageUrl={item.imageUrl[0].source}
      price = {item.price}
      onPress={() => navigation.navigate('DetailsPage', { item })}
    />
  );

  return (
  <>
 <View style= {styles.all}> 
   <SlideInMenu />
   <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
    <FlatList
      data={filteredData}
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
    backgroundColor: 'white',
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
    backgroundColor: 'white'

    // borderWidth: 2, // Set the width of the border
    // borderColor: 'yelllow', // Set the color of the border
    // borderStyle: 'solid',
  },

  searchBar: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#000',
    paddingLeft: 10,
    margin: 15,
    marginTop: 0,
    // borderRadius: 5,
    backgroundColor: 'white',

  },

 
  // You might need additional styles for the Card component to look good in a grid layout
});
export default Cards;
