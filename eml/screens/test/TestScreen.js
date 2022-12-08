import { React, useState, useEffect } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import TestComponent from "../../components/test/TestComponent";
import * as StorageService from "../../services/StorageService";
import * as DirectoryService from "../../services/DirectoryService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TestScreen() {

    async function clearStorage () {
        //Uncomment to clear async storage cache upon loading explore screen
        console.log(await AsyncStorage.getAllKeys(), "BEFORE")
        console.log(await AsyncStorage.clear(), "CLEAR")
        console.log(await AsyncStorage.getAllKeys(), "AFTER")
        //console.log(await AsyncStorage.removeItem("635fb5b9b2fb6c4f49084682"))
        //console.log(await AsyncStorage.getAllKeys())
        //console.log(await DirectoryService.DeleteDirectory('6388ab98d77d454f20d070ff'));
        console.log(await DirectoryService.ReadDirectory(''), "READDIR");
        //console.log(await DirectoryService.DeleteDirectory('635fb5b9b2fb6c4f49084682'));
    }

    useEffect(() => {
        clearStorage()
    })

    return (
        <View style={styles.container}>
            <View style={{ flex: 2, width: '100%' }}>
                <TestComponent></TestComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
