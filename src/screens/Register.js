import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../AxiosInstance';
import styles from './Register.styles';

const avatars = [
  require('../assets/wojak5.jpg'),
  require('../assets/wojak1.jpg'),
  require('../assets/wojak2.jpg'),
  require('../assets/wojak3.jpg'),
  require('../assets/wojak4.jpg'),
];

const Register = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const createUser = async (userData) => {
      try {
        const response = await api.post('/users', userData);
        return response.data;
      } catch (error) {
        console.error('Błąd podczas tworzenia użytkownika:', error);
        throw error;
      }
    };

    const handleRegister = async () => {
      try {
        if (!selectedAvatar) {
          alert('Wybierz awatar przed rejestracją.');
          return;
        }
  
        if (!username || !pin) {
          alert('Wypełnij wszystkie pola przed rejestracją.');
          return;
        }
  
        if (pin.length !== 4 || isNaN(pin)) {
          alert('PIN musi składać się z 4 cyfr.');
          return;
        }
  
        const newUser = {
          id: Date.now().toString(),
          username,
          pin,
          avatar: selectedAvatar,
        };
  
        await createUser(newUser);
  
        navigation.navigate('Profiles');
      } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>

      <View style={styles.avatarContainer}>
        {avatars.map((avatar, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedAvatar(avatar)}
            style={[
              styles.avatar,
              selectedAvatar === avatar && styles.selectedAvatar,
            ]}
          >
            <Image source={avatar} style={styles.avatarImage} />
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nazwa Profilu"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Kod PIN"
        secureTextEntry
        value={pin}
        onChangeText={(text) => setPin(text)}
      />

      <Pressable style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj</Text>
      </Pressable>
    </View>
  );
};

export default Register;