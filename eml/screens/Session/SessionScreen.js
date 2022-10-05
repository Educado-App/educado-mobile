import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import AnswerButtons from '../../components/sessions/AnswerButtons';
import ContinueButton from '../../components/sessions/ContinueButton';
import LearningInputVideo from '../../components/sessions/video/LearningInputVideoExample1';
import FourButtons from '../../components/sessions/FourButtons';

export default function SessionComponent() {
  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
      </View>
      <View style={{flex:2, width:'100%'}}>
        <LearningInputVideo style={{height:'100%'}}></LearningInputVideo> 
      </View>
      <View style={{flex:2}}>
        <FourButtons></FourButtons>
      </View>
      <View style={{flex:1, alignSelf:'flex-end', paddingRight:10}}>
        {/* <ContinueButton></ContinueButton> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
