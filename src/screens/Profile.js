import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, FlatList, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../AxiosInstance';
import { useUser } from '../context/UserContext';
import styles from './Profile.styles';

const Profile = () => {
  const navigation = useNavigation();
  const { user, logout } = useUser();
  const [boards, setBoards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const fetchBoards = async () => {
    try {
      const boardsResponse = await api.get(`/boards?userId=${user.id}`);
      setBoards(boardsResponse.data);
    } catch (error) {
      console.error('Błąd podczas pobierania boardów:', error);
    }
  };


  useEffect(() => {
    fetchBoards();
  }, []);

  const handleAddBoard = async () => {
    try {
      if (!newBoardName.trim()) {
        alert('Wprowadź nazwę boardu.');
        return;
      }
      if (!selectedColor) {
        alert('Wybierz kolor boardu.');
        return;
      }
      const response = await api.post('/boards', {
        name: newBoardName,
        color: selectedColor,
        userId: user.id,
      });

      if (response.status === 201) {
        fetchBoards();
        setModalVisible(false);
      } else {
        alert('Wystąpił błąd podczas dodawania boardu.');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania boardu:', error);
      alert('Wystąpił błąd podczas dodawania boardu.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Profiles');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleSettings} style={styles.headerButton}>
          <Text style={styles.buttonText}>Ustawienia</Text>
        </Pressable>
        <Pressable onPress={handleLogout} style={styles.headerButton}>
        <Text style={styles.buttonText}>Wyloguj</Text>
        </Pressable>
      </View>
      <View style={styles.avatarContainer}>
        <Image source={user?.avatar} style={styles.avatar} />
        <Text style={styles.profileName}>{user.name}</Text>
      </View>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={[styles.boardItem, { backgroundColor: item.color }]}>
            <Text style={styles.boardTitle}>{item.name}</Text>
          </View>
        )}
      />
      <Pressable style={styles.addButton} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.addButtonText}>Dodaj Board</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dodaj nowy board</Text>

            <TextInput
              style={styles.input}
              placeholder="Nazwa boardu"
              onChangeText={(text) => setNewBoardName(text)}
            />

            {/* FlatList z kolorami do wyboru */}
            <FlatList
              data={['#3A5274', '#B4654A', '#A32D77', '#97B1A6', '#87A45F', '#B38D97']} // Możesz dostosować listę kolorów
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={styles.centeredColorButton}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.colorButton, { backgroundColor: item }, selectedColor === item && styles.selectedColorButton]}
                  onPress={() => setSelectedColor(item)}
                />
              )}
            />

            <View style={styles.buttonContainer}>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>Anuluj</Text>
              </Pressable>
              
              <Pressable style={styles.addButton} onPress={handleAddBoard}>
                <Text style={styles.addButtonText}>Dodaj</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;