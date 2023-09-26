
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const CardLabel = ({title, icon, color="f1CC4f"}) => {
    return ( 
        <View style={
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
              }
        } >
            <MaterialIcons name= {icon} size={20} color={color} />
            <Text style={{paddingLeft: 3, color: color}} >{title}</Text>
        </View>
     );
}
 
export default CardLabel;