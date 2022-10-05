import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

const CustomProgressBar = () => {

    return (
        <Progress.Bar progress={0.2} width={275} height={8} color='rgba(123,254,77, 100)' borderColor='rgba(0,0,0, 0.17)'></Progress.Bar>
)
};


export default CustomProgressBar;