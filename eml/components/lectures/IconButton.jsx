import React, { useEffect, useState } from 'react';
import tailwindConfig from '../../tailwind.config';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Pressable, View } from 'react-native';


export default function IconButton({ size = 24, icon = 'menu', onClick, pressed = false }) {


  return (
    <Pressable onPress={onClick} >
      < View className={pressed ? 'flex-col rounded-full justify-center active:bg-opacity-50 items-center  w-[10vw] h-[10vw] bg-projectWhite' : 'flex-col rounded-full justify-center active:bg-opacity-50 items-center  w-[10vw] h-[10vw] bg-primary '}>
        <MaterialCommunityIcons name={icon} size={size} color={pressed ? tailwindConfig.theme.colors.primary : tailwindConfig.theme.colors.projectWhite} />
      </View >
    </Pressable>
  );
}