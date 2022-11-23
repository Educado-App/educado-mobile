import { React, useState, useEffect } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import TestComponent from "../../components/test/TestComponent";

export default function TestScreen() {

    useEffect(() => {

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