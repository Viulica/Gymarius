import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importing icons from Expo
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import NewWorkoutScreen from './screens/NewWorkoutScreen';
import HistoryScreen from './screens/HistoryScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AddWorkoutStack() {
  return (
      <Stack.Navigator>
          <Stack.Screen name="AddWorkoutScreen" component={AddWorkoutScreen} options={{ title: 'Add Workout' }} />
          <Stack.Screen name="NewWorkoutScreen" component={NewWorkoutScreen} options={{ title: 'New Workout' }} />
      </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'History') {
        iconName = focused ? 'time' : 'time-outline';  // Removed 'ios-' prefix
      } else if (route.name === 'Add') {
        iconName = focused ? 'add-circle' : 'add-circle-outline';
      } else if (route.name === 'Statistics') {
        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',  // Moved to screenOptions
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="History" component={HistoryScreen} />
  <Tab.Screen name="Add" component={AddWorkoutStack} />
  <Tab.Screen name="Statistics" component={StatisticsScreen} />
</Tab.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}