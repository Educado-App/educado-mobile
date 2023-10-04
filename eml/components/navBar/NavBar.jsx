import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseScreen from '../../screens/courses/CourseScreen';
import Explore from '../../screens/explore/Explore';
import TestScreen from '../../screens/test/TestScreen';
import ProfileComponent from '../../screens/profile/Profile';
import { Icon } from '@rneui/themed';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading';

const Tab = createBottomTabNavigator();

export default function NavBar() {

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular
  })

  if (!fontsLoaded) {
    return AppLoading
  } else {

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#d9d9d9',
        tabBarLabelStyle: {
          fontSize: 11.5,
          fontFamily: 'VarelaRound_400Regular',
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
          tabBarActiveBackgroundColor: '#5fcce9',
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
          tabBarActiveBackgroundColor: '#5fcce9',
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
        name="Edu"
        component={TestScreen}
        options={{
          tabBarActiveBackgroundColor: '#5fcce9',
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={17}
              name="robot-outline"
              type="material-community"
              color={color} // Use the color parameter here
            />
          ),
          tabBarActiveTintColor: 'white', // Set the active text color to white
          tabBarInactiveTintColor: 'grey', // Set the inactive text color to grey
        }}
      />
      {/* <Tab.Screen
        name="TestScreen"
        component={TestScreen}

        options={{
          tabBarActiveBackgroundColor: '#5fcce9',
          headerShown: false,
          tabBarIcon: ({ color }) => ( // Pass the color as a parameter to the icon component
            <Icon
              size={17}
              name="bug-outline"
              type="material-community"
              color={color} // Use the color parameter here
            />
          ),
          tabBarActiveTintColor: 'white', // Set the active text color to white
          tabBarInactiveTintColor: 'grey', // Set the inactive text color to grey
        }}
      /> */}
      <Tab.Screen
        name="Perfil"
        component={ProfileComponent}
        options={{
          tabBarActiveBackgroundColor: '#5fcce9',
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
}
