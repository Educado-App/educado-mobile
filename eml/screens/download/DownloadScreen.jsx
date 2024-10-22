import React, { useEffect, useState } from 'react';
import {
	View,
	SafeAreaView,
	ScrollView,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../../components/loading/Loading';
import NetworkStatusObserver from '../../hooks/NetworkStatusObserver';
/**
 * Profile screen
 * @returns {React.Element} Component for the profile screen
*/
export default function Download() {
    const [downloaded, setDownloaded] = useState(false);
    const [loading, setLoading] = useState(true);
	
	return (
       loading ? <LoadingScreen /> :
            <>
                <NetworkStatusObserver setIsOnline={setIsOnline}/>
                <SafeAreaView className='bg-secondary'>
                    <View className='h-full'>
                        <Text className='text-center text-2xl font-bold mt-8'>Download</Text>
                    </View>
                </SafeAreaView>
            </>
	);
}