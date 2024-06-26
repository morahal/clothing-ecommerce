import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { BASE_URL } from '../constants';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');
const navbarHeight = 80; // Height of the navbar


//************************************************************************************************/
import Cards from './cards'; // Create this component for category details
import DetailsPage from './details'; 

const MenuStack = createStackNavigator();

function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="MenuPage" component={MenuPage} options={{ headerShown: false }} />
      <MenuStack.Screen name="CardsPage" component={Cards} />
      <MenuStack.Screen name="DetailsPage" component={DetailsPage} />
    </MenuStack.Navigator>
  );
}
//************************************************************************************************/


const MenuPage = ({ navigation }) => {

//*****************************************ADDED BY HADI *****************************************//
  const [selectedTab, setSelectedTab] = useState('MEN');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/${selectedTab.toUpperCase()}/`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch categories');
        console.error(error);
      }
    };

    fetchCategories();
  }, [selectedTab]);
//***************************************** *****************************************//

  const handlePressCategoryItem = (category) => {
    navigation.navigate('CardsPage', { category, selectedTab });
  };


  return (
    <View style={styles.menuContainer}>
      <View style={styles.tabContainer}>
        {['Men', 'Women', 'Kids'].map((tab) => (
          <TouchableOpacity key={tab} style={styles.tab} onPress={() => setSelectedTab(tab)}>
            <Text style={selectedTab === tab ? styles.activeTab : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.listContainer}>
       
       
        <ScrollView>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => handlePressCategoryItem(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: viewportHeight - navbarHeight, // Ensure the menu doesn't cover the navbar
    backgroundColor: 'white', // Set background color for menu
    paddingTop: 45, // Adjust the padding to push content down below the status bar (if present)
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  tab: {
    // Styles for tab
  },
  tabText: {
    color: 'black',
    fontSize: 16,
    // Additional styles for tab text
  },
  activeTab: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,

    // Style for active tab text
  },
  listContainer: {
    flex: 1,
  },
  categoryItem: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#e1e1e1',
    paddingVertical: 20,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    // Additional styles for category text
  },
  // ... other styles
});

export default MenuStackScreen;
