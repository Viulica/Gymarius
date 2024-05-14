import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, TextInput } from 'react-native';
import ExercisePicker from '../components/ExercisePicker';
import WorkoutService from '../services/WorkoutService';
import ExerciseCard from '../components/ExerciseCard';
import { useChat } from './ChatContext';


const NewWorkoutScreen = ({ navigation }) => {
    const predefinedExercises = [
        { id: 1, name: "Squats", type: "Legs", bodyPart: "Quadriceps", sets: [] },
        { id: 2, name: "Bench Press", type: "Chest", bodyPart: "Pectorals", sets: [] },
        { id: 3, name: "Deadlifts", type: "Back", bodyPart: "Lower Back", sets: [] },
    ];

    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { chatHistory, setChatHistory } = useChat();
    const [workoutName, setWorkoutName] = useState(''); 


    const addExerciseToWorkout = () => {
        const exercise = predefinedExercises.find(e => e.id === selectedExerciseId);
        if (exercise && !workoutExercises.some(e => e.id === exercise.id)) {
            setWorkoutExercises(prev => [...prev, { ...exercise, sets: [] }]);
            setIsModalVisible(false); // Close modal after adding
        }
    };

    const addSetToExercise = (exerciseId, weight, reps) => {
        setWorkoutExercises(prev => prev.map(ex => {
            if (ex.id === exerciseId) {
                const newSets = [...ex.sets, { weight, reps }];
                return { ...ex, sets: newSets };
            }
            return ex;
        }));
    };

    const saveWorkout = async () => {
        if (workoutExercises.length === 0) {
            Alert.alert("Empty Workout", "No exercises to save. Please add some exercises before saving.");
            return;
        }

        const workout = {
            name: workoutName || 'Unnamed Workout', 
            id: `workout-${new Date().getTime()}`,
            date: new Date().toISOString(),
            exercises: workoutExercises
        };

        try {
            await WorkoutService.addWorkout(workout);
            Alert.alert("Success", "Workout saved successfully!");
            setWorkoutExercises([]);
            setChatHistory([]);
            setWorkoutName(''); // Reset workout name
            navigation.navigate('History');
        } catch (error) {
            Alert.alert("Error", "Failed to save the workout. Please try again.");
            console.error("Failed to save workout:", error);
        }
    };

    const clearWorkout = () => {
        setWorkoutExercises([]); // Clear the workout
        setWorkoutName(''); // Reset workout name
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.workoutNameInput}
                placeholder="Enter Workout Name"
                value={workoutName}
                onChangeText={setWorkoutName}
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
                <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>
            <FlatList
                data={workoutExercises}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ExerciseCard exercise={item} sets={item.sets} onAddSet={addSetToExercise} />}
                contentContainerStyle={{ alignItems: 'stretch' }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={clearWorkout}>
                    <Text style={styles.buttonText}>Cancel Workout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.chatButton}>
                    <Text style={styles.buttonText}>Ask Coach</Text>
                </TouchableOpacity>

            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addExerciseToWorkout}>
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <ExercisePicker
                        exercises={predefinedExercises}
                        selectedValue={selectedExerciseId}
                        onChange={setSelectedExerciseId}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    workoutNameInput: {
        fontSize: 18,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        color: '#333333',
        width: '100%', 
    },
    addButton: {
        padding: 10,
        backgroundColor: '#1565C0',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10
    },
    saveButton: {
        flex: 0.48,
        backgroundColor: '#00C853',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelButton: {
        flex: 0.48,
        backgroundColor: '#FF6347',
        borderRadius: 5,
        padding: 10,
    },
    modalView: {
        flex: 1,
        paddingTop: 22,
        paddingLeft: 10,
        paddingRight: 10
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    closeText: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    addText: {
        color: '#007AFF',
        fontSize: 16,
    },
    chatButton: {
        flex: 0.32,
        backgroundColor: '#4A90E2', 
        borderRadius: 5,
        padding: 10,
    }
});


export default NewWorkoutScreen;
