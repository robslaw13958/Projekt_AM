import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../context/UserContext';
import api from '../AxiosInstance';

import styles from './Stats.styles';

const Stats = () => {
  const { user } = useUser();
  const [weeklyStats, setWeeklyStats] = useState([]);

  const daysOfWeek = ['ND', 'PN', 'WT', 'ŚR', 'CZW', 'PT', 'SO'];

  const fetchTasksByDay = async (day) => {
    try {
      const completedResponse = await api.get(`/tasks?userId=${user.id}&status=completed&completionDate=${day}`);
      const canceledResponse = await api.get(`/tasks?userId=${user.id}&status=canceled&completionDate=${day}`);

      return {
        day,
        completedCount: completedResponse.data.length,
        canceledCount: canceledResponse.data.length,
        emptySpace: 10 - completedResponse.data.length - canceledResponse.data.length,
      };
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
      return {
        day,
        emptySpace: 0,
        completedCount: 0,
        canceledCount: 0,
      };
    }
  };

  const fetchWeeklyStats = async () => {
    const today = new Date();
    const daysInWeek = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      daysInWeek.push(day.toISOString().split('T')[0]);
    }

    const stats = await Promise.all(daysInWeek.map(async (day) => fetchTasksByDay(day)));
    setWeeklyStats(stats);
  };

  useEffect(() => {
    fetchWeeklyStats();
  }, []);

  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <Text style={styles.headerText}>OSTATNI TYDZIEŃ</Text>
      <View style={styles.container}>
        {weeklyStats.map((stat) => (
          <View key={stat.day} style={styles.dayStats}>

            <View style={styles.barContainer}>
              {stat.emptySpace > 0 && <View style={[styles.bar, { flex: stat.emptySpace }]} />}
              {stat.canceledCount > 0 && (
                <View style={[styles.bar, styles.canceledBar, { flex: stat.canceledCount }]}>
                  <Text style={styles.barText}>{stat.canceledCount}</Text>
                </View>
              )}
              {stat.completedCount > 0 && (
                <View style={[styles.bar, styles.completedBar, { flex: stat.completedCount }]}>
                  <Text style={styles.barText}>{stat.completedCount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.headerText}>{daysOfWeek[new Date(stat.day).getDay()]}</Text>
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        <View style={[styles.legendItem, { backgroundColor: '#00AF5B' }]} />
        <Text style={styles.legendText}>Zakończone zadania</Text>
      </View>
      <View style={styles.legend}>
        <View style={[styles.legendItem, { backgroundColor: '#AF002B' }]} />
        <Text style={styles.legendText}>Anulowane zadania</Text>
      </View>
    </View>
  );
};

export default Stats;