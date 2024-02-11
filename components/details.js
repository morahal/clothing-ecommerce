// DetailsPage.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
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
      <SlideInDetail />
      </View>

      <View style = {styles.text}>

      <Text style={styles.subtitle}>Description</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.buy}>
      <View>
      <Text style={styles.subtitle}>Price</Text>
      <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity> 
        <Text style={styles.item}> Add to Cart </Text>
      </TouchableOpacity>
      </View>


      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 80,

    borderWidth: 2, // Set the width of the border
    borderColor: 'green', // Set the color of the border
    borderStyle: 'solid',
  },
  slideImage: {
    width: '100%',
    height: 400,

    borderWidth: 2, // Set the width of the border
    borderColor: 'red', // Set the color of the border
    borderStyle: 'solid',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
    
  },
  price: {
    fontSize: 16,
    marginLeft: 5,
    
  },
  description: {
    fontSize: 16,
    marginLeft: 5,
   
  },

  subtitle:{
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '500',
  },

  text: {
    borderWidth: 2, // Set the width of the border
    borderColor: 'yellow', // Set the color of the border
    borderStyle: 'solid',
    margin: 0,
    height: '100%',
    paddingBottom: 10,
  },

  buy:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    borderWidth: 2, // Set the width of the border
    borderColor: 'blue', // Set the color of the border
    borderStyle: 'solid',
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    fontWeight: '500',
    borderWidth: 1, // Set the width of the border
    borderColor: 'gray', // Set the color of the border
    borderStyle: 'solid',
  },
});

export default DetailsPage;
