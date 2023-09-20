import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import RegisterForm from "../../components/login/RegisterForm";

const {width, height} = Dimensions.get('window');


export default function Register(props) {

    const navigation = useNavigation();

    return (
        <View className='flex-1 justify-end bg-primary'>
            <RegisterForm/>
        </View>
    );
}

