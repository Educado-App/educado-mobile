import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";

export default function FourButtons2() {
  const [selected, setSelected] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
  });
  const [choice, setChoice] = useState("");

  function handleChange(evt) {
    if (evt == "triangle") {
      setSelected({
        ...selected,
        btn1: true,
        btn2: false,
        btn3: false,
        btn4: false,
      });
    } else if (evt == "circle") {
      setSelected({
        ...selected,
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false,
      });
    } else if (evt == "star") {
      setSelected({
        ...selected,
        btn1: false,
        btn2: false,
        btn3: true,
        btn4: false,
      });
    } else if (evt == "square") {
      setSelected({
        ...selected,
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: true,
      });
    }
    console.log(evt);
    setChoice(evt);
  }

  function checkChoice(choice) {
    let correctAnswer = "star";
    if (choice == correctAnswer) {
      Alert.alert("Wuhuuu you awnsered correct!", "God job!");
    } else {
      Alert.alert("Buuuuuhhh you are bad", "bad boy!");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View
          style={[
            styles.buttonShadow,
            styles.paddingButtons,
            { shadowColor: selected.btn1 ? "#991f00" : "#ff3300" },
          ]}
        >
          <Icon
            style={[
              styles.button,
              { backgroundColor: selected.btn1 ? "#991f00" : "#ff3300" },
            ]}
            size={60}
            name="triangle"
            type="material-community"
            color="white"
            onPress={() => handleChange("triangle")}
          />
        </View>
        <View
          style={[
            styles.buttonShadow,
            styles.paddingButtons,
            { shadowColor: selected.btn2 ? "#003d99" : "#0066ff" },
          ]}
        >
          <Icon
            style={[
              styles.button,
              { backgroundColor: selected.btn2 ? "#003d99" : "#0066ff" },
            ]}
            size={60}
            name="checkbox-blank-circle"
            type="material-community"
            color="white"
            onPress={() => handleChange("circle")}
          />
        </View>
      </View>
      <View style={styles.container2}>
        <View
          style={[
            ,
            styles.buttonShadow,
            styles.paddingButtons,
            { shadowColor: selected.btn3 ? "#997a00" : "#ffcc00" },
          ]}
        >
          <Icon
            style={[
              styles.button,
              { backgroundColor: selected.btn3 ? "#997a00" : "#ffcc00" },
            ]}
            size={60}
            name="star"
            type="material-community"
            color="white"
            onPress={() => handleChange("star")}
          />
        </View>
        <View
          style={[
            styles.buttonShadow,
            styles.paddingButtons,
            { shadowColor: selected.btn4 ? "#267326" : "#009900" },
          ]}
        >
          <Icon
            style={[
              styles.button,
              { backgroundColor: selected.btn4 ? "#267326" : "#009900" },
            ]}
            size={60}
            name="square"
            type="material-community"
            color="white"
            onPress={() => handleChange("square")}
          />
        </View>
      </View>
      <View style={{top: '2%'}}>
        <View
          style={[
            styles.nextArrow,
            styles.buttonShadow,
            { shadowColor: "#2db300" },
          ]}
        >
          <Icon
            size={70}
            name="check-bold"
            type="material-community"
            color="white"
            onPress={() => checkChoice(choice)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  container2: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 15,
    justifyContent: "center",
    width: 140,
    height: 110,
  },
  buttonShadow: {
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  nextArrow: {
    borderRadius: 15,
    backgroundColor: "#2db300",
    width: 300,
    height: 75,
    position: "relative",
  },
  paddingButtons: {
    padding: 10,
  },
});