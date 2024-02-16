
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, FlatList, ScrollSafeView } from 'react-native';

const InformationTab = () => {
  // Define the list of information items
  const infoItems = [
    { title: 'ADDRESSES', value: '', action: () => {} }, // Add the action to navigate to the Addresses page
    { title: 'WALLET', value: '', action: () => {} },    // Add the action to navigate to the Wallet page
    { title: 'EMAIL', value: 'moodyrah@gmail.com', action: () => {} },
    { title: 'PHONE NUMBER', value: '+961 78934556', action: () => {} },
    { title: 'PASSWORD', value: '****', action: () => {} },
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

const styles = StyleSheet.create({
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
});

export default InformationTab;