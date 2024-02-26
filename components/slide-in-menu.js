import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';

const ListItem = ({ title, onPress, selected }) => {
    return (
      <TouchableOpacity style={[styles.item, selected ? styles.selected : styles.notSelected]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  };

const OptionsModal = ({ visible, onClose, options, selectedOption, onSelect }) => {
  const handleSelect = (option) => {
    onSelect(option);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
       <View style={styles.modalView}>

        <SafeAreaView style={{ width: '100%' }}>
          {options.map((option, index) => (
          <TouchableOpacity
          key={index}
          style={[
          styles.modalItem,
          selectedOption === option ? styles.selectedOption : null, // Conditional style
          ]}
          onPress={() => handleSelect(option)} // handleSelect should be defined to update the selected option
          >
          <Text style={styles.modalText}>{option}</Text>
          </TouchableOpacity>
          ))}
        </SafeAreaView>
      </View>
    </TouchableOpacity>
  </Modal>
  );
};

const SlideInMenu = ({selectedOptions, setSelectedOptions}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentOptionType, setCurrentOptionType] = useState('');
  // const [selectedOptions, setSelectedOptions] = useState({
  //   size: null,
  //   price: null,
  //   colour: null,
  //   type: null,
  // });

  const handleSelect = (option) => {
    setSelectedOptions(prevOptions => {
      // Check if the option is already selected, if so, unselect it
      if (prevOptions[currentOptionType] === option) {
        return { ...prevOptions, [currentOptionType]: null };
      } else {
        return { ...prevOptions, [currentOptionType]: option };
      }
    });
    setModalVisible(false);
  };
  
  
  const handlePress = (optionType) => {
    // Define the options based on the type
    const optionsByType = {
      size: ['S', 'M', 'L', 'XL'],
      price: ['$10 - $20', '$20 - $30', '$30 - $40', '$40 - $50'],
      colour: ['Red', 'Green', 'Blue', 'Yellow'],
      type: ['BASIC', 'STRAIGHT FIT'],
    };

    setOptions(optionsByType[optionType]);
    setCurrentOptionType(optionType);
    setModalVisible(true);
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.list}>
        <ListItem title="SIZE" onPress={() => handlePress('size')} selected={selectedOptions.size !== null}/>
        <ListItem title="PRICE" onPress={() => handlePress('price')} selected={selectedOptions.price !== null}/>
        <ListItem title="COLOUR" onPress={() => handlePress('colour')} selected={selectedOptions.colour !== null}/>
        <ListItem title="TYPE" onPress={() => handlePress('type')} selected={selectedOptions.type !== null}/>

      </View>

      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={options}
        selectedOption={selectedOptions[currentOptionType]}
        onSelect={handleSelect}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // borderWidth: 2, // Set the width of the border
    // borderColor: 'green', // Set the color of the border
    // borderStyle: 'solid',
    backgroundColor: 'white'
    
  },

  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    //marginTop: 50,
  },

  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalItem: {
    backgroundColor: 'black',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // borderBottomWidth: 1,
    // borderBottomColor: '#e1e1e1',
  },
  modalText: {
    fontSize: 16,
    color: 'white',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },

  selectedOption: {
    backgroundColor: 'gray', // Background color for selected option
  },




  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    borderWidth: 1, // Set the width of the border
    borderColor: 'gray', // Set the color of the border
     borderStyle: 'solid',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  selected: {
    backgroundColor:'rgba(0, 0, 0, 0.2)', // Background color for selected item
  },
  notSelected: {
    backgroundColor: 'white', // Background color for not selected item
  },
  
});

export default SlideInMenu;