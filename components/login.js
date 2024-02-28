// LoginPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginPage = ({ navigation }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // const validateUserName = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password) => {
  //   // This regex checks for at least one uppercase letter and at least one digit.
  // // It does not restrict lowercase letters and does not allow %, -, or /
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*[^%\-\/]*$/;
  //   return passwordRegex.test(password);
  // };

  const handleLogin = () => {

    const userData = {
      "username": username,
      "password": password,
    }

    console.log(JSON.stringify(userData));

    const login = async (userData) => {
      try {
        const response = await fetch(`${BASE_URL}/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const jsonResponse = await response.json();

        if (jsonResponse.access) {
          // Store the access token upon successful login
          await AsyncStorage.setItem('accessToken', jsonResponse.access);
          // Navigate to the Home screen or handle login success
          navigation.navigate("Home");
          console.log("You're logged in.");
          
        } else {
          console.log("Username or password incorrect");
        }


      }
      catch (err) {
        console.error('Failed to login:', err);
      }
    }

    login(userData);

    // navigation.navigate("Home");

  };


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ROSSO</Text>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUserName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { }}>
        <Text style={styles.forgotPassword}>Have you forgotten your password?</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#000',
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LoginPage;
