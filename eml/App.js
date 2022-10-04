import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import SessionComponent from './components/SessionComponent';
export default function App() {
  return (
    <SessionComponent/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
