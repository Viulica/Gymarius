import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SetRow = ({ onAddSet }) => {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    return (
        <View style={styles.setRow}>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButton} onPress={() => onAddSet(weight, reps)}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    setRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 100,
        marginRight: 10,
        borderRadius: 5
    },
    addButton: {
        backgroundColor: '#007AFF',  
        borderRadius: 5,
        padding: 10,
        width: 100,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    }
});

export default SetRow;
