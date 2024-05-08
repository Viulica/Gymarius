import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Alert } from 'react-native';
import WorkoutService from '../services/WorkoutService';

const HistoryScreen = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchWorkouts();
        });

        fetchWorkouts();  // Fetch initially on load

        return unsubscribe;
    }, [navigation]);

    const fetchWorkouts = async () => {
        const allWorkouts = await WorkoutService.getWorkouts();
        setWorkouts(allWorkouts);
    };

    const handleDeleteWorkout = (id) => {
        Alert.alert(
            "Delete Workout",
            "Are you sure you want to delete this workout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteWorkout(id) }
            ]
        );
    };

    const deleteWorkout = async (id) => {
        await WorkoutService.deleteWorkout(id);
        fetchWorkouts();  // Re-fetch workouts after deletion
    };

    return (
        <ScrollView style={styles.container}>
            {workouts.map((workout) => (
                <View key={workout.id} style={styles.workoutDetails}>
                    <Text>Workout ID: {workout.id}</Text>
                    <Text>Date: {workout.date}</Text>
                    <Text>Exercises: {workout.exercises.length}</Text>
                    <Button title="Delete" onPress={() => handleDeleteWorkout(workout.id)} color="#FF4500" />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    workoutDetails: {
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    }
});

export default HistoryScreen;
