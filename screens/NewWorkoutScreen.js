import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import ExercisePicker from '../components/ExercisePicker';
import WorkoutService from '../services/WorkoutService';
import ExerciseCard from '../components/ExerciseCard';

const NewWorkoutScreen = ({ navigation }) => {
    const predefinedExercises = [
        { id: 1, name: "Squats", type: "Legs", bodyPart: "Quadriceps" },
        { id: 2, name: "Bench Press", type: "Chest", bodyPart: "Pectorals" },
        { id: 3, name: "Deadlifts", type: "Back", bodyPart: "Lower Back" },
    ];

    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [workoutExercises, setWorkoutExercises] = useState([]);

    const addExerciseToWorkout = () => {
        const exercise = predefinedExercises.find(e => e.id === selectedExerciseId);
        if (exercise && !workoutExercises.find(e => e.id === exercise.id)) {
            setWorkoutExercises(prev => [...prev, exercise]);
        }
    };

    const saveWorkout = async () => {
        if (workoutExercises.length === 0) {
            Alert.alert("Empty Workout", "No exercises to save. Please add some exercises before saving.");
            return;
        }

        const workout = {
            id: `workout-${new Date().getTime()}`,
            date: new Date().toISOString(),
            exercises: workoutExercises
        };

        try {
            await WorkoutService.addWorkout(workout);
            Alert.alert("Success", "Workout saved successfully!");
            setWorkoutExercises([]);
            navigation.navigate('History');
        } catch (error) {
            Alert.alert("Error", "Failed to save the workout. Please try again.");
            console.error("Failed to save workout:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <ExercisePicker
                    exercises={predefinedExercises}
                    selectedValue={selectedExerciseId}
                    onChange={setSelectedExerciseId}
                />
                <TouchableOpacity onPress={addExerciseToWorkout} style={styles.addButton}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={workoutExercises}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ExerciseCard exercise={item} />}
            />
            <Button title="Save Workout" onPress={saveWorkout} color="#00C853" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    addButton: {
        padding: 10,
        marginLeft: 10,
        backgroundColor: '#1565C0',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
    }
});

export default NewWorkoutScreen;
