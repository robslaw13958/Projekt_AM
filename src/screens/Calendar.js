import { React, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useUser } from '../context/UserContext';
import styles from './Calendar.styles';
import api from '../AxiosInstance';

const Calendar = () => {
  const { user } = useUser();
  const [tasksData, setTasksData] = useState([]);
  const [timelineItems, setTimelineItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
  
      const todayResponse = await api.get(`/tasks?userId=${user.id}&status=pending&date=${formattedDate}`);
      setTasksData(todayResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
      setLoading(false);
    }
  };

  const generateTimeline = () => {
    for (let hour = 6; hour <= 24; hour++) {
      timelineItems.push(
        <View>
          <View key={hour} style={styles.timelineItem}>
            <Text style={styles.timeText}>{`${hour}:00`}</Text>
          </View>
          {renderTasksForHour(hour, 0)}
        </View>

      );

      timelineItems.push(
        <View>
          <View key={`${hour}:30`} style={styles.timelineItemHalf}>
            <Text style={styles.timeText}>{`${hour}:30`}</Text>

          </View>
          {renderTasksForHour(hour, 30)}
        </View>

      );
    }
    return timelineItems;
  };

  const renderTasksForHour = (hour, minute) => {
    const tasksForHour = tasksData.filter((task) => {
      const [taskStartHour, taskStartMinute] = task.startTime.split(':').map(Number);
      const [taskEndHour, taskEndMinute] = task.endTime.split(':').map(Number);
  
      const taskStartMinutes = taskStartHour * 60 + taskStartMinute;
      const taskEndMinutes = taskEndHour * 60 + taskEndMinute;
      const currentMinutes = hour * 60 + minute;
  
      return currentMinutes >= taskStartMinutes && currentMinutes < taskEndMinutes;
    });
  
    if (tasksForHour.length === 0) {
      return (
        <View key={`empty-${hour}`} style={styles.timelineItemEmpty}>
        </View>
      );
    }
  
    return tasksForHour.map((task) => (
      <View key={task.id} style={styles.taskItem}>
        <Text>{task.title}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>PLANY NA DZIŚ:</Text>
      </View>

      {loading ? (
        <Text>Ładowanie...</Text>
      ) : (
        <ScrollView vertical style={styles.scrollView}>
          <View style={styles.timelineContainer}>
            {generateTimeline()}
          </View>
        </ScrollView>
      )}

    </View>
  );
};

export default Calendar;
