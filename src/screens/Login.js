import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './../context/UserContext';
import api from '../AxiosInstance';
import styles from './Login.styles';

const Login = ({ route }) => {
  const { userId } = route.params;
  const { setLoggedInUser } = useUser();
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setSelectedUser(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
      }
    };

    fetchUserById();
  }, [userId]);

  const handleLogin = () => {
    if (pin === selectedUser.pin) {
      setLoggedInUser(selectedUser);
      navigation.navigate('Tab');
    } else {
      alert('Nieprawidłowy PIN. Spróbuj ponownie.');
    }
  };

  return (
    <View style={styles.container}>
      {selectedUser && (
        <>
          <Image source={selectedUser.avatar} style={styles.avatar} />
          <Text style={styles.username}>{selectedUser.username}</Text>
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="Wprowadź PIN"
        secureTextEntry
        value={pin}
        onChangeText={(text) => setPin(text)}
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </Pressable>
    </View>
  );
};

export default Login;