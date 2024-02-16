/********************************* The Favorites Tab  ***********************************/
import Card from '../card';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, FlatList, ScrollSafeView } from 'react-native';

const { width: viewportWidth } = Dimensions.get('screen');
const navbarHeight = 80; // Height of the navbar

const FavoritesTab = () => {
  const navigation = useNavigation(); // Hook to get access to navigation object
  const route = useRoute(); // Hook to get access to route object
  // Render the favorite items here
  const cardsData = [
    {
      id: '1',
      title: 'PUFFER JACKET',
      imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
      price: 290,
      description: 'A jacket typically has sleeves and fastens in the front or slightly on the side. A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing. ',
    },
  
    {
      id: '2',
      title: 'Blazer Lightning',
      imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
      price: 100,
    },
  
    {
      id: '3',
      title: 'Boneless Jacket',
      imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
      price: 100,
    },
  
    // {
    //   id: '4',
    //   title: 'BLACK COAT',
    //   imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
    //   price: 100,
    // },
  
    // {
    //   id: '5',
    //   title: 'BLACK COAT',
    //   imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
    //   price: 100,
    // },
  
    // {
    //   id: '6',
    //   title: 'BLACK COAT',
    //   imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
    //   price: 100,
    // },
  
    // {
    //   id: '7',
    //   title: 'BASIC PUFFER JACKET',
    //   imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
    //   price: 100,
    // },
    // {
    //   id: '8',
    //   title: 'BASIC PUFFER JACKET',
    //   imageUrl: [{ source: require('../../assets/b2.jpg') }, { source: require('../../assets/b1.jpg') }, { source: require('../../assets/b2.jpg') }],
    //   price: 100,
    // },
  ];

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      imageUrl={item.imageUrl[0].source}
      price = {item.price}
      onPress={() => navigation.navigate('DetailsPage', { item, origin: 'FavoritesTab' })}
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