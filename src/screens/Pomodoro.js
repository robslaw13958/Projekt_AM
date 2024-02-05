import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, TextInput } from 'react-native';
import styles from './Pomodoro.styles';

const Pomodoro = () => {

  const [timerMode, setTimerMode] = useState('Pomodoro');
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [cycles, setCycles] = useState('');

  useEffect(() => {
    let timerInterval;

    if (isTimerRunning && timerSeconds > 0) {
      timerInterval = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (isTimerRunning && timerSeconds === 0) {
      switchTimerMode();
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timerSeconds]);

  const switchTimerMode = () => {
    if (timerMode === 'Pomodoro') {
      updateCompletedCycles();
      setTimerMode('Short Break');
      setTimerSeconds(3);
    } else if (timerMode === 'Short Break') {
      setTimerMode('Long Break');
      setTimerSeconds(9);
    } else if (timerMode === 'Long Break') {
      setTimerMode('Pomodoro');
      setTimerSeconds(15);
    }
  };

  const handleStartStopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleAddTask = (cycles) => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { name: newTask, totalCycles: cycles, completedCycles: 0 }]);
      setNewTask('');
    }
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
  };

  const updateCompletedCycles = () => {
    if (selectedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task === selectedTask ? { ...task, completedCycles: task.completedCycles + 1 } : task
        )
      );
    }
  };

  const renderTaskItem = ({ item }) => (
    <Pressable
      style={[
        styles.taskItem,
        selectedTask === item && { backgroundColor: '#005BAF', borderColor: '#fff' },
      ]}
      onPress={() => handleTaskPress(item)}
    >
      <Text style={[styles.taskText, selectedTask === item && { color: '#fff' }]}>
        {item.name} - {item.completedCycles}/{item.totalCycles}
      </Text>
    </Pressable>
  );


  return (
    <View style={styles.container}>

      <View style={styles.timerContainer}>
        <Text style={styles.timerMode}>{timerMode}</Text>
        <Text style={styles.timer}>{formatTime(timerSeconds)}</Text>
        <Pressable
          style={styles.timerButton}
          onPress={handleStartStopTimer}
        >
          <Text style={styles.ButtonText}>{isTimerRunning ? 'Stop' : 'Start'}</Text>
        </Pressable>
      </View>

      <View style={styles.tasksContainer}>
        <Text style={styles.tasksHeader}>Tasks</Text>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder="Zadanie"
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
          />
          <TextInput
            style={styles.cyclesInput}
            placeholder="Cykle"
            keyboardType="numeric"
            value={cycles}
            onChangeText={(text) => setCycles(text)}
          />
          <Pressable
            style={styles.addTaskButton}
            onPress={() => handleAddTask(cycles)}
          >
            <Text style={styles.ButtonText}>Dodaj zadanie</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default Pomodoro;