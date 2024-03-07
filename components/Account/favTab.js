/********************************* The Favorites Tab  ***********************************/
import Card from '../card';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Dimensions, FlatList} from 'react-native';
import { BASE_URL } from '../../constants';
import { useFavorites } from '../favContext';

const { width: viewportWidth } = Dimensions.get('screen');
const navbarHeight = 80; // Height of the navbar

const FavoritesTab = () => {
  const navigation = useNavigation(); // Hook to get access to navigation object
  const { state } = useFavorites(); // Using favorites directly from the context

//console.log("favorites context:", state.favorites);

  

  const renderItem = ({ item }) => {
    const imageUrl = `${BASE_URL}${item.image1}`;
    return (
    <Card
      title={item.name}
      imageUrl={{ uri: imageUrl }}
      price = {item.price}
      id = {item.id}
      onPress={() => navigation.navigate('DetailsPage', { item, origin: 'FavoritesTab' })}
    />
  )
  };
  
  return (
    
    <>
       <FlatList
         data={state.favorites}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         numColumns={2}
         style={styles.favorites}
       >
      
       </FlatList>
     
      </>
  
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
    },
  
  });

  export default FavoritesTab;