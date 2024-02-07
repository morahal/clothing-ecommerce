import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const navbarHeight = 80; // Height of the navbar

const categories = {
  Men: ['T-Shirt', 'Shirts','Sweatpants', 'Jeans', 'Trousers','Jackets', 'Sweaters & Hoodies','Shoes'],
  Women: ['Lifestyle', 'Food', 'Nature'],
  Kids: ['Tech', 'Automotive', 'Travel'],
};

const MenuPage = () => {

  const [selectedTab, setSelectedTab] = useState('Men'); // Default selected tab


  const TabContent = () => {
    const categoryList = categories[selectedTab];
    return (
      <ScrollView>
      {categoryList.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem}>
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    );
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
        <TabContent />
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
    fontSize: 15,
    // Additional styles for category text
  },
  // ... other styles
});

export default MenuPage;
