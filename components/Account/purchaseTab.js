import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, FlatList, ScrollSafeView } from 'react-native';

// /********************************* The Purchase Tab  ***********************************/

const PurchasesTab = () => {
  // Define the list of orders, each with multiple items
  const orders = [
    // Replace with actual orders and items
    {
      estimatedDelivery: 'Estimated Delivery: 06 Feb - 15 Feb',
      totalPrice: '28,200,000',
      items: [
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        // ...additional items
      ],
    },

    {
      estimatedDelivery: 'Estimated Delivery: 06 Feb - 15 Feb',
      totalPrice: '28,200,000',
      items: [
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
        },
        {
          imageUrl: require('../../assets/b1.jpg'),
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
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
    purchasesContainer: {
            flex: 1,
            // borderTopWidth: 1,
            // borderTopColor: 'black',
            marginBottom: 80,
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
});

export default PurchasesTab;

// /********************************* ****************************  ***********************************/