import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SetRow from './SetRow';

const ExerciseCard = ({ exercise, sets, onAddSet }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{`${exercise.name} - ${exercise.type}`}</Text>
            <View style={styles.tableHeader}>
                
                <Text style={styles.headerText}>kg</Text>
                <Text style={styles.headerText}>Reps</Text>
            </View>
            {sets.map((set, index) => (
                <View style={styles.setInfo} key={index}>
                    <Text style={styles.setText}>{`${set.weight} kg`}</Text>
                    <Text style={styles.setText}>{`${set.reps} reps`}</Text>
                </View>
            ))}
            <SetRow onAddSet={(weight, reps) => onAddSet(exercise.id, weight, reps)} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '100%',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',  // Semibold
        color: '#007bff',
        marginBottom: 25,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Changed to align items to the left
        marginBottom: 10,
    },
    headerText: {
        fontWeight: 'bold',
        color: '#333',
        width: 100,
        marginRight: 10
    },
    setInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Changed to align items to the left
        paddingVertical: 5,
    },
    setText: {
        color: '#666',
        marginRight: 10, // Maintain the same spacing as in the header
        width:100
    }
});

// No need to change the component JSX unless you want to add more specific adjustments


export default ExerciseCard;
