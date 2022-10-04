import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AnswerButtons from './components/AnswerButtons';
import ContinueButton from './components/ContinueButton';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flex:1, paddingTop:300}}>
        <AnswerButtons></AnswerButtons>
      </View>
      <View style={{flex:1, alignSelf:'flex-end', paddingRight:10, marginBottom:-300}}>
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
