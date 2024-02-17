import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

const SuggestionsPage = ({navigation}) => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <SafeAreaView style={styles.container}>
    {/* <View style ={{alignItems: 'center'}}> */}
        <Text style = {styles.title}> Size Measurements</Text>
    {/* </View> */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* <Text style={styles.label}>Age</Text> */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
        />

        {/* <Text style={styles.label}>Height (cm)</Text> */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholder="Enter your height"
        />

        {/* <Text style={styles.label}>Weight (kg)</Text> */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter your weight"
        />

        {/* <Text style={styles.label}>Notes</Text> */}
        {/* <TextInput
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter any notes"
        /> */}

        <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate('ResultPage')}>
          <Text style={styles.buttonText}>SEE RESULT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'blue',
    //marginTop: 200,
    padding:0,
    
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    color: 'black',
  },
//   input: {
//     backgroundColor: '#F0F0F0',
//     borderRadius: 10,
//     padding: 15,
//     fontSize: 16,
//     color: 'black',
//   },
input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 24,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
//   button: {
//     backgroundColor: 'black',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
button: {
    marginTop: 30, // Space from the last input to the button
    backgroundColor: '#000', // Button background color
    paddingVertical: 15, // Vertical padding for the button
    borderRadius: 25, // Rounded corners for the button
    justifyContent: 'center', // Center content inside the button
    alignItems: 'center', // Center content inside the button horizontally
  },

//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },

buttonText: {
    color: '#fff', // Text color for the button
    fontSize: 14, // Button text size
    fontWeight: 'bold', // Button text weight
  },

  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 200,
     // Space between header and form inputs
    // alignSelf: 'center', // Center header text
    color: '#000', // Text color for the header
    // borderWidth: 2,
    // borderColor: 'red',
  }

});

export default SuggestionsPage;