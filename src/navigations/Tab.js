import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Home from '../screens/Home';
import Stats from '../screens/Stats';
import Pomodoro from '../screens/Pomodoro';
import Calendar from '../screens/Calendar';
import AddNewTask from '../screens/AddNewTask';

const Tab = createBottomTabNavigator();

const screenOptions = {
    headerShown: false
}

const TabNavigation = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#007BFF',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={Calendar}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="calendar" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="AddNewTask"
                component={AddNewTask}
                options={{
                    tabBarLabel: 'Add Task',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="plus-circle" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Stats"
                component={Stats}
                options={{
                    tabBarLabel: 'Stats',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="bar-chart-2" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Pomodoro"
                component={Pomodoro}
                options={{
                    tabBarLabel: 'Pomodoro',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="clock" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;