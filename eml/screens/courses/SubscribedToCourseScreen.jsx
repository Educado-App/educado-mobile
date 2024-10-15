import React from 'react';
import { View, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import Text from '../../components/general/Text';
import PropTypes from 'prop-types';
import StartNowButton from '../../components/courses/courseSubsription/StartNowButton';
import StartLaterButton from '../../components/courses/courseSubsription/StartLaterButton';

export default function SubscribedToCourseScreen({ route }) {

    SubscribedToCourseScreen.propTypes = {
        route: PropTypes.object,
    };

    const { course } = route.params;

    return (
        <SafeAreaView className="flex flex-col justify-center items-center bg-secondary h-screen w-screen">
            <LottieView
                className="z-10 absolute top-8 w-full"
                source={require('../../assets/animations/subscribedToCourse.json')}
                autoPlay
            />

            <View className="flex px-6 w-full z-20 items-center justify-end h-3/4">
                <View className="w-fit h-40 justify-center mb-8">
                    <Text className="text-center text-3xl font-montserrat-bold text-heading text-primary_custom bg-secondary">
                        Parabéns! Você está inscrito no curso "{course.title}"
                    </Text>
                </View>
            </View>

            <View className='mt-10'>
                <StartNowButton course={course} />
            </View>
            <View>
                <StartLaterButton />
            </View>
        </SafeAreaView>
    )
}

