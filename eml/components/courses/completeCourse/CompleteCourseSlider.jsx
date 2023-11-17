import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Slick from 'react-native-slick';
import Congratulation from './Congratulation';
import StatsOverview from './StatsOverview';
import Certification from './Certification';

const CompleteCourseSlider = forwardRef(({ onIndexChanged, courseObject }, ref) => {
  const slick = useRef(null);
  const tailwindConfig = require('../../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

  const screens = [
    <Congratulation />,
    <StatsOverview courseObject={courseObject} />,
    <Certification courseObject={courseObject} />,
  ];

  const scrollBy = (number) => {
    if (slick.current) {
      slick.current.scrollBy(number, true);
    }
  };

  useImperativeHandle(ref, () => ({
    scrollBy,
  }));

  return (
    <Slick
      ref={slick}
      scrollEnabled={true}
      loop={false}
      index={0}
      dotColor={projectColors.projectWhite}
      dotStyle={{ width: 10, height: 10 }}
      activeDotColor={projectColors.primary}
      activeDotStyle={{ width: 10, height: 10 }}
      height={265}
      showsButtons={true}
      onIndexChanged={onIndexChanged}
      autoplayTimeout={10}
      autoplay={true}
      nextButton={
        <Svg className="h-[25px] w-[25px] mr-4">
          <Path
            d="M8.59003 17.1239L13.17 12.5439L8.59003 7.95385L10 6.54385L16 12.5439L10 18.5439L8.59003 17.1239Z"
            fill={projectColors.projectBlack}
          />
        </Svg>
      }
      prevButton={
        <Svg className="h-[25px] w-[25px] ml-4">
          <Path
            d="M15.41 17.1239L10.83 12.5439L15.41 7.95385L14 6.54385L8 12.5439L14 18.5439L15.41 17.1239Z"
            fill={projectColors.projectBlack}
          />
        </Svg>
      }
    >
    {screens.map((screen, index) => (
      <View key={index}>
        {screen}
      </View>
    ))}
    </Slick>
  );
});

export default CompleteCourseSlider;