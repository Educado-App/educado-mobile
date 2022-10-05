import { StatusBar } from 'expo-status-bar';

// import WrongAnswerComponent from './screens/Session/WrongAnswerScreen';
import { StyleSheet, Text, View } from 'react-native';
import SessionComponent from './screens/Session/SessionScreen';
import { NavigationContainer } from '@react-navigation/native';
import WrongAnswerComponent from './screens/Session/WrongAnswerScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {RecoilRoot} from 'recoil';
import { createStackNavigator } from 'react-navigation-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Session" >
          <Stack.Screen name="Session" component={SessionComponent} options={{headerShown: false}}/>
          <Stack.Screen name="WrongAnswer" component={WrongAnswerComponent} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}


