import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import CategoryContainer from './components/CategoryContainer';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import financeLogo from './assets/financeLogo.png';
const financeLogoUri = Image.resolveAssetSource(financeLogo).uri;
import healthLogo from './assets/healthLogo.png';
const healthLogoUri = Image.resolveAssetSource(healthLogo).uri;

import HomeScreen from './screens/Home/Home';
import CoursesScreen from './screens/Courses/Courses';
import ActiveCourseScreen from './screens/ActiveCourse/ActiveCourse';
import ActiveSectionScreen from './screens/ActiveSection/ActiveSection';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Courses: CoursesScreen,
    ActiveCourse: ActiveCourseScreen,
    ActiveSection: ActiveSectionScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer></AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
