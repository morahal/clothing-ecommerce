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

//added
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


const DetailsPage = ({ route }) => {
  //const { item } = route.params;
  const { item, origin, category, selectedTab } = route.params;
  const navigation = useNavigation(); 
  const { dispatch, state } = useBag();
  const bagItems = state.bagItems; // Assuming your bagItems are stored in the state object of your context

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


useEffect(() => {
  if (selectedOptions.size && selectedOptions.colour) {
    // Directly dispatch ADD_TO_BAG action. Reducer will handle if it needs to add a new item or increment quantity
    dispatch({
      type: 'ADD_TO_BAG',
      payload: { ...item,imageUrl: item.imageUrl[0].source, size: selectedOptions.size, colour: selectedOptions.colour },
    });

    // Alert.alert("Success", "Item added to bag successfully.");
    setSelectedOptions({ size: null, colour: null }); // Reset selected options
    setModalVisible(false); // Close modal
  }
}, [selectedOptions.size, selectedOptions.colour,item, dispatch]);


  useEffect(() => {
    console.log("Updated selectedOptions:", selectedOptions);
  }, [selectedOptions]);


  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Add additional logic if needed to handle adding/removing from a global favorites list
  };

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