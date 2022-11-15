import React from 'react';
import zxcvbn from 'zxcvbn';
import {Text, View} from "react-native";

const PasswordStrengthMeter = (passwordObj) => {
    const passwordObject = passwordObj.passwordObj;
    //console.log(passwordObject.passwordStrength);

    const testResult = zxcvbn(String(passwordObject.passwordStrength));
    const num = testResult.score * 100 / 4;

    //console.log(testResult.score);

    const createPassLabel = () => {
        switch(testResult.score) {
            case 0:
                return <Text>Password strength: Very weak</Text>;
            case 1:
                return <Text>Password strength: Weak</Text>;
            case 2:
                return <Text>Password strength: Fair</Text>;
            case 3:
                return <Text>Password strength: Good</Text>;
            case 4:
                return <Text>Password strength: Strong</Text>;
            default:
                return <Text> </Text>;
        }
    }


    const funcProgressColor = () => {
        switch(testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b510';
            default:
                return 'none';
        }
    }

    const changePasswordColor = () => ({
        marginHorizontal: '5%',
        width: `${num}-25%`,
        backgroundColor: funcProgressColor(),
        height: '50%'
    })

    return (
        <View>
            <View className="progress" style={{ height: '15%', width: '90%' }}>
                <View className="progress-bar" style={changePasswordColor()}/>
            </View>
            <Text style={{ color: funcProgressColor(), marginHorizontal: '5%' }}>{createPassLabel()}</Text>
        </View>
    )
}

export default PasswordStrengthMeter