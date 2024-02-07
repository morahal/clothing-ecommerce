import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import NavBar from '../components/navbar';
 // Correct the import path as necessary

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const navbarHeight = 80; // Height of the navbar

const HomePage = ({ navigation }) => {
  const carouselItems = [
    { source: require('../assets/home.jpg') },
    { source: require('../assets/home.jpg') },
    { source: require('../assets/home.jpg') },
    // Add more images as needed
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.source} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.header}>
            <Text style={styles.headerText}>ZARA</Text>
        </View>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderHeight={viewportHeight - navbarHeight} // Adjusted for navbar
        itemHeight={viewportHeight - navbarHeight} // Full height minus navbar
        vertical={true}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    slide: {
      width: viewportWidth,
      height: viewportHeight - navbarHeight, // Full height of the carousel slide
    },
    carouselImage: {
      width: '100%',
      height: '100%', // Image covers the full area of the slide
      resizeMode: 'cover', // This ensures the image covers the slide without being stretched
    },
    header: {
      position: 'absolute',
      top: '5%',
      left: 0,
      right: 0,
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: 'transparent', // Assuming a transparent background for the header
    },
    headerText: {
      fontSize: 130,
      fontWeight: 'bold',
      color: '#fff', // Assuming white text for the header
    },
});

export default HomePage;
