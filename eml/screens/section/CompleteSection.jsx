import React from 'react';
import { View } from 'react-native';
import Text from '../../components/general/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export default function CompleteSectionScreen(){
    return (
        <SafeAreaView className="bg-bgPrimary h-screen w-screen">
            <View className="flex flex-col justify-center items-center">
                <View className="h-4/5 w-4/5 z-10"> 
                    <LottieView style={{"height":"100%", "width":"100%"}} source={require('../../assets/animations/completeSection.json')} autoPlay loop />
                </View>
                <Text className="z-20 -mt-20 text-subheading font-montserrat-bold text-projectWhite p-8 bg-primary rounded-small">
                    Congrats!
                </Text>
            </View>
        </SafeAreaView>
    );
};

