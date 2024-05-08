import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SetRow from './SetRow';

const ExerciseCard = ({ exercise }) => {
    const [sets, setSets] = useState([]);

    const addSet = (weight, reps) => {
        setSets([...sets, { weight, reps }]);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{`${exercise.name} - ${exercise.type}`}</Text>
            {sets.map((set, index) => (
                <Text key={index}>{`Set ${index + 1}: ${set.weight} kg - ${set.reps} reps`}</Text>
            ))}
            <SetRow onAddSet={addSet} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});

export default ExerciseCard;
