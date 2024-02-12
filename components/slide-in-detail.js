import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const SlideInDetail = ({selectedOptions, setSelectedOptions, modalVisible, setModalVisible}) => {

//   const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
      
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>x</Text>
            </TouchableOpacity>

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
          </View>
        </View>
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
    borderRadius: 5,
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
    borderRadius: 20,
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  optionText: {
    color: 'black',
    fontSize: 13,
  },
  closeModalButton: {
    position: 'absolute',
    left:'105%',
  },

  closeModalButtonText: {
    color: 'black',
    fontSize: 22,
  },

});

export default SlideInDetail;
