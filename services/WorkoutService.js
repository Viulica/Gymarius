import AsyncStorage from '@react-native-async-storage/async-storage';

class WorkoutService {
    static storageKey = 'workoutData';

    static async getWorkouts() {
        const data = await this.getData();
        return data ? data.workouts : []; // Return the workouts array or an empty array if no data
    }
    

    static async initializeAppData() {
        const currentData = await AsyncStorage.getItem(this.storageKey);
        if (!currentData) {
            const initialData = {
                exercises: {
                    "1": {"name": "Squats", "type": "Legs"},
                    "2": {"name": "Bench Press", "type": "Chest"},
                    "3": {"name": "Deadlifts", "type": "Back"},
                    "4": {"name": "Shoulder Press", "type": "Shoulders"}
                },
                workouts: []
            };
            await AsyncStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    }

    static async addWorkout(workout) {
        const data = await this.getData();
        data.workouts.push(workout);
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    static async deleteWorkout(id) {
        const data = await this.getData();
        const filteredWorkouts = data.workouts.filter(workout => workout.id !== id);
        data.workouts = filteredWorkouts;
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    static async deleteAllWorkouts() {
        const data = await this.getData();
        data.workouts = []; // Clear the workouts array
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    
    

    static async addExerciseToWorkout(workoutId, exercise) {
        const data = await this.getData();
        const workout = data.workouts.find(w => w.id === workoutId);
        if (workout) {
            workout.exercises.push(exercise);
            await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
        }
    }

    static async addSetToExercise(workoutId, exerciseId, set) {
        const data = await this.getData();
        const workout = data.workouts.find(w => w.id === workoutId);
        if (workout) {
            const exercise = workout.exercises.find(e => e.id === exerciseId);
            if (exercise) {
                exercise.sets.push(set);
                await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
            }
        }
    }

    static async getData() {
        const json = await AsyncStorage.getItem(this.storageKey);
        return json ? JSON.parse(json) : null;
    }

    static async saveWorkout(workout) {
        try {
            const existingWorkouts = await this.getWorkouts();
            const newWorkouts = [...existingWorkouts, workout];
            const jsonValue = JSON.stringify(newWorkouts);
            await AsyncStorage.setItem('workouts', jsonValue);
        } catch (e) {
            // Handle save error
            console.log(e);
        }
    }
}

export default WorkoutService;
