
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Text from '../general/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IconButton from './IconButton';


import tailwindConfig from '../../tailwind.config';

export default function VideoActions({ isPlaying, isMuted, onPlayClick, onMenuClick, onCommentClick, onVolumeClick }) {

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    const [expanded, setExpanded] = useState(false);

    return (
        < View >
            {expanded && <View className="flex-col">
                <IconButton icon="menu" onClick={onMenuClick} iconColor={tailwindConfig.theme.colors.white} bgColor={tailwindConfig.theme.colors.primary} />
                <View className="h-[1.5vh]" />
                <IconButton icon="comment-text" onClick={onCommentClick} iconColor={tailwindConfig.theme.colors.white} bgColor={tailwindConfig.theme.colors.primary} />
                <View className="h-[1.5vh]" />
                <IconButton icon={isMuted ? "volume-mute" : "volume-high"} iconColor={isMuted ? tailwindConfig.theme.colors.primary : tailwindConfig.theme.colors.white} bgColor={isMuted ? tailwindConfig.theme.colors.white : tailwindConfig.theme.colors.primary} onClick={onVolumeClick} />
                <View className="h-[1.5vh]" />
                <IconButton icon={isPlaying ? "pause" : "play"} iconColor={isPlaying ? tailwindConfig.theme.colors.primary : tailwindConfig.theme.colors.white} bgColor={isPlaying ? tailwindConfig.theme.colors.white : tailwindConfig.theme.colors.primary} onClick={onPlayClick} />
            </View>}
            <View className="h-[1.5vh]" />
            <IconButton icon="dots-horizontal" iconColor={expanded ? tailwindConfig.theme.colors.primary : tailwindConfig.theme.colors.white} bgColor={expanded ? tailwindConfig.theme.colors.white : tailwindConfig.theme.colors.transparent} onClick={toggleExpanded} />
        </View >
    )
}