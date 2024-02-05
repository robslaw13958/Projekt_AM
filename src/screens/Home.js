import { React, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import TaskItem from '../components/TaskItem';
import api from '../AxiosInstance';
import styles from './Home.styles';

const Home = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [canceledTasks, setCanceledTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);



  const handleAvatarPress = () => {
    navigation.navigate('Profile', { user });
  };

  const fetchTasks = async () => {
    try {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
  
      const pendingResponse = await api.get(`/tasks?userId=${user.id}&status=pending`);
      setPendingTasks(pendingResponse.data);
  
      const todayResponse = await api.get(`/tasks?userId=${user.id}&status=pending&date=${formattedDate}`);
      setTodayTasks(todayResponse.data);
  
      const completedResponse = await api.get(`/tasks?userId=${user.id}&status=completed`);
      setCompletedTasks(completedResponse.data);
  
      const canceledResponse = await api.get(`/tasks?userId=${user.id}&status=canceled`);
      setCanceledTasks(canceledResponse.data);
  
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
    }
  };

  const handleContainerClick = (tasks) => {
    setSelectedTasks(tasks);
    setModalVisible(true);
  };

  const refreshScreen = () => {
    fetchTasks();
    setModalVisible(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks();
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Witaj, {user?.username}!</Text>
        <Pressable
          style={styles.avatarContainer}
          onPress={() => handleAvatarPress(user)}
        >
          <Image source={user?.avatar} style={styles.avatar} />
        </Pressable>
      </View>

      <View style={styles.taskButtonsContainer}>
        
        <Pressable
          style={styles.pendingButton}
          onPress={() => handleContainerClick(pendingTasks)}>
          
          <Text style={styles.taskCategoryButtonCounterText}>{pendingTasks.length}</Text>
          <Text style={styles.taskCategoryButtonText}>W TRAKCIE</Text>
          
        </Pressable>

        <Pressable style={styles.completedButton} onPress={() => handleContainerClick(completedTasks)}>
          <View>
            <Text style={styles.taskCategoryButtonCounterText}>{completedTasks.length}</Text>
          <Text style={styles.taskCategoryButtonText}>ZAKOŃCZONE</Text>
          </View>
        </Pressable>

        <Pressable style={styles.canceledButton} onPress={() => handleContainerClick(canceledTasks)}>
          <View>
            <Text style={styles.taskCategoryButtonCounterText}>{canceledTasks.length}</Text>
            <Text style={styles.taskCategoryButtonText}>ANULOWANE</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.tasksContainer}>
        <Text style={styles.taskCounterText}>Zadania na dziś:</Text>
          <FlatList
            data={todayTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                location={item.location}
                startTime={item.startTime}
                endTime={item.endTime}
                date={item.date}
                boardId={item.boardId}
                onStatusChange={() => refreshScreen()}
              />
            )}
          />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Zadania:</Text>
            <FlatList
              data={selectedTasks}
              style={styles.modalList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskItem
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  location={item.location}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  date={item.date}
                  boardId={item.boardId}
                  onStatusChange={() => refreshScreen()}
                />
              )}
            />
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Zamknij</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;