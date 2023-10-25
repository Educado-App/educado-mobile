import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseScreen from '../../screens/courses/CourseScreen';
import Explore from '../../screens/explore/Explore';
import TestScreen from '../../screens/test/TestScreen';
import ProfileComponent from '../../screens/profile/Profile';
import { Icon } from '@rneui/themed';
import { Platform } from 'react-native';
import tailwindConfig from "../../tailwind.config";

const Tab = createBottomTabNavigator();

export default function NavBar() {

  return (
    <Tab.Navigator
      testID="navBar" // Make sure you set the testID on the correct element
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarActiveBackgroundColor: tailwindConfig.theme.colors.cyanBlue,
        tabBarLabelStyle: {
          fontSize: 12,
        },

        tabBarStyle: {
          backgroundColor: 'white',
          height: '10%',
          paddingBottom: '2%',

          // THIS IS SHADOW STUFF - HAVE TO BE PLATFORM SPECIFIC
          ...Platform.select({
            ios: {
              paddingVertical: '2%',
              paddingHorizontal: '4%',
              paddingBottom: '6%',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.8,
              shadowRadius: 8,
            },
            android: {
              paddingVertical: '2%',
              paddingHorizontal: '4%',
              paddingBottom: '2%',
              elevation: 4, // Add elevation for the shadow (Android-specific)
            },
          }),
        },
        tabBarItemStyle: {
          borderRadius: 15,
          marginHorizontal: '2%', // Adjust the margin for spacing
          paddingBottom: '2%', // Vertical padding for the icon
          paddingTop: '1%', // Vertical padding for the icon
        },
      }}
    >
      <Tab.Screen
        name="Central"
        component={CourseScreen}
        options={{
          tabBarActiveBackgroundColor: tailwindConfig.theme.colors.cyanBlue,
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={17}
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
        name="Explorar"
        component={Explore}
        options={{
          tabBarActiveBackgroundColor: tailwindConfig.theme.colors.cyanBlue,
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={17}
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
        name="Perfil"
        component={ProfileComponent}
        options={{
          tabBarActiveBackgroundColor: tailwindConfig.theme.colors.cyanBlue,
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={17}
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
