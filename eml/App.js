import React from 'react';
import { StyleSheet, } from 'react-native';

import {
  RecoilRoot,
} from 'recoil';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home/Home';
import SearchScreen from './screens/Search/Search';
import LibraryScreen from './screens/Library/Library';
import CourseScreen from './screens/Course/Course';
import SectionScreen from './screens/Section/Section';
import Login from './screens/Login/Login';
import Register from "./screens/Register/Register";
import Drawer from "./screens/Drawer/Drawer";
import Profile from "./screens/Drawer/Profile";
import Header from "./components/Header";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Profile" screenOptions={{ animation: 'none', headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Search" component={SearchScreen}/>
          <Stack.Screen name="Library" component={LibraryScreen}/>
          <Stack.Screen name="Course" component={CourseScreen}/>
          <Stack.Screen name="Section" component={SectionScreen}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Header" component={Header}/>
          <Stack.Screen name="Drawer" component={Drawer}/>

        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F1F0',
  },
});
