import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SetRow = ({ onAddSet }) => {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    return (
        <View style={styles.setRow}>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight (kg)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={reps}
                onChangeText={setReps}
                placeholder="Reps"
                keyboardType="numeric"
            />
            <Button title="Add" onPress={() => onAddSet(weight, reps)} />
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
        width: 70,
    }
});

export default SetRow;
