import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EasyDynamicList from './EasyDynamicList';
const JSONData = require('../../assets/file/testCourse.json');


export default function MenuDisabledOptionsShowcase() {

    return (
        <Layout style={styles.mainContainer}>
            <EasyDynamicList JSONData={JSONData} ></EasyDynamicList>
        </Layout>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: '15%'
    }
});