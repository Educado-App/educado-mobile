import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomProgressBar from '../exercise/Progressbar';

const ProfileStatsBox = ({ studentPoints, studentLevel, levelProgress }) => {
  return (
    <View className='m-6 rounded-medium border-projectGray border-2'>
      <View className='flex flex-row justify-between items-center p-3 w-full'>
        {/* Badge 1 */}
        <View className='flex flex-col bg-badgesGreen justify-center items-center py-2 rounded-medium w-[32%]'>
          <Image source={require('../../assets/images/profileFlame.png')} />
          <Text className='text-projectWhite font-sans-bold pt-3'>1 dia seguido</Text>
        </View>
        {/* Badge 2 */}
        <View className='flex flex-col bg-badgesPurple justify-center items-center py-2 rounded-medium w-[32%] mx-2'>
          <Image source={require('../../assets/images/profileCoin.png')} />
          <Text className='text-projectWhite font-sans-bold pt-3'>{studentPoints} pontos</Text>
        </View>
        {/* Badge 3 */}
        <View className='flex flex-col bg-badgesBlue justify-center items-center py-2 rounded-medium w-[32%]'>
          <Image source={require('../../assets/images/profileLightning.png')} />
          <Text className='text-projectWhite font-sans-bold pt-3'>3º posição</Text>
        </View>
      </View>
      {/* Level and Progress Bar */}
      <View className='flex flex-row justify-between p-4 border-projectGray border-t-2'>
        <Text className='font-sans-bold text-primary'>Nível {studentLevel}</Text>
        <CustomProgressBar progress={levelProgress} width={65} height={1} displayLabel={false} />
      </View>
    </View>
  );
};

ProfileStatsBox.propTypes = {
  studentLevel: PropTypes.number.isRequired,
  levelProgress: PropTypes.number.isRequired,
};

export default ProfileStatsBox;
