// PaymentScreen.js
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PaymentScreen = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cvv, setCvv] = useState('');

    const validateInputs = () => {
        // Check if any of the fields are empty
        if (!cardNumber || !expiryDate || !cardHolder || !cvv) {
          Alert.alert('Missing Information', 'Please fill out all the fields.');
          return false;
        }
      
        // Validate card number (simple validation checking length of card number)
        if (cardNumber.length !== 16) {
          Alert.alert('Invalid Card Number', 'A standard card number must have 16 digits.');
          return false;
        }
        
        // Validate expiry date (MM/YY format)
        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!expiryRegex.test(expiryDate)) {
          Alert.alert('Invalid Expiry Date', 'Expiry date must be in MM/YY format.');
          return false;
        }
      
        // Validate card holder name (checking if it's not empty and has at least two names)
        const names = cardHolder.trim().split(' ');
        if (names.length < 2) {
          Alert.alert('Invalid Card Holder Name', 'Please enter the full name as it appears on the card.');
          return false;
        }
      
        // Validate CVV (simple validation checking length of CVV)
        if (cvv.length < 3 || cvv.length > 4) {
          Alert.alert('Invalid CVV', 'CVV must be 3 or 4 digits long.');
          return false;
        }
      
        // If all validations pass
        return true;
      };

      const handleSubmit = () => {
        if (validateInputs()) {
          // Process the valid inputs
          console.log('Processing payment...');
          // You might navigate to a success page or handle the payment processing here
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DATA OF YOUR CARD</Text>
      <TextInput placeholder="CARD NUMBER" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="EXPIRY DATE" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="CARD HOLDER" style={styles.input} />
      <TextInput placeholder="CVV2 SECURITY CODE" style={styles.input} keyboardType="numeric" />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>AUTHORISE PAYMENT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Assuming a white background
        paddingTop: 20, // Add padding at the top of the screen
        paddingHorizontal: 20, 
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 80,
         // Space between header and form inputs
        // alignSelf: 'center', // Center header text
        color: '#000', // Text color for the header
      },
      input: {
        height: 50, // Fixed height for inputs
        marginVertical: 10, // Margin vertical for spacing between inputs
        borderBottomWidth: 1, // Border bottom width
        borderBottomColor: '#000', // Border color
        fontSize: 12, // Input text size
        paddingLeft: 10, // Padding inside the input
      },
      button: {
        marginTop: 30, // Space from the last input to the button
        backgroundColor: '#000', // Button background color
        paddingVertical: 15, // Vertical padding for the button
        borderRadius: 25, // Rounded corners for the button
        justifyContent: 'center', // Center content inside the button
        alignItems: 'center', // Center content inside the button horizontally
      },
      buttonText: {
        color: '#fff', // Text color for the button
        fontSize: 14, // Button text size
        fontWeight: 'bold', // Button text weight
      },
  // ... other styles
});

export default PaymentScreen;
