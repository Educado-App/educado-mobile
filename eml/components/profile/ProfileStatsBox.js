import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomProgressBar from '../exercise/Progressbar';
import PropTypes from 'prop-types';

const ProfileStatsBox = ({ studentPoints, studentLevel, levelProgress }) => {
  return (
    <View className='m-6 rounded-medium border-projectGray/50 border-2'>
      <View className='flex flex-row justify-between items-center p-2 w-full'>
        {/* Badge 1 */}
        <View className='flex-1 flex-col bg-badgesGreen justify-center items-center py-2 rounded-medium'>
          <Image source={require('../../assets/images/profileFlame.png')} />
          <Text className='text-projectWhite font-sans-bold pt-3'>1 dia seguido</Text>
        </View>
        {/* Badge 2 */}
        <View className='flex-1 flex-col bg-badgesPurple justify-center items-center py-2 rounded-medium mx-2'>
          <Image source={require('../../assets/images/profileCoin.png')} />
          <Text className='text-projectWhite font-sans-bold pt-3'>{studentPoints} pontos</Text>
        </View>
        {/* Badge 3 */}
        <View className='flex-1 flex-col bg-badgesBlue justify-center items-center py-2 rounded-medium'>
          <Image source={require('../../assets/images/profileLightning.png')} />
          <Text className='text-projectWhite font-sans-bold pt-3'>3º posição</Text>
        </View>
      </View>
      {/* Level and Progress Bar */}
      <View className='flex flex-row justify-between p-4 border-projectGray/50 border-t-2'>
        <Text className='font-sans-bold text-primary'>Nível {studentLevel}</Text>
        <CustomProgressBar progress={levelProgress} width={65} height={1} displayLabel={false} />
      </View>
    </View>
  );
};

ProfileStatsBox.propTypes = {
  studentPoints: PropTypes.number.isRequired,
  studentLevel: PropTypes.number.isRequired,
  levelProgress: PropTypes.number.isRequired,
};

export default ProfileStatsBox;
