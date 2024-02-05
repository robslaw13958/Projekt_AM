import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './SplashScreen.styles';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.gif')}
        style={styles.logo}
      />
      <Text style={styles.description}>Zaplanuj co zrobisz, żeby być bardziej zorganizowanym dziś, jutro i później</Text>
      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate('Profiles')}
      >
        <Text style={styles.loginButtonText}>Zaloguj</Text>
      </Pressable>
      <Pressable
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerButtonText}>Zarejestruj</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;