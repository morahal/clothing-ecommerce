// DetailsPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import SlideInDetail from './slide-in-detail';

const DetailsPage = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation(); // Hook to get access to navigation object
 
  // console.log("Hellloooooooooooooooooooooooooooooooooooooooooooobjbhbhbvyvyvvbbvhb");
  // console.log(item.id, item.title, item.imageUrl, item.price);
  // Placeholder for the item's image URLs for the slideshow
  //const imageUrls = item.imageUrl;

  const carouselRef = useRef(null); // Reference for the carousel
  const { width: viewportWidth } = Dimensions.get('window');

  useEffect(() => {
    navigation.setOptions({ 
      title: item.title,
      headerBackTitleVisible: true,
      headerTintColor: 'black', });
  }, [item, navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <Image source={item.source} style={styles.slideImage} />
    );
  };

const [modalVisible, setModalVisible] = useState(false);
const [selectedOptions, setSelectedOptions] = useState({ size: null, colour: null });

useEffect(() => {
    // Check if both size and colour are selected
    if (selectedOptions.size !== null && selectedOptions.colour !== null) {
      // If both are selected, close the modal
      setModalVisible(false);
      setSelectedOptions({ size: null, colour: null })
    }
  }, [selectedOptions.size, selectedOptions.colour]);

  useEffect(() => {
    console.log("Updated selectedOptions:", selectedOptions);
  }, [selectedOptions]);


// Add this inside DetailsPage component
// const checkSelectedOptionsAndAlert = () => {
//   if (selectedOptions.size && selectedOptions.colour) {
//     Alert.alert("Success", "Item added to cart successfully.");
//   } else {
//     Alert.alert("Missing Information", "Please select both a colour and size.");
//   }
// };


  return (
    <ScrollView style={styles.container}>

    <View>
      <Carousel
      ref={carouselRef}
      data={item.imageUrl}
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
          <Text style={styles.title}>{item.title}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 80,
  },
  slideImage: {
    width: '100%',
    height: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 5,
    // marginLeft: 5,
    // marginTop: 5,
    
  },
  price: {
    fontSize: 14,
    
  },
  description: {
    fontSize: 14,
    paddingLeft: 15,   
  },

  subtitle:{
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
    padding: 15,
  },

  item: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    fontWeight: '500',
    borderWidth: 1, // Set the width of the border
    borderColor: 'gray', // Set the color of the border
    borderStyle: 'solid',
  },
});

export default DetailsPage;