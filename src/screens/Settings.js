import React from 'react';
import { View, Text, Pressable, Alert, FlatList, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import api from '../AxiosInstance';
import styles from './Settings.styles';

const Settings = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const settingsData = [
    { id: 1, name: 'Tryb ciemny', value: false },
    { id: 2, name: 'Zezwolenie na powiadomienia', value: true },
  ];

  const handleProfileDelete = async (userId) => {
    try {
      console.log('usuwanie', userId)
      const response = await api.delete(`/users/${userId}`);
  
      if (response.status === 200) {
        navigation.navigate('Profiles');
      } else {
        console.error('Błąd podczas usuwania profilu:', response.data);
      }
    } catch (error) {
      console.error('Błąd podczas usuwania profilu:', error.message);
    }
  };

  const showDeleteAlert = () => {
      Alert.alert(
        'Usuwanie profilu',
        `Czy na pewno chcesz usunąć profil?`,
        [
          {
            text: 'Anuluj',
            style: 'cancel',
          },
          {
            text: 'Usuń',
            onPress: () => handleProfileDelete(user?.id),
          },
        ],
        { cancelable: false }
      );
  };

  const renderSettingItem = ({ item }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingText}>{item.name}</Text>
      </View>
      <Switch
        value={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ustawienia</Text>
      <FlatList
        data={settingsData}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.settingsList}
      />
      <Pressable
        style={styles.deleteProfileButton}
        onPress={showDeleteAlert}
      >
        <Text style={styles.deleteProfileText}>Usuń Profil {user?.username}</Text>
      </Pressable>
    </View>
  );
};

export default Settings;