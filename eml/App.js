import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import AnswerButtons from './components/AnswerButtons';

export default function App() {
  return (
    <View style={styles.container}>
        <Text>This is app js</Text>
        <AnswerButtons></AnswerButtons>
      <StatusBar style="auto" />
    </View>
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
