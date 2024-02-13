import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useBag } from './bagCntext';

const SlideInDetail = ({selectedOptions, setSelectedOptions, modalVisible, setModalVisible}) => {
  // const { addToBag } = useBag(); // Use the addToBag function from the context

  // Define options
  const sizeOptions = ['S', 'M', 'L', 'XL'];
  const colorOptions = ['Red', 'Green', 'Blue', 'Yellow'];

  // Handlers for selecting options
  const handleSelectOption = (type, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: prev[type] === option ? null : option // Toggle selection
    }));
  };

  // const handleAddToBag = () => {
  //   // Add logic to fetch item details such as image and price
  //   const itemDetails = {
  //     size: selectedOptions.size,
  //     color: selectedOptions.color,
  //     // Add other details like image and price
  //   };
  //   addToBag(itemDetails);
  //   setModalVisible(false); // Close the modal after adding to bag
  // };

  return (
    <View style={styles.container}>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
         {/* <TouchableOpacity
        //style={styles.modalOverlay}
        //activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
      > */}

      
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>

            {/* Size Options */}
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.optionsContainer}>
              {sizeOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOptions.size === option ? styles.optionSelected : {}
                  ]}
                  onPress={() => handleSelectOption('size', option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Color Options */}
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.optionsContainer}>
              {colorOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOptions.colour === option ? styles.optionSelected : {}
                  ]}
                  onPress={() => handleSelectOption('colour', option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  openModalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    },
  openModalButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',

    // borderWidth: 1, // Set the width of the border
    // borderColor: 'red', // Set the color of the border
    // borderStyle: 'solid',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,

    // borderWidth: 1, // Set the width of the border
    // borderColor: 'blue', // Set the color of the border
    // borderStyle: 'solid',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 0,
    margin: 5,
  },
  optionSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  optionText: {
    color: 'black',
    fontSize: 13,
  },
  closeModalButton: {
    // position: 'absolute',
    // left:'105%',
    marginTop: 15,
  },

  closeModalButtonText: {
    color: 'black',
    fontSize: 28,
  },

});

export default SlideInDetail;
