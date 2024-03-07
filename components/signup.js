// SignUpPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [UserName, setUserName] = useState('');

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
    //return address.length > 5;
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    return nameRegex.test(address);
  };

  const validateMobilePhone = (phone) => {
    // This regex checks for an international phone number format
    // const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    // return phoneRegex.test(phone);
  };

  // const validateUserName = (username) => {
  //   // This regex allows letters, spaces, hyphens, and apostrophes only
  //   const nameRegex = /^[a-zA-Z\s'-]+$/;
  //   return nameRegex.test(username);
  // };



  const checkUsername = async (userName) => {
    try {
      const url = `${BASE_URL}/checkUsername/${userName}/`;
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
      });

      const data = await response.json();
      console.log(data.message);

      if (data.message === "Username exists") {
        Alert.alert('Username already exists');
        return;
      }
      else {
        handleSignUp();
        return;
      }
    } catch (error) {
      console.error('Error checking username:', error);
      // Alert.alert('Error', 'There was an error checking the username.');
    }
    return;
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

    if (!validateFullName(firstName)) {
      Alert.alert('Invalid firstName', 'Please enter your first name.');
      return;
    }

    if (!validateFullName(lastName)) {
      Alert.alert('Invalid lastName', 'Please enter your last name.');
      return;
    }


    if (!validateAddress(address)) {
      Alert.alert('Invalid Address', 'Please enter your address.');
      return;
    }

    // if (!validateMobilePhone(mobilePhone)) {
    //   Alert.alert('Invalid Phone Number', 'Please enter a valid mobile phone number.');
    //   return;
    // }


    //console.log('All validations passed. Implement sign-up logic.');
    //console.log(UserName, email, address, mobilePhone, dob, firstName, lastName, address, password);

    const userData = {
      "username": UserName,
      "password": password,
      "email": email,
      "address": address,
      "phoneNb": mobilePhone,
      "firstName": firstName,
      "lastName": lastName,
    };

    console.log(JSON.stringify(userData));

    const signUpUser = async (userData) => {
      try {
        const response = await fetch(`${BASE_URL}/createUser/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const jsonResponse = await response.json();
        console.log('User and profile created:', jsonResponse);

        if (jsonResponse.access) {
          // Store the access token upon successful login
          await AsyncStorage.setItem('accessToken', jsonResponse.access);
          // Navigate to the Home screen or handle login success
          navigation.navigate("Home");
          console.log("You're logged in.");
          
        }

        // Proceed with any follow-up actions after successful sign-up
        // For example, navigating to a different screen or showing a success message
      } catch (error) {
        console.error('Failed to sign up:', error);
      }
    };


    signUpUser(userData);

  };

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 100}
    >

      <ScrollView>
        <View style={styles.innerContainer}>
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
            placeholder="User Name"
            value={UserName}
            onChangeText={setUserName}
          />

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setfirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setlastName}
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
          <TouchableOpacity style={styles.button} onPress={() => checkUsername(UserName)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    // paddingHorizontal: 20,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    // marginTop: 50,
  },
  innerContainer: {
    // paddingTop: 80,
    paddingHorizontal: 20,
    // ... other styles
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
