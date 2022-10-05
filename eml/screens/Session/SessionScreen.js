import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import AnswerButtons from '../../components/sessions/AnswerButtons';
import LeaveButton from '../../components/sessions/LeaveButton';
import CustomProgressBar from '../../components/sessions/Progressbar';
import LearningInputVideo from '../../components/sessions/video/LearningInputVideoExample1';
import FourButtons from '../../components/sessions/FourButtons2';

export default function SessionComponent() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5 }}>
        <View style={[styles.row, { paddingTop: '5%', paddingRight:'7%'}]}>
          <View style={{}}>
            <LeaveButton></LeaveButton>
          </View>
          <View style={{paddingTop: '6%'}}>
            <CustomProgressBar></CustomProgressBar>
          </View>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <LearningInputVideo></LearningInputVideo>
      </View>
      <View style={{ flex: 3 }}>
        <FourButtons></FourButtons>
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
  row: {
    flexDirection: 'row',
  }
});
