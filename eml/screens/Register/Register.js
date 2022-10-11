import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import RegisterForm from "../../components/RegisterForm";

const {width, height} = Dimensions.get('window');


export default function Register(props) {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <RegisterForm></RegisterForm>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'Green'
    },

});
