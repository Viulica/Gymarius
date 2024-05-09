import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import WorkoutService from '../services/WorkoutService';

const WorkoutContext = createContext();

export const useWorkouts = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([]);

    console.log("hello1")

    const loadWorkouts = useCallback(async () => {
        console.log("Hello")
        await WorkoutService.initializeAppData();
        const fetchedWorkouts = await WorkoutService.getWorkouts();
        console.log(fetchedWorkouts)
        setWorkouts(fetchedWorkouts);
    }, []); 

    const addWorkout = async (workout) => {
        console.log("Adding new workout:", workout);
        await WorkoutService.addWorkout(workout);
        console.log("Workout added. Reloading workouts...");
        await loadWorkouts(); 
    };

    const value = {
        workouts,
        loadWorkouts,
        addWorkout
    };

    return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};