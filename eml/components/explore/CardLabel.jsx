import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const CardLabel = ({title, icon, color = "f1CC4f", time = false}) => {
    const displayTitle = time ? `${title} horas` : title;

    return ( 
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            <MaterialIcons name={icon} size={15} color={color} />
            <Text style={{ paddingLeft: 3, fontSize: 13, color: color }} >{displayTitle}</Text>
        </View>
    );
}
 
export default CardLabel;
