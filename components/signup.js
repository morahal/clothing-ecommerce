// SignUpPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [cardHolder, setCardHolder] = useState('');
  const [cvv, setCvv] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  
  // Helper function to handle showing the date picker
  const showDatePicker = () => {
    // Android mode is 'date' and display 'spinner' so users can pick month and year
    // iOS uses 'spinner' which allows picking month and year directly
    const mode = Platform.OS === 'android' ? 'date' : 'spinner';
    setDatePickerVisibility(true); // Corrected function call
  };

  const onDateChange = (event, selectedDate) => {
    setDatePickerVisibility(Platform.OS === 'ios'); // For iOS, we directly hide the picker
    if (selectedDate) {
      setDate(selectedDate); // Update the date state
      const formattedDate = formatExpiryDate(selectedDate);
      setExpiryDate(formattedDate);
    }
  };

  // Function to format the date to MM/YY
  const formatExpiryDate = (date) => {
    let month = '' + (date.getMonth() + 1),
        year = '' + date.getFullYear().toString().substr(-2);

    if (month.length < 2) month = '0' + month;

    return `${month}/${year}`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // This regex checks for at least one uppercase letter and at least one digit.
  // It does not restrict lowercase letters and does not allow %, -, or /
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*[^%\-\/]*$/;
    return passwordRegex.test(password);
  };

  const validateFullName = (name) => {
    // This regex allows letters, spaces, hyphens, and apostrophes only
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    return nameRegex.test(name);
  };

  const validateAddress = (address) => {
    // Basic check for length, can be improved with more specific checks
    return address.length > 5;
  };

  const validateMobilePhone = (phone) => {
    // This regex checks for an international phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const validateCardNumber = (number) => {
    // Basic check for a 16 digit card number
    const cardNumberRegex = /^\d{16}$/;
    return cardNumberRegex.test(number.replace(/\s+/g, '')); // Remove spaces before testing
  };

  const validateExpiryDate = (date) => {
    // MM/YY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return expiryDateRegex.test(date);
  };

  const validateCardHolder = (name) => {
    // Allows letters, spaces, hyphens, and apostrophes
    const cardHolderRegex = /^[a-zA-Z\s'-]+$/;
    return cardHolderRegex.test(name);
  };

  const validateCVV = (cvv) => {
    // 3 or 4 digits for CVV
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
  };

  // Function to handle the sign-up logic
  const handleSignUp = () => {
    if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }
  
      if (!validatePassword(password)) {
        Alert.alert(
          'Invalid Password',
          'Password must include numbers and capital letters and should not include %, -, / signs.'
        );
        return;
  }

  if (!validateFullName(fullName)) {
    Alert.alert('Invalid Name', 'Please enter a valid full name.');
    return;
  }

  if (!validateAddress(address)) {
    Alert.alert('Invalid Address', 'Please enter a valid address.');
    return;
  }

  if (!validateMobilePhone(mobilePhone)) {
    Alert.alert('Invalid Phone Number', 'Please enter a valid mobile phone number.');
    return;
  }

  if (!validateCardNumber(cardNumber)) {
    Alert.alert('Invalid Card Number', 'Please enter a valid 16-digit card number.');
    return;
  }

  if (!validateExpiryDate(expiryDate)) {
    Alert.alert('Invalid Expiry Date', 'Please enter a valid expiry date in MM/YY format.');
    return;
  }

  if (!validateCardHolder(cardHolder)) {
    Alert.alert('Invalid Card Holder Name', 'Please enter the card holder name correctly.');
    return;
  }

  if (!validateCVV(cvv)) {
    Alert.alert('Invalid CVV', 'Please enter a valid CVV code.');
    return;
  }

  console.log('All validations passed. Implement sign-up logic.');

  
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PERSONAL DETAILS</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile phone"
        value={mobilePhone}
        onChangeText={setMobilePhone}
        keyboardType="phone-pad"
      />
      {/* <Text style={styles.title}>DATA OF YOUR CARD</Text>
      <TextInput
        style={styles.input}
        placeholder="Card number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YYYY)"
          value={expiryDate} 
          editable={false} 
        />
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="spinner" 
          onChange={onDateChange}
          minimumDate={new Date()}
          maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Card holder"
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV2 security code"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
        maxLength={4} // CVV2 codes are typically 3 or 4 digits
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignUpPage;
