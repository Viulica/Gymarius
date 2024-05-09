import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, Button, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment'; // To handle date transformations

const StatisticsScreen = ({ workouts = [] }) => {
  const [mode, setMode] = useState('week');
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [currentPeriodCount, setCurrentPeriodCount] = useState(0);
  const scrollViewRef = useRef();

  const screenWidth = Dimensions.get('window').width;

  const getChartWidth = (mode) => {
    switch (mode) {
      case 'week':
        return screenWidth * 5.2; // Wider for 52 weeks
      case 'month':
        return screenWidth * 2; // Narrower for 12 months
      case 'year':
        return screenWidth;
      default:
        return screenWidth;
    }
  };
  const chartWidth = getChartWidth(mode);

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726'
    }
  };

  useEffect(() => {
    // Calculate current period workouts count
    const current = moment();
    const currentCount = workouts.filter(workout => {
      const workoutMoment = moment(workout.date);
      switch (mode) {
        case 'week':
          return current.isoWeek() === workoutMoment.isoWeek() && current.year() === workoutMoment.year();
        case 'month':
          return current.month() === workoutMoment.month() && current.year() === workoutMoment.year();
        case 'year':
          return current.year() === workoutMoment.year();
        default:
          return false;
      }
    }).length;
    setCurrentPeriodCount(currentCount);
  }, [mode, workouts]);


  useEffect(() => {
    const data = countWorkouts(workouts, mode);
    setChartData(data);
  }, [mode, workouts]);

  useEffect(() => {
    if (mode === 'week') {
      // Delay the scrolling a bit to ensure the chart has rendered
      const timer = setTimeout(() => {
        const currentWeek = moment().week();
        const weekWidth = getChartWidth('week') / 52;
        const initialScrollPosition = (currentWeek - 5) * weekWidth;
        scrollViewRef.current?.scrollTo({ x: initialScrollPosition, animated: true });
      }, 300); // Adjust timeout as needed
      return () => clearTimeout(timer);
    }
    else if (mode === "month") {
      const timer = setTimeout(() => {
        const currentMonth = moment().month();
        const monthWidth = getChartWidth('month') / 12;
        const initialScrollPosition = (currentMonth - 2) * monthWidth;
        scrollViewRef.current?.scrollTo({ x: initialScrollPosition, animated: true });
      }, 300); // Adjust timeout as needed
      return () => clearTimeout(timer);

    }
  }, [chartData, mode]); // Trigger on chartData and mode changes

  const countWorkouts = (workouts, mode) => {
    const counts = {};
    const maxCounts = mode === 'week' ? 52 : (mode === 'year' ? moment().year() - moment(workouts[0]?.date).year() + 1 : 12);

    for (let i = 1; i <= maxCounts; i++) {
      counts[i] = 0;
    }

    workouts.forEach(workout => {
      const date = moment(workout.date);
      let key;
      switch (mode) {
        case 'week':
          key = date.week();
          break;
        case 'month':
          key = date.month() + 1;
          break;
        case 'year':
          key = date.year();
          break;
      }
      if (key in counts) {
        counts[key]++;
      }
    });

    const labels = Object.keys(counts).sort((a, b) => parseInt(a) - parseInt(b));
    const values = labels.map(label => counts[label]);
    return {
      labels,
      datasets: [{
        data: values
      }]
    };
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Button title="Week" onPress={() => setMode('week')} color="#84a9ac" />
        <Button title="Month" onPress={() => setMode('month')} color="#3b6978" />
        <Button title="Year" onPress={() => setMode('year')} color="#204051" />
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={true}
        style={{ flex: 1 }}
      >
        <BarChart
          data={chartData}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisInterval={1}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero={true}
        />
      </ScrollView>
      <Text style={styles.infoText}>
        This {mode}: {currentPeriodCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20
  },
  infoText: {
    fontSize: 21, // Larger and bolder text
    textAlign: 'center',
    marginTop: -20, // Adjusted to move closer to the chart
    marginBottom: 320
  }
});

export default StatisticsScreen;