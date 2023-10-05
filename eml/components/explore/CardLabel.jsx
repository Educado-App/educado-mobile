import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from 'react-native';

const CardLabel = ({title, icon, color = "f1CC4f", time = false}) => {
    const displayTitle = time ? `${title} Horas` : title;

    return ( 
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            <MaterialCommunityIcons name={icon} size={13} color={color} />
            <Text style={{ paddingLeft: 3, fontSize: 13, color: color }} >{displayTitle}</Text>
        </View>
    );
}
 
export default CardLabel;
