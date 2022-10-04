import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import AnswerButtons from './components/AnswerButtons';
import ContinueButton from './components/ContinueButton';
import LearningInputVideo from './components/section/LearningInputVideoExample2';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={{flex:1}}>
        <LearningInputVideo></LearningInputVideo> 
      </View>
      <View style={{flex:1}}>
        <AnswerButtons></AnswerButtons>
      </View>
      <View style={{flex:1, alignSelf:'flex-end', paddingRight:10}}>
        <ContinueButton></ContinueButton>
      </View>
      <StatusBar style="auto" />
    </View>
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
