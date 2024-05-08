import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddWorkoutScreen = ({ navigation }) => {
    const handleAddWorkout = () => {
        // Navigate to NewWorkoutScreen when the button is clicked
        navigation.navigate('NewWorkoutScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a new workout</Text>
            <TouchableOpacity style={styles.button} onPress={handleAddWorkout}>
                <Text style={styles.buttonText}>Add Workout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 50,  // Make the button round
        paddingVertical: 15,
        paddingHorizontal: 30,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default AddWorkoutScreen;
