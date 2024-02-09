import React, { useState, useEffect, useRef }  from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import NavBar from '../components/navbar';
 // Correct the import path as necessary

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const navbarHeight = 80; // Height of the navbar

const HomePage = ({ navigation }) => {
  const carouselItems = [
    { source: require('../assets/home.jpg') },
    { source: require('../assets/home2.jpg') },
    { source: require('../assets/home3.jpg') },
    // Add more images as needed
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
      carouselRef.current?.snapToItem(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

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
        ref={carouselRef}
        data={carouselItems}
        renderItem={renderItem}
        sliderHeight={viewportHeight - navbarHeight} // Adjusted for navbar
        itemHeight={viewportHeight - navbarHeight} // Full height minus navbar
        vertical={true}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        onSnapToItem={(index) => setActiveIndex(index)}
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
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: 'transparent', // Assuming a transparent background for the header
    },
    headerText: {
      fontSize: 130,
      fontWeight: 'bold',
      color: '#fff',
    },
});

export default HomePage;
