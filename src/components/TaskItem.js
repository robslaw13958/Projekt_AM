import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, Pressable, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

import styles from './TaskItem.styles';

const TaskItem = ({ id, title, description, image, location, startTime, endTime, date, onStatusChange, boardId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Board, setBoard] = useState(null);

  useEffect(() => {
    fetchBoard();
  }, []);

  const api = axios.create({
    baseURL: 'http://192.168.200.12:3001',
  });

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const completionDate = new Date().toISOString().split('T')[0];
      const response = await api.patch(`/tasks/${taskId}`, { status: newStatus, completionDate });
      console.log(response.data);
      onStatusChange();
    } catch (error) {
      console.error(`Błąd podczas aktualizacji statusu zadania ${taskId}:`, error);
      throw error;
    }
  };

  const fetchBoard = async () => {
    try {
      const boardsResponse = await api.get(`/boards?id=${boardId}`);
      console.log(boardsResponse.data);
      setBoard(boardsResponse.data);
    } catch (error) {
      console.error('Błąd podczas pobierania boarda:', error);
    }
  };

  const handleMapPress = () => {
    if (location) {
      const { latitude, longitude } = location;

      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      Linking.openURL(mapUrl)
        .catch((error) => console.error('Błąd podczas otwierania mapy:', error));
    }
  };

  const markAsCompleted = (id) => {
    updateTaskStatus(id, 'completed');
  };

  const markAsCanceled = (id) => {
    updateTaskStatus(id, 'canceled');
  };

  const handleMarkAsCompleted = () => {
    markAsCompleted(id);
    setModalVisible(false);
  };

  const handleMarkAsCanceled = () => {
    markAsCanceled(id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{startTime} - {endTime}</Text>
          <Text style={styles.date}>{date}</Text>


          {Board && Board[0] && (
            <View style={[styles.boardTextView, { backgroundColor: Board[0].color }]}>
              <Text style={styles.boardText}>{Board[0].name}</Text>
            </View>
          )}
        </View>
      </View>
      {location && (
        <Pressable style={styles.mapContainer} onPress={handleMapPress}>
          <Feather name="map-pin" size={20} color="green" />
        </Pressable>
      )}
      <Pressable style={styles.arrowContainer} onPress={() => setModalVisible(true)}>
        <Feather name="arrow-right" size={24} color="black" />
      </Pressable>

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
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{description}</Text>

            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={styles.markCompletedButton}
                onPress={handleMarkAsCompleted}
              >
                <Text style={styles.buttonText}>Oznacz jako wykonane</Text>
              </Pressable>

              <Pressable
                style={styles.markCanceledButton}
                onPress={handleMarkAsCanceled}
              >
                <Text style={styles.buttonText}>Oznacz jako anulowane</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Zamknij</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskItem;