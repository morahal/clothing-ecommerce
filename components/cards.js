import React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Card from './card'; // Assuming Card is in the same directory
import SlideInMenu from './slide-in-menu';
import { useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import { BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
  

const navbarHeight = 80;
const {width: viewPortWidth, height: viewPortHeight} = Dimensions.get('screen');

const Cards = () => {

  const navigation = useNavigation(); // Hook to get access to navigation object
  const route = useRoute(); // Hook to get access to route object
  const { category, selectedTab } = route.params;

  useEffect(() => {
    navigation.setOptions({ 
      title: category,
      headerBackTitle: 'Menu',
      headerBackTitleVisible: true,
      headerTintColor: 'black', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontSize: 16, // Set your desired font size here
        // You can also add other font styling properties here, like fontFamily, fontWeight, etc.
      },
      headerBackTitleStyle: {
        fontSize: 14, // Set your desired font size for the back button title
        // You can also add other font styling properties here, like fontFamily, fontWeight, etc., for the back button title
      },});
  }, [category, navigation]);




const [cardsData, setCardsData] = useState([]);

// ********************************* For category and section filtering ***********************************//

  // useEffect(() => {
  //   fetchCardsData();
  // }, [category, selectedTab]);

  // const fetchCardsData = async () => {
  //   try {
  //     //const response = await fetch(`${BASE_URL}`);
  //     //console.log(selectedTab);
  //     const response = await fetch(`${BASE_URL}/items?section=${selectedTab.toUpperCase()}&category=${category.toUpperCase()}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     } else {
  //       const json = await response.json();
  //       setCardsData(json);
  //       //console.log(json);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', `Could not fetch items of this category: ${error.message}`);
  //     console.error(error);
  //   }
  // };
//******************************************************************************************** //

  
// ********************************* For search ***********************************//

   // State to hold the search term
   const [searchTerm, setSearchTerm] = useState('');
   // State to hold the filtered data
   const [filteredData, setFilteredData] = useState(cardsData);

   useEffect(() => {
    if (searchTerm) {
      const newData = cardsData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(cardsData);
    }
  }, [searchTerm, cardsData]);

//******************************************************************************************** //



// *************** For the filtering of category, section, size, price , colour, and type ******************** //

  const [selectedOptions, setSelectedOptions] = useState({
    size: null,
    price: null,
    colour: null,
    type: null,
  });

  useEffect(() => {
    console.log("Updated selectedOptions:", selectedOptions);
  }, [selectedOptions]);


  // useEffect(() => {
  //   fetchCardsData();
  // }, [selectedTab, category, selectedOptions.size, selectedOptions.price, selectedOptions.colour, selectedOptions.type]);

  const fetchCardsData = async () => {
    try {
        // Base URL and initial category/section parameters
        let url = `${BASE_URL}/items?section=${encodeURIComponent(selectedTab.toUpperCase())}&category=${encodeURIComponent(category.toUpperCase())}`;
    
        // Dynamically add other parameters if they are not null
        if (selectedOptions.size) url += `&size=${encodeURIComponent(selectedOptions.size.toUpperCase())}`;
        if (selectedOptions.price) url += `&priceRange=${encodeURIComponent(selectedOptions.price)}`;
        if (selectedOptions.colour) url += `&color=${encodeURIComponent(selectedOptions.colour.toUpperCase())}`;
        if (selectedOptions.type) url += `&item_type=${encodeURIComponent(selectedOptions.type.toUpperCase())}`;
    
        console.log("Fetching data from URL:", url); // For debugging
        const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const json = await response.json();
        setCardsData(json);
        //console.log(json);
      }
    } catch (error) {
      Alert.alert('Error', `Could not fetch items of this category: ${error.message}`);
      console.error(error);
    }
  };

// **************************************************************** *********************//

// ******************************** GET FAVORITED ITEMS *********************//
// const [favorites, setFavorites] = useState([]);

//   const fetchFavorites = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken'); // Retrieve the access token
//       if (!accessToken) {
//         console.error('Access token not found');
//         return;
//       }

//       const response = await fetch(`${BASE_URL}/favorites/`, { // Replace 'http://your-api-url/favorites/' with your actual API URL
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });

//       console.log(response);

//       if (!response.ok) {
//         throw new Error('Failed to fetch favorites');
//       }

//       const data = await response.json();

//       console.log("from cards get favorites: ",data);


//       setFavorites(data); // Update state with the fetched favorites
//     } catch (error) {
//       console.error('Error fetching favorites:', error);
//     }
//   };

 // Empty dependency array means this effect runs once on mount


useFocusEffect(
  React.useCallback(() => {
    fetchCardsData(); // Refresh
    //fetchFavorites();
  }, [selectedTab, category, selectedOptions.size, selectedOptions.price, selectedOptions.colour, selectedOptions.type])
);

// **************************************************************** *********************//

  const renderItem = ({ item }) => {
    const imageUrl = `${BASE_URL}${item.image1}`;
    //const isFavorited = favorites.some(favoritedItem => favoritedItem.id === item.id);

    // console.log("isFavorited in cards: ",isFavorited);

    // console.log("favorites in cards: ", favorites);

    return (
    <Card
      title={item.name}
      imageUrl={{ uri: imageUrl }}
      price = {item.price}
      id = {item.id}
      //isLoved = {isFavorited}
      //onPress={() => navigation.navigate('DetailsPage', { item })}
      onPress={() => navigation.navigate('DetailsPage', { item, origin: 'CardsPage', category, selectedTab})}
    />
  )
  };



  // console.log(isLoved);

  return (
  <>
   <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={{ flex: 1 }}
  >
      <View style= {styles.all}> 
   <SlideInMenu selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
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
      //extraData={favorites}
    />

    </View>

  </KeyboardAvoidingView>
   </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: viewPortWidth,
    marginBottom: navbarHeight,
    // Add some padding if needed
  },

  all: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
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
