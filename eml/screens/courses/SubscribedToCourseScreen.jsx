import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import Text from '../../components/general/Text';
import PropTypes from 'prop-types';
import BaseScreen from '../../components/general/BaseScreen';
import BackButton from '../../components/general/BackButton';
import StartNowButton from '../../components/courses/courseSubsription/StartNowButton';
import StartLaterButton from '../../components/courses/courseSubsription/StartLaterButton';

export default function SubscribedToCourseScreen({ route }) {

    SubscribedToCourseScreen.propTypes = {
		route: PropTypes.object,
	};

    const { course } = route.params;
    const navigation = useNavigation();

    return (
        <BaseScreen>
            <View>
					<View className='relative mx-4 mt-12 mb-6'>
						{/* Back button */}
                        {/* If user uses back button should they unsubscribe?*/}
						<BackButton onPress={() => navigation.navigate('Explorar')} />

						{/* Title */}
						<Text className='w-full text-center text-xl font-sans-bold'>
                            Parabéns! Você está inscrito no curso "{course.title}"
						</Text>
					</View>
                <View className='mt-10'>
                    <StartNowButton course={course} />
                </View>
                <View>
                    <StartLaterButton />
                </View>
            </View>
        </BaseScreen>
    )
}