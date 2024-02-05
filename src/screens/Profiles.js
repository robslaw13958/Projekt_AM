import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../AxiosInstance';
import styles from './Profiles.styles';

const Profiles = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  
  const getUsers = async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const users = await getUsers();
      
      setProfiles(users);
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error);
    }
  };

  const handleProfileSelect = (userId) => {
    navigation.navigate('Login', { userId });
    console.log({userId});
  };

  const renderProfileItem = ({ item }) => (
    <Pressable
      style={styles.profileItem}
      onPress={() => handleProfileSelect(item.id)}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.username}>{item.username}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kto planuje?</Text>
      <FlatList
        data={profiles}
        renderItem={renderProfileItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />

    </View>
  );
};

export default Profiles;