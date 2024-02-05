import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import api from '../AxiosInstance';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import styles from './AddNewTask.styles';
import { useUser } from '../context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';

const AddNewTask = () => {
  const navigation = useNavigation();

  const { user } = useUser();
  const [taskTitle, setTaskTitle] = useState('');

  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskStartTime, setTaskStartTime] = useState('');
  const [taskEndTime, setTaskEndTime] = useState('');
  const [taskImage, setTaskImage] = useState(null);
  const [taskLocation, setTaskLocation] = useState(null);

  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleDatePick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);

      selectedDate.toISOString().split('T')[0];

      setTaskDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  const handleStartTimePick = () => {
    setShowStartTimePicker(true);
  };

  const handleStartTimeChange = (event, selectedStartTime) => {
    setShowStartTimePicker(false);
    if (selectedStartTime) {
      setSelectedStartTime(selectedStartTime);
      setTaskStartTime(selectedStartTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleEndTimePick = () => {
    setShowEndTimePicker(true);
  };

  const handleEndTimeChange = (event, selectedEndTime) => {
    setShowEndTimePicker(false);
    if (selectedEndTime) {
      setSelectedEndTime(selectedEndTime);
      setTaskEndTime(selectedEndTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }));
    }
  };


  useEffect(() => {
    requestCameraPermission();
    requestLocationPermission();
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const boardsResponse = await api.get(`/boards?userId=${user.id}`);
      setBoards(boardsResponse.data);
    } catch (error) {
      console.error('Błąd podczas pobierania boardów:', error);
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable camera and media library access to add images.');
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable location access to add task location.');
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTaskImage(result.uri);
    }
  };

  const handleLocationPick = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak zgody', 'Zezwól na dostęp do lokalizacji.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setTaskLocation(location.coords);
  };

  const addTask = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
    } catch (error) {
      console.error('Błąd podczas dodawania zadania do bazy:', error);
      throw error;
    }
  };

  const handleAddTask = async () => {
    try {
      const newTask = {
        id: new Date().getTime().toString(),
        title: taskTitle,
        description: taskDescription,
        image: taskImage,
        location: taskLocation,
        startTime: taskStartTime,
        endTime: taskEndTime,
        date: taskDate,
        status: 'pending',
        creationDate: new Date().toISOString(),
        completionDate: null,
        boardId: selectedBoard,
      };

      newTask.userId = user.id;

      await addTask(newTask);

      navigation.goBack();
    } catch (error) {
      console.error('Błąd podczas dodawania zadania:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Dodaj nowe zadanie</Text>
        <TextInput
          style={styles.input}
          placeholder="Tytuł zadania"
          value={taskTitle}
          onChangeText={(text) => setTaskTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Opis zadania"
          value={taskDescription}
          onChangeText={(text) => setTaskDescription(text)}
        />
        <Text style={styles.headerText}>Wybierz board</Text>
        <View style={styles.boardsContainer}>
          {boards.map((board) => (
          <Pressable
            key={board.id}
            style={[
              styles.boardItem,
              {
                backgroundColor: board.color,
                ...(selectedBoard === board.id && styles.selectedBoard),
              },
            ]}
            onPress={() => setSelectedBoard(board.id)}
          >
            <Text style={styles.boardText}>{board.name}</Text>
          </Pressable>
        ))}
        </View>
        
        <Pressable style={styles.button} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Dodaj zdjęcie</Text>
        </Pressable>
        {taskImage && (
          <Image source={{ uri: taskImage }} style={styles.imagePreview} />
        )}
        <Pressable style={styles.button} onPress={handleLocationPick}>
          <Text style={styles.buttonText}>Dodaj lokalizację</Text>
        </Pressable>
        {taskLocation && (
          <Text style={styles.locationText}>
            Lokalizacja: {taskLocation.latitude.toFixed(4)}, {taskLocation.longitude.toFixed(4)}
          </Text>
        )}
        <Pressable style={styles.button} onPress={handleDatePick}>
          <Text style={styles.buttonText}>Wybierz datę</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {taskDate && (
          <Text style={styles.dateText}>Data: {taskDate}</Text>
        )}

        <Pressable style={styles.button} onPress={handleStartTimePick}>
          <Text style={styles.buttonText}>Wybierz godzinę rozpoczęcia</Text>
        </Pressable>
        {showStartTimePicker && (
          <DateTimePicker
            value={selectedStartTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
        {taskStartTime && (
          <Text style={styles.timeText}>Godzina rozpoczęcia: {taskStartTime}</Text>
        )}

        <Pressable style={styles.button} onPress={handleEndTimePick}>
          <Text style={styles.buttonText}>Wybierz godzinę zakończenia</Text>
        </Pressable>
        {showEndTimePicker && (
          <DateTimePicker
            value={selectedEndTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
        {taskEndTime && (
          <Text style={styles.timeText}>Godzina zakończenia: {taskEndTime}</Text>
        )}

        <Pressable style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonLabel}>Dodaj zadanie</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AddNewTask;