import React, { useState } from "react";
import { View , Alert} from "react-native";
import { makeStyles} from "@rneui/themed";
import { Icon } from '@rneui/themed';

export default function App() {
  const styles = useStyles();

  const [selected, setSelected] = useState({
    "btn1": false,
    "btn2": false,
    "btn3": false,
    "btn4": false
  })
  const [choice, setChoice] = useState('')
  

  function handleChange(evt) {
    if(evt == 'triangle'){
      setSelected({...selected,btn1:true,btn2:false,btn3:false,btn4:false})
    }else if(evt == 'circle'){
      setSelected({...selected,btn1:false,btn2:true,btn3:false,btn4:false})
    }else if(evt == 'star'){
      setSelected({...selected,btn1:false,btn2:false,btn3:true,btn4:false})
    }else if(evt == 'square'){
      setSelected({...selected,btn1:false,btn2:false,btn3:false,btn4:true})
    }
    console.log(evt)
    setChoice(evt)

  }

  function checkChoice (choice){
    let correctAnswer = 'star'
    if(choice == correctAnswer){
      Alert.alert(
        "Wuhuuu you awnsered correct!", 
        "God job!"
        )
    }else{
      Alert.alert(
        "Buuuuuhhh you are bad", 
        "bad boy!"
        )
    }
  }


  return (
    <View style={styles.container}>
      <View >
          <View style={[styles.container2,styles.buttonShadow, {shadowColor: selected.btn1 ? '#991f00' : '#ff3300'}]}>
              <Icon style={[styles.button, {backgroundColor: selected.btn1 ? '#991f00' : '#ff3300'}]}
                size={60}
                name='triangle'
                type='material-community'
                color='white'
                onPress={() => handleChange('triangle')}
                />
          </View>
          <View style={[styles.buttonShadow, {shadowColor: selected.btn2 ? '#003d99' : '#0066ff'}]}>
              <Icon style={[styles.button, {backgroundColor: selected.btn2 ?  '#003d99' : '#0066ff'}]}
                size={60}
                name='checkbox-blank-circle'
                type='material-community'
                color='white'
                onPress={() => handleChange('circle')}
                />
                
          </View>
        </View>
        <View>
          <View style={[styles.container2,styles.buttonShadow, {shadowColor: selected.btn3 ?  '#997a00' : '#ffcc00' }]}>
            <Icon style={[styles.button, {backgroundColor: selected.btn3 ?  '#997a00' : '#ffcc00'}]}
              size={60}
              name='star'
              type='material-community'
              color='white'
              onPress={() => handleChange('star')}
               />
          </View>
          <View style={[styles.buttonShadow, {shadowColor: selected.btn4 ?   '#267326' : '#009900'}]}>
              <Icon style={[styles.button, {backgroundColor: selected.btn4 ?   '#267326' : '#009900'}]}
                size={60}
                name='square'
                type='material-community'
                color='white'
                onPress={() => handleChange('square')} 
                />
          </View>
          <View style={styles.nextArrow}>
          <Icon 
                size={100}
                name='arrow-right-bold'
                type='material-community'
                color='grey'
                onPress={() => checkChoice(choice)} 
                />
          </View>
        </View>
      </View>

  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 10,
    flex: 1,
    alignItems: "center",
    flexDirection : "row",
    justifyContent: "space-evenly",
  },
  container2:{
    bottom: 45,
  },
  button: {
    borderRadius: 15,
    justifyContent: 'center',
    width: 150,
    height: 120,
  },
  buttonShadow:{
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset : { width: 0, height: 0},
  },
  nextArrow:{
    position: 'absolute',
    top: 300,
    left: 50,
  }
}));


