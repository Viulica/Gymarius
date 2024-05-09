import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { WorkoutProvider, useWorkouts } from './WorkoutContext'; // Import your newly created context
import StatisticsScreen from './StatisticsScreen';

const StatsContainer = () => {
    const { workouts, loadWorkouts } = useWorkouts();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                await loadWorkouts();
                setLoading(false);
            } catch (error) {
                console.error('Error loading workouts:', error);
                setLoading(false); // Ensure loading is set to false even on error
                // Optionally set an error state here to show an error message
            }
        };
    
        init();
    }, [loadWorkouts]);
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

export default () => (
    <WorkoutProvider>
        <StatsContainer />
    </WorkoutProvider>
);
