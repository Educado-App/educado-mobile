import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from 'react-native';

const CardLabel = ({title, icon, color = "gray", time = false}) => {
    const displayTitle = time ? `${title} Horas` : title;

    return ( 
        <View className="flex-row items-center justify-start">
            <MaterialCommunityIcons name={icon} size={13} color={color} />
            <Text className="pl-1 text-xs" style={{color: color}}>{displayTitle}</Text>
        </View>
    );
}
 
export default CardLabel;
