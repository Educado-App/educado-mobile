
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Text from '../general/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IconButton from './IconButton';


export default function VideoActions({ isPlaying, isMuted, onPlayClick, onMenuClick, onCommentClick, onVolumeClick }) {

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    const [expanded, setExpanded] = useState(false);

    return (
        < View >
            {expanded && <View className="flex-col">
                <IconButton icon="menu" onClick={onMenuClick} />
                <View className="h-[1.5vh]" />
                <IconButton icon="comment-text" onClick={onCommentClick} />
                <View className="h-[1.5vh]" />
                <IconButton icon={isMuted ? "volume-mute" : "volume-high"} iconColor={isMuted ? "#5ECCE9" : "white"} bgColor={isMuted ? "white" : "primary"} onClick={onVolumeClick} />
                <View className="h-[1.5vh]" />
                <IconButton icon={isPlaying ? "pause" : "play"} iconColor={isPlaying ? "#5ECCE9" : "white"} bgColor={isPlaying ? "white" : "primary"} onClick={onPlayClick} />
            </View>}
            <View className="h-[1.5vh]" />
            <IconButton icon="dots-horizontal" iconColor={expanded ? "#5ECCE9" : "white"} bgColor={expanded ? "white" : "transparent"} onClick={toggleExpanded} />
        </View >
    )
}