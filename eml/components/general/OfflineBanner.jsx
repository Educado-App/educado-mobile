import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NetworkStatusService } from '../../services/NetworkStatusService';
import tailwindConfig from '../../tailwind.config';

/**
 * A banner component that shows an offline notification.
 * It checks periodically for backend connectivity and displays a banner if the backend is not reachable.
 * @returns {JSX.Element} - The rendered component.
 */
export default function OfflineBanner() {
  const [isBackendReachable, setIsBackendReachable] = useState(false);
  const translateY = useRef(new Animated.Value(-100)).current;
  const networkStatusService = NetworkStatusService.getInstance();

  useEffect(() => {
    // Define the observer object with an 'update' method
    const observer = {
      update: (status) => {
        setIsBackendReachable(status);
      }
    };

    // Register this component as an observer
    setIsBackendReachable(networkStatusService.addObserver(observer));

    // Return a cleanup function to remove this component as an observer
    return () => networkStatusService.removeObserver(observer);
  }, [networkStatusService]);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isBackendReachable ? -100 : 0, // Slide in or out
      duration: 1000,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  }, [isBackendReachable, translateY]);

  return (
    <Animated.View
      style={[{
        transform: [{translateY}],
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10,
        backgroundColor: isBackendReachable ? tailwindConfig.theme.colors.success : tailwindConfig.theme.colors.yellow,
      }]}
      className='flex-row pb-2 justify-center items-end h-[10%]'
    >
      <MaterialCommunityIcons
        name={isBackendReachable ? 'wifi' : 'wifi-off'}
        color='black'
        size={20}
      />
      <Text className={'px-2'}>
        {/* No internet connection! */}
        {isBackendReachable ? 'Conectado à internet' : 'Sem conexão com a internet!'}
      </Text>
    </Animated.View>
  );
}