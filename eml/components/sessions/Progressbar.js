import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

const CustomProgressBar = () => {

    return (
        <Progress.Bar progress={0.3} width={300}></Progress.Bar>
)
};


export default CustomProgressBar;