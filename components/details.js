// DetailsPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import SlideInDetail from './slide-in-detail';
import { useBag } from './bagCntext';
import { AntDesign } from '@expo/vector-icons';
import { BASE_URL } from '../constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorites } from './favContext';

//added
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


const DetailsPage = ({ route }) => {
  //const { item } = route.params;
  const { item, origin, category, selectedTab } = route.params;
  const navigation = useNavigation(); 
  //const { dispatch, state } = useBag();
  const { state: bagState, dispatch: bagDispatch } = useBag();


  //const { state, dispatch } = useFavorites();
  //const { state: bagState, dispatch: bagDispatch } = useBag();
  const bagItems = bagState.bagItems; // Assuming your bagItems are stored in the state object of your context

  const handleBackPress = () => {
    // Navigate back based on the origin
    if (origin === 'FavoritesTab') {
     // console.log(origin);
      navigation.navigate('FavoritesTab');
    } else if (origin === 'CardsPage') {
      //console.log(origin);
      navigation.navigate('CardsPage', {category, selectedTab});
      //console.log(category);
      //console.log("hello",selectedTab);
    } else {
      // Default back action if origin is not specified
      navigation.goBack();
    }
  };

  const carouselRef = useRef(null); // Reference for the carousel
  
  const { width: viewportWidth } = Dimensions.get('screen');

  useEffect(() => {
    navigation.setOptions({ 
      headerShown: false, // This hides the entire header
     });
      
  }, [item, navigation]);

  /*************************************** */

  const images = [
    { source: { uri: `${BASE_URL}${item.image1}` } },
    { source: { uri: `${BASE_URL}${item.image2}` } },
    { source: { uri: `${BASE_URL}${item.image3}` } },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <Image source={item.source} style={styles.slideImage} />
    );
  };

  /*************************************** */

const [modalVisible, setModalVisible] = useState(false);
const [selectedOptions, setSelectedOptions] = useState({ size: null, colour: null });


// useEffect(() => {
//   if (selectedOptions.size && selectedOptions.colour) {
    
//     // Directly dispatch ADD_TO_BAG action. Reducer will handle if it needs to add a new item or increment quantity
//     dispatch({
//       type: 'ADD_TO_BAG',
//       payload: { ...item, s_ize: selectedOptions.size, colour: selectedOptions.colour },
//     });
//     //console.log("hrlloo",bagItems);
//     // Alert.alert("Success", "Item added to bag successfully.");
//     setSelectedOptions({ size: null, colour: null }); // Reset selected options
//     setModalVisible(false); // Close modal
//   }
// }, [selectedOptions.size, selectedOptions.colour,item, dispatch]);

