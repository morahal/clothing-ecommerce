import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BASE_URL } from '../constants';

const SuggestionsPage = () => {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigation = useNavigation();

    const [predictedSize, setPredictedSize] = useState('');


    const validateInputs = () => {
        // Check if any of the fields is empty
        return age.trim() && height.trim() && weight.trim();
    };

    // const handleSeeResult = () => {
    //     if (!validateInputs()) {
    //         // If validation fails, show an alert and do not proceed
    //         Alert.alert("Invalid Input", "Please fill in all fields.");
    //         return;
    //     }

    //     setLoading(true); // Show the loading indicator

    //     // Use a timeout to simulate a loading period
    //     setTimeout(() => {
    //       setLoading(false); // Hide the loading indicator
    //       setShowResults(true); // Show the results
    //     }, 2000); // 300
    // };


    const handleSeeResult = async () => {
        if (!validateInputs()) {
            Alert.alert("Invalid Input", "Please fill in all fields.");
            return;
        }
    
        setLoading(true); // Show the loading indicator
    
        const requestBody = {
            weight: weight,
            age: age,
            height: height
        };
    
        try {
            // Replace 'your-api-endpoint-url' with your actual API endpoint URL
            const response = await fetch(`${BASE_URL}/predict-size/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.detail || 'An error occurred while fetching data.');
            }
    
            const predictedSize = data['Random Forest Tuned Size'];
            setShowResults(true);
            setPredictedSize(predictedSize); // You will need to define this state variable
    
        } catch (error) {
            console.error("There was an error fetching the predicted size", error);
            Alert.alert("Error", "Could not retrieve the predicted size.");
            setShowResults(false);
        } finally {
            setLoading(false); // Hide the loading indicator
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>

            {!showResults && !loading && (
                <View styles={styles.measureView}>

                    <Text style={styles.title}> Size Measurements</Text>
                    <ScrollView contentContainerStyle={styles.content}>
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


                        <TouchableOpacity style={styles.button} onPress={handleSeeResult}>
                            <Text style={styles.buttonText}>SEE RESULT</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )}

            {loading && (

            <View style={styles.loading}>
                <ActivityIndicator size="large" color="black"/>
            </View>
            )}

            {showResults && !loading &&  (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>YOUR SUGGESTED SIZE IS</Text>

                    {/* <Text style={styles.size}>-</Text> */}
                    <Text style={styles.size}>{predictedSize || '-'}</Text>


                    <TouchableOpacity style={styles.resultButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 0,
        justifyContent: 'center',
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

    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        // marginTop: 200,
        color: '#000', // Text color for the header

    },
    resultContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 0,
        justifyContent: "center", tifyContent: "center",
        // display: 'none',
    },

    resultButton: {
        marginTop: 100, // Space from the last input to the button
        backgroundColor: "#000", // Button background color
        paddingVertical: 15, // Vertical padding for the button
        borderRadius: 25, // Rounded corners for the button
        justifyContent: "center", // Center content inside the button
        alignItems: "center",
        width: '80%',
        alignSelf: 'center' // Center content inside the button horizontally
    },

    buttonText: {
        color: "#fff", // Text color for the button
        fontSize: 18, // Button text size
        fontWeight: "bold", // Button text weight
    },

    resultTitle: {
        alignSelf: "center",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#000",
    },
    size: {
        fontSize: 40,
        alignSelf: "center",
        fontWeight: "bold",
        marginTop: 30,
    },
    loading:{
        alignSelf: 'center',
        justifyContent: 'center',
    }

});

export default SuggestionsPage;