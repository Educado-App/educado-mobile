
import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import IconButton from './IconButton';
import PropTypes from 'prop-types';

export default function VideoActions({ isPlaying, isMuted, onPlayClick, onVolumeClick }) {

  const toggleExpanded = () => {

    setExpanded(!expanded);

  };

  const [expanded, setExpanded] = useState(false);

  return (
    < View >
      {expanded && <View className="flex-col">

        <IconButton icon={isMuted ? 'volume-mute' : 'volume-high'} pressed={isMuted} onClick={onVolumeClick} />
        <View className="h-[1.5vh]" />
        <IconButton icon={isPlaying ? 'pause' : 'play'} pressed={isPlaying} onClick={onPlayClick} />
      </View>}
      <View className="h-[1.5vh]" />
      <IconButton icon="dots-horizontal" pressed={expanded} onClick={toggleExpanded} />
    </View >
  );
}

VideoActions.propTypes = {
  isPlaying: PropTypes.bool,
  isMuted: PropTypes.bool,
  onPlayClick: PropTypes.func,
  onVolumeClick: PropTypes.func,
};