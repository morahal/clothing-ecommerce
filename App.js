import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const navbarHeight = 80; // Height of the navbar, adjust as needed
const headerHeight = 130; // Height of the header, adjust as needed

const App = () => {
  const carouselItems = [
    { source: require('./assets/home.jpg') },
    { source: require('./assets/home.jpg') },
    { source: require('./assets/home.jpg') },
    // Add more images as needed
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.source} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ZARA</Text>
      </View>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderHeight={viewportHeight - navbarHeight} // The height of the carousel slider
        itemHeight={viewportHeight - navbarHeight} // Each carousel item takes the full height
        vertical={true}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>MENU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>BAG (0)</Text>
        </TouchableOpacity>
      </View>
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
    height: headerHeight,
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
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: navbarHeight,
    backgroundColor: 'black', // Based on the image
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10, // Add some padding on the sides
  },
  navItem: {
    paddingBottom: 20,
  },
  navText: {
    fontSize: 12,
    color: 'white',
  },
  // Style for the rest of your navbar items...
});

export default App;