useEffect(() => {
  const checkItemAndAddToBag = async () => {
    if (selectedOptions.size && selectedOptions.colour) {
      try {
        const url = `${BASE_URL}/specificItem/?section=${encodeURIComponent(item.section)}&category=${encodeURIComponent(item.category)}&name=${encodeURIComponent(item.name)}&size=${encodeURIComponent(selectedOptions.size)}&color=${encodeURIComponent(selectedOptions.colour)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
          // If item is found, dispatch ADD_TO_BAG action
          bagDispatch({
            type: 'ADD_TO_BAG',
            payload: { ...data, s_ize: selectedOptions.size, colour: selectedOptions.colour },
          });

          console.log(bagItems);

          // Alert.alert("Success", "Item added to bag successfully.");
          setSelectedOptions({ size: null, colour: null }); // Reset selected options
          setModalVisible(false); // Close modal
        } else {
          // If item is not found, show alert
          Alert.alert("The size or color chosen for this item are out of stock.");
          setSelectedOptions({ size: null, colour: null }); // Reset selected options
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch item.");
      }
    }
  };

  checkItemAndAddToBag();
}, [selectedOptions.size, selectedOptions.colour, item, bagDispatch]);





  // useEffect(() => {
  //   console.log("Updated selectedOptions:", selectedOptions);
  // }, [selectedOptions]);




  //********************** Added for favorites  *************************/

  //console.log("THE ITEM IN DETAILS:",item.id);

  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();

  //const favoritesIds = favoritesState.favorites.map(item => item.id);
  const favoritesIds = favoritesState.favorites?.map(item => item.id) ?? [];


  const [isFavorited, setIsFavorited] = useState(favoritesIds.includes(item.id));

  //console.log("THE isFavorited:",isFavorited);

  useEffect(() => {
    setIsFavorited(favoritesIds.includes(item.id));
  }, [favoritesIds, item.id]);


  const toggleFavorite = async () => {
    const isFav = !isFavorited;
    setIsFavorited(isFav); // Update state first to reflect the UI change

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        alert("You need to login to add new favorites.");
        console.log("No access token found");
        return;
      }

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${accessToken}`);

      let url;
      let method;

      if (isFav) {
        // Add to favorites
        url = `${BASE_URL}/favorites/add/`;
        method = "POST";
        //setIsFavorited(true); 
      } else {
        // Remove from favorites
        url = `${BASE_URL}/favorites/remove/`; // Adjust this URL as needed
        method = "POST";
        //setIsFavorited(false); 
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify({ item: item.id }), // Use `id` directly as it's passed to the component
      });

      if (response.ok) {

        favoritesDispatch({
          type: isFav ? 'ADD_FAVORITE' : 'REMOVE_FAVORITE',
          payload: item.id,
        });

        console.log(
          isFav
            ? "Item added to favorites successfully"
            : "Item removed from favorites successfully"
        );

      } 
      else if (response.status === 400) {
        console.log(
          isFav ? "Item already in favorites" : "Item not found in favorites"
        );
      } else {
        //console.log("Failed to update favorites:", response.status);
        alert("You need to login to add new favorites.");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }

  };

  //********************** Completed Added for favorites  *************************/

  return (
    <SafeAreaView>
   
    <ScrollView style={styles.container}>

    <View>
    <TouchableOpacity style={styles.backButton} underlayColor="transparent" activeOpacity={1}> 
      <Text style={styles.buttonText}><AntDesign name="leftcircleo" size={24} color="black" onPress={handleBackPress} /></Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
         {isFavorited ? (
          <AntDesign name="heart" size={26} color="red" />
        ) : (
          <AntDesign name="hearto" size={26} color="black" />
        )}
    </TouchableOpacity> 

      <Carousel
      ref={carouselRef}
      data={images}
      renderItem={renderItem}
      sliderWidth={viewportWidth}
      itemWidth={viewportWidth}
      windowSize={1} // Reduce windowSize for better performance
      layout={'default'} // Set the layout for the carousel
      autoplay={true} // Enable autoplay
      autoplayDelay={500} // Delay for 0.5 seconds before starting
      autoplayInterval={2000} // Slide every 2 seconds
      loop={true} // Add this line
      />
      </View>


      <View> 
          <View style = {styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          </View>
          <SlideInDetail selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
          modalVisible = {modalVisible} setModalVisible={setModalVisible} />
          <View style={styles.buy}>
              <View>
                <Text style={styles.subtitle}>Price</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                <Text style={styles.item}> Add to Cart </Text>
              </TouchableOpacity>
          </View>
      </View>

      <View style = {styles.text}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
      </View>


    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: viewportHeight - 80,
  },
  slideImage: {
    width: '100%',
    height: 450,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15,
    paddingTop: 10,    
  },
  price: {
    fontSize: 14,
    paddingLeft: 15,
  },
  description: {
    fontSize: 14,
    paddingLeft: 15,   
  },

  subtitle:{
    paddingLeft: 15,
    paddingBottom: 3,
    fontSize: 16,
    fontWeight: '500',
  },

  text: {
    margin: 0,
    height: '100%',
    paddingBottom: 10,
  },

  buy:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    // paddingLeft: 15,
    width: '95%',
    marginBottom: 10,
  },

  item: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    fontWeight: '700',
    borderWidth: 1, // Set the width of the border
    borderColor: 'gray', // Set the color of the border
    borderStyle: 'solid',
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 10,
  },
  buttonText:{
    fontSize: 18,
  },

  favoriteButton:{
    position: 'absolute',
    zIndex: 10,
    top: 20,
    right: 20,

  }
});

export default DetailsPage;