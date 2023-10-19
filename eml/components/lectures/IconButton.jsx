import React, { useEffect, useState } from 'react';
import tailwindConfig from '../../tailwind.config';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Pressable, View } from 'react-native';


export default function IconButton({ iconColor, size = 24, bgColor, icon = "menu", onClick }) {


    return (
        <Pressable onPress={onClick} >
            < View className={"flex-col rounded-full justify-center active:bg-opacity-50 items-center  w-[10vw] h-[10vw]  "} style={{backgroundColor: bgColor }}>
                <MaterialCommunityIcons name={icon} size={size} color={iconColor} />
            </View >
        </Pressable>
    )
}