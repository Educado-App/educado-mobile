import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text } from 'react-native';
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OfflineBanner() {
    const [isBackendReachable, setIsBackendReachable] = useState(false);
    const translateY = useRef(new Animated.Value(-100)).current;
    const BACKEND_URL = 'http://localhost:8888/api';

    const checkBackendConnection = async () => {
        try {
            await axios.get(BACKEND_URL);
            setIsBackendReachable(true);
        } catch (error) {
            setIsBackendReachable(false);
        }
    };

    useEffect(() => {
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
        }]} className='bg-error flex-row pb-2 justify-center items-end h-[10%]'>
            <MaterialCommunityIcons name={'connection'} color='white' size={20}/>
            <Text className={"text-projectWhite px-2"}>
                Sem conexão com a internet!
            </Text>
        </Animated.View>
    );
}