import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ResultPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>YOUR SUGGESTED SIZE IS</Text>

      <Text style={styles.size}>M</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 0,
    justifyContent: "center",tifyContent: "center",
  },

  button: {
    marginTop: 100, // Space from the last input to the button
    backgroundColor: "#000", // Button background color
    paddingVertical: 15, // Vertical padding for the button
    borderRadius: 25, // Rounded corners for the button
    justifyContent: "center", // Center content inside the button
    alignItems: "center",
    width:'80%',
    alignSelf: 'center' // Center content inside the button horizontally
  },

  buttonText: {
    color: "#fff", // Text color for the button
    fontSize: 18, // Button text size
    fontWeight: "bold", // Button text weight
  },

  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    // marginTop: 200,

    color: "#000",
    // borderWidth: 2,
    // borderColor: 'red',
  },
  size: {
    fontSize: 32,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 30,
  }
 });

export default ResultPage;
