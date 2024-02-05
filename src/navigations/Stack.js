import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import Profiles from '../screens/Profiles';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Tab from '../navigations/Tab';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profiles" component={Profiles} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;