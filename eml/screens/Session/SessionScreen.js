import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, View} from 'react-native';
import AnswerButtons from '../../components/sessions/AnswerButtons';
import LeaveButton from '../../components/sessions/LeaveButton';
import CustomProgressBar from '../../components/sessions/Progressbar';
import LearningInputVideo from '../../components/sessions/video/LearningInputVideoExample1';
import FourButtons from '../../components/sessions/FourButtons2';


//import file/api = let filedata.

export default function SessionComponent() {
  
  let answerArray = ['star','circle','square']

  const [answerNr, setAnswerNr] = useState(0)
  
  useEffect(() => {
    if(answerNr > answerArray.length -1){
      setAnswerNr(-1)
    }
  })

  
  function sendDataToParent(){
    setAnswerNr(current => current + 1)
    console.log(answerNr)
  }

  let correctAnswer = answerArray[answerNr]




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
        { answerNr == -1 ? Alert.alert("Course is done", "Good job!") : null }
      </View>
      <View style={{flex:3}}>
        <FourButtons correctAnswer={correctAnswer}  sendDataToParent={sendDataToParent}></FourButtons>
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
  },
  textStyle:{
    zIndex: 100,
    fontSize: 100,
  }
});
