import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import WorkoutService from '../services/WorkoutService';
import StatisticsScreen from './StatisticsScreen';

const StatsContainer = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

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
        setLoading(false)
    };

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