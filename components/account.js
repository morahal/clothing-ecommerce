import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');
const navbarHeight = 80; // Height of the navbar

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('INFORMATION');

  const renderContent = () => {
    switch (activeTab) {
      case 'FAVORITES':
        return <FavoritesTab />;
      case 'PROFILE':
        return <InformationTab />;
      case 'PURCHASES':
        return <PurchasesTab />;
      default:
        return <FavoritesTab />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {['FAVORITES', 'PROFILE', 'PURCHASES'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 1,
    margin: 8,
  },
  activeTab: {

},
  tabText: {
    fontSize: 13,
    padding: 4,
    // fontWeight: 'bold',
  },

  infoContainer: {
    flex: 1,
  },
  profileSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    textAlign: 'left',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
},
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
  },
  infoTitle: {
    fontSize: 13,
  },
  infoValue: {
    fontSize: 12,
    color: '#808080',
  },
  actionButton: {
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    marginTop: 70,
  },
  actionText: {
    fontSize: 13,
  },
  // ... other styles for the content of each tab
});

const FavoritesTab = () => {
  // Render the favorite items here
  return (
    <View>
      <Text>Favorites content goes here.</Text>
      {/* Map through the favorite items and render them */}
    </View>
  );
};

const InformationTab = () => {
  // Define the list of information items
  const infoItems = [
    { title: 'ADDRESSES', value: '', action: () => {} }, // Add the action to navigate to the Addresses page
    { title: 'WALLET', value: '', action: () => {} },    // Add the action to navigate to the Wallet page
    { title: 'EMAIL', value: 'moodyrah@gmail.com', action: () => {} },
    { title: 'PHONE NUMBER', value: '+961 78934556', action: () => {} },
    { title: 'PASSWORD', value: '********', action: () => {} },
  ];

  return (
    <ScrollView style={styles.infoContainer}>
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>MOHAMMAD RAHAL</Text>
      </View>
      {infoItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.infoItem} onPress={item.action}>
          <Text style={styles.infoTitle}>{item.title}</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>LOGOUT</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const PurchasesTab = () => {
  // Render the purchase history here
  return (
    <View>
      <Text>Purchases content goes here.</Text>
      {/* Map through the purchase history and render it */}
    </View>
  );
};

export default AccountPage;
