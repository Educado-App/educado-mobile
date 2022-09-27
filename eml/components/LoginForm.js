import React from "react";
import {StyleSheet, Pressable, Text, Image, View, Dimensions, TextInput} from "react-native";

import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";

export default function LoginForm(props) {
    const navigation = useNavigation();
    const route = useRoute().name;

    return (

        <View>
            <TextInput style={styles.loginForm} placeholder="Username"/>
            <TextInput style={styles.loginForm} placeholder="Password"/>
        </View>
    );
}


const styles = StyleSheet.create({
    loginForm: {
        textAlign: "center",
        padding: 5,
        fontSize: 34,
    }
});