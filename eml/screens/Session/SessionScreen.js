import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import AnswerButtons from '../../components/sessions/AnswerButtons';
import ContinueButton from '../../components/sessions/ContinueButton';
import CustomProgressBar from '../../components/sessions/Progressbar';
import LearningInputVideo from '../../components/sessions/video/LearningInputVideoExample1';
import FourButtons from '../../components/sessions/FourButtons2';

export default function SessionComponent() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5}}>
        <View style={[styles.row, {paddingTop: '10%' }]}>
        <CustomProgressBar></CustomProgressBar>
        </View>
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
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flexDirection: 'row'
  }
});
