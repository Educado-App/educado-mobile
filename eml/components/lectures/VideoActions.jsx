
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

                <IconButton icon={isMuted ? "volume-mute" : "volume-high"} pressed={isMuted} onClick={onVolumeClick} />
                <View className="h-[1.5vh]" />
                <IconButton icon={isPlaying ? "pause" : "play"} pressed={isPlaying} onClick={onPlayClick} />
            </View>}
            <View className="h-[1.5vh]" />
            <IconButton icon="dots-horizontal" pressed={expanded} onClick={toggleExpanded} />
        </View >
    )
}