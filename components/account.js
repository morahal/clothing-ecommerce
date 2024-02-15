import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, FlatList, ScrollSafeView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import Card from './card';
import DetailsPage from './details';

const { width: viewportWidth } = Dimensions.get('window');
const navbarHeight = 80; // Height of the navbar

/**************** */

/**************** */

/*********** The Account Page  *************/
const AccountPage = () => {
  
  const [activeTab, setActiveTab] = useState('INFORMATION');

  const renderContent = () => {
    switch (activeTab) {
      case 'FAVORITES':
        //return <FavoritesTab />;
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
        {renderContent()}
    </View>
  );
};

/*********** **********  *************/



/*********** The Purchase Tab  *************/

const PurchasesTab = () => {
  // Define the list of orders, each with multiple items
  const orders = [
    // Replace with actual orders and items
    {
      estimatedDelivery: 'Estimated Delivery: 06 Feb - 15 Feb',
      totalPrice: '28,200,000',
      items: [
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        // ...additional items
      ],
    },

    {
      estimatedDelivery: 'Estimated Delivery: 06 Feb - 15 Feb',
      totalPrice: '28,200,000',
      items: [
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        {
          imageUrl: require('../assets/b1.jpg'),
        },
        // ...additional items
      ],
    },
    // ...additional orders
  ];

  const renderOrderItem = ({ item }) => <PurchaseItem order={item} />;
  return (
    // <ScrollView style={styles.purchasesContainer}>
    //   {orders.map((order, index) => (
    //     <PurchaseItem key={index} order={order} />
    //   ))}
    // </ScrollView>

    <FlatList
    data={orders}
    renderItem={renderOrderItem}
    keyExtractor={(item, index) => `order-${index}`}
    contentContainerStyle={styles.purchasesContainer}
  />

  );
};


const PurchaseItem = ({ order }) => {
  return (
    <View style={styles.purchaseItem}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemEstimatedDelivery}>{order.estimatedDelivery}</Text>
        <Text style={styles.itemPrice}>{order.totalPrice} LBP</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsContainer}
      >
        {order.items.map((item, index) => (
          <Image key={index} source={item.imageUrl} style={styles.itemImage} />
        ))}
      </ScrollView>
    </View>
  );
};

/*********** **********  *************/




/*********** The Profile Tab  *************/

const InformationTab = () => {
  // Define the list of information items
  const infoItems = [
    { title: 'ADDRESSES', value: '', action: () => {} }, // Add the action to navigate to the Addresses page
    { title: 'WALLET', value: '', action: () => {} },    // Add the action to navigate to the Wallet page
    { title: 'EMAIL', value: 'moodyrah@gmail.com', action: () => {} },
    { title: 'PHONE NUMBER', value: '+961 78934556', action: () => {} },
    { title: 'PASSWORD', value: '**', action: () => {} },
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

/*********** **********  *************/



/*********** The Favorites Tab  *************/

const FavoritesTab = () => {
  const navigation = useNavigation(); // Hook to get access to navigation object
  const route = useRoute(); // Hook to get access to route object
  // Render the favorite items here
  const cardsData = [
    {
      id: '1',
      title: 'PUFFER JACKET',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 290,
      description: 'A jacket typically has sleeves and fastens in the front or slightly on the side. A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing. ',
    },
  
    {
      id: '2',
      title: 'Blazer Lightning',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 100,
    },
  
    {
      id: '3',
      title: 'Boneless Jacket',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 100,
    },
  
    {
      id: '4',
      title: 'BLACK COAT',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 100,
    },
  
    {
      id: '5',
      title: 'BLACK COAT',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 100,
    },
  
    {
      id: '6',
      title: 'BLACK COAT',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 100,
    },
  
    {
      id: '7',
      title: 'BASIC PUFFER JACKET',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 100,
    },
    {
      id: '8',
      title: 'BASIC PUFFER JACKET',
      imageUrl: [{ source: require('../assets/b2.jpg') }, { source: require('../assets/b1.jpg') }, { source: require('../assets/b2.jpg') }],
      price: 100,
    },
  ];

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      imageUrl={item.imageUrl[0].source}
      price = {item.price}
      onPress={() => navigation.navigate('DetailsPage', { item })}
      //onPress={() => navigation.navigate('DetailsPage', { item, origin: 'FavoritesTab' })}

    />
  );
  
  return (
    
    <>
       <FlatList
         data={cardsData}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         numColumns={2}
         style={styles.favorites}
       >
      
       </FlatList>
     
      </>
  
  );
};
/*********** **********  *************/



/*********** The Styles  *************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
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

  purchasesContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'black',
    marginBottom: navbarHeight,
  },
  purchaseItem: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 20,
  },

  itemsContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },

  itemImage: {
    width: viewportWidth * 0.4, // Adjust the width as needed
    height: 200,
    marginLeft: 1,
    
  },
  itemDetails: {
    padding: 10,
  },
  itemEstimatedDelivery: {
    fontSize: 14,
    color: '#808080',
    paddingTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  // ... other styles for the content of each tab

  favorites: {
    backgroundColor: 'white',
   // width: viewPortWidth,
    //borderBlockColor: 'black',
    //marginTop: 50,

    // borderWidth: 2, // Set the width of the border
    // borderColor: 'red', // Set the color of the border
    // borderStyle: 'solid',

    marginBottom: navbarHeight,
  },

});

export default AccountPage;