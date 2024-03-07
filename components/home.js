import React, { useState, useEffect, useRef, useCallback }  from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '../constants';
 // Correct the import path as necessary

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');
const navbarHeight = 80; // Height of the navbar

const HomePage = ({ navigation }) => {
  const carouselItems = [
    { source: require('../assets/home.jpg') },
    { source: require('../assets/home3.jpg') },
    { source: require('../assets/home2.jpg') },
   
    // Add more images as needed
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
      carouselRef.current?.snapToItem(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const checkLoginStatus = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken); // Set to true if accessToken exists, false otherwise
  };

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  const logout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials for cookie-based authentication
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      await AsyncStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      console.log("You're logged out.");

      // navigation.navigate("Home");

    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };


  const handleAuthButtonPress = async () => {
    if (isLoggedIn) {
      // If the user is logged in, call the logout function
      await logout();
    } else {
      // If the user is not logged in, navigate to the Login screen
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.source} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <View>
        <View style={styles.header}>
            <Text style={styles.headerText}>HDIBZI</Text>
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
      <TouchableOpacity
          style={styles.signinButton}
          onPress={handleAuthButtonPress}
        >
          <Text style={styles.signinButtonText}>{isLoggedIn ? 'LOGOUT' : 'LOGIN'}</Text>
      </TouchableOpacity>
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
      // borderWidth: 2,
      // borderColor: 'green',
      
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
      fontSize: 100,
      fontWeight: 'bold',
      color: '#fff',
    },
    signinButton: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      padding: 7,
      borderWidth: 0.5,
      borderColor: 'white',
      margin: 15,
    },
    signinButtonText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'right',
      // fontWeight: 'bold',
    },

});

export default HomePage;
