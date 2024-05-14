import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import WorkoutService from '../services/WorkoutService';
import moment from 'moment';  // Ensure you have moment.js installed

const HistoryScreen = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);
    const [expandedWorkoutIds, setExpandedWorkoutIds] = useState([]);

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

    const toggleDetails = (id) => {


        const currentIndex = expandedWorkoutIds.indexOf(id);
        const newExpandedIds = [...expandedWorkoutIds];

        if (currentIndex === -1) {
            newExpandedIds.push(id); // Add to the list of expanded items
        } else {
            newExpandedIds.splice(currentIndex, 1); // Remove from the list
        }

        setExpandedWorkoutIds(newExpandedIds);
    };

    return (
        <ScrollView style={styles.container}>
            {workouts.map((workout, index) => (
                <TouchableOpacity 
                    key={workout.id} 
                    style={styles.workoutDetails} 
                    onPress={() => toggleDetails(workout.id)}
                >
                    <Text style={styles.workoutTitle}>{workout.name}</Text>
                    <Text>Date: {moment(workout.date).format('D.M.YYYY')}</Text> 
                    <Text>Exercises: {workout.exercises.length}</Text>
                    {expandedWorkoutIds.includes(workout.id) && (
                        <View style={styles.exerciseDetails}>
                            {workout.exercises.map((exercise, idx) => (
                                <View key={`${workout.id}-exercise-${idx}`}>
                                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                                    {exercise.sets.map((set, setIdx) => (
                                        <Text key={`${workout.id}-exercise-${idx}-set-${setIdx}`}>
                                            {set.reps} reps of {set.weight} lbs
                                        </Text>
                                    ))}
                                </View>
                            ))}
                            </View>
                    )}
                    <Button title="Delete" onPress={() => handleDeleteWorkout(workout.id)} color="#FF4500" />
                </TouchableOpacity>
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
        borderRadius: 5,
        backgroundColor: '#f9f9f9'
    },
    workoutTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    exerciseDetails: {
        marginTop: 10,
        paddingLeft: 10
    },
    exerciseName: {
        fontWeight: 'bold'
    }
});

export default HistoryScreen;
