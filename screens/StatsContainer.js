import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import WorkoutService from '../services/WorkoutService'; // Import your WorkoutService
import StatisticsScreen from './StatisticsScreen';

const StatsContainer = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                await WorkoutService.initializeAppData(); // Initialize data if not already done
                const fetchedWorkouts = await WorkoutService.getWorkouts();
                setWorkouts(fetchedWorkouts);
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
            setLoading(false);
        };

        loadWorkouts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {workouts.length > 0 ? (
                <StatisticsScreen workouts={workouts} />
            ) : (
                <Text>No workouts to display</Text>
            )}
        </View>
    );
};

export default StatsContainer;