import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseScreen from '../../screens/courses/CourseScreen';
import Explore from '../../screens/explore/Explore';
import TestScreen from '../../screens/test/TestScreen';
import ProfileComponent from '../../screens/profile/Profile';
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#d9d9d9',
        tabBarStyle: { backgroundColor: 'hsl(0, 0%, 92%)' }, // OnePlus menubar color
      }}
    >
      <Tab.Screen
        name="Home"
        component={CourseScreen}
        options={{
          tabBarActiveBackgroundColor: '#5fcce9',
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={20}
              name="home-outline"
              type="material-community"
              color={color} // Use the color parameter here
            />
          ),
          tabBarActiveTintColor: 'white', // Set the active text color to white
          tabBarInactiveTintColor: 'grey', // Set the inactive text color to grey
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarActiveBackgroundColor: '#5fcce9',
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={20}
              name="compass-outline"
              type="material-community"
              color={color} // Use the color parameter here
            />
          ),
          tabBarActiveTintColor: 'white', // Set the active text color to white
          tabBarInactiveTintColor: 'grey', // Set the inactive text color to grey
        }}
      />
      <Tab.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          tabBarActiveBackgroundColor: '#5fcce9',
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={20}
              name="bug-outline"
              type="material-community"
              color={color} // Use the color parameter here
            />
          ),
          tabBarActiveTintColor: 'white', // Set the active text color to white
          tabBarInactiveTintColor: 'grey', // Set the inactive text color to grey
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileComponent}
        options={{
          tabBarActiveBackgroundColor: '#5fcce9',
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={20}
              name="account-outline"
              type="material-community"
              color={color} // Use the color parameter here
            />
          ),
          tabBarActiveTintColor: 'white', // Set the active text color to white
          tabBarInactiveTintColor: 'grey', // Set the inactive text color to grey
        }}
      />
    </Tab.Navigator>
  );
}
