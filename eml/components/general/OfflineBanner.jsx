import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { checkIfOnline } from '../../services/StorageService';

/**
 * A banner component that shows an offline notification.
 * It checks periodically for backend connectivity and displays a banner if the backend is not reachable.
 * @returns {JSX.Element} - The rendered component.
 */
export default function OfflineBanner() {
  const [isBackendReachable, setIsBackendReachable] = useState(false);
  const translateY = useRef(new Animated.Value(-100)).current;

  /**
 * Checks the backend connection status and updates state.
 */
  const checkBackendConnection = async () => {
    setIsBackendReachable(await checkIfOnline());
  };

  useEffect(() => {
    // Check once on mount
    checkBackendConnection();

    const intervalId = setInterval(checkBackendConnection, 10000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isBackendReachable ? -100 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isBackendReachable, translateY]);

  return (
    <Animated.View style={[{
      transform: [{translateY}],
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 10,
    }]} className='bg-yellow flex-row pb-2 justify-center items-end h-[10%]'>
      <MaterialCommunityIcons name={'wifi-off'} color='black' size={20}/>
      <Text className={'px-2'}>
        {/* No internet connection! */}
          Sem conexão com a internet!
      </Text>
    </Animated.View>
  );
}