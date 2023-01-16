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
        // Password Strength
        switch(testResult.score) {
            case 0:
                // Password Strength: Very weak
                return <Text>Força da senha: Muito fraco</Text>;
            case 1:
                // Password strength: Weak
                return <Text>Força da senha: Fraca</Text>;
            case 2:
                // Password strength: Fair
                return <Text>Força da senha: Feira</Text>;
            case 3:
                // Password strength: Good
                return <Text>Força da senha: Bom</Text>;
            case 4:
                // Password strength: Strong
                return <Text>Força da senha: Forte</Text>;
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
        width: `${num}%`,
        backgroundColor: funcProgressColor(),
        height: '200%'
    })

    return (
        <View>
            <View className="progress" style={{ height: '5%', width: '90%' }}>
                <View className="progress-bar" style={changePasswordColor()}/>
            </View>
            <Text style={{ color: funcProgressColor(), marginHorizontal: '5%' }}>{createPassLabel()}</Text>
        </View>
    )
}

export default PasswordStrengthMeter