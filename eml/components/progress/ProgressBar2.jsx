import * as React from "react";
import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import PropTypes from "prop-types";
import { ScreenWidth, ScreenHeight } from "@rneui/base";

const CustomProgressBar = ({ progress, width, height }) => {
  CustomProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };
  return (
    <View className="flex-row items-center justify-around">
      <Progress.Bar
        progress={25 / 100}
        width={ScreenWidth * width}
        height={ScreenHeight * height}
        color="rgba(94, 204, 233, 1)"
        unfilledColor="rgba(228, 242, 245, 1)"
        borderWidth={0}
        borderRadius={8}
      ></Progress.Bar>
      {/* <Text className="px-4 text-center font-montserrat-bold font-bold text-caption-medium text-projectBlack">
        {progress}%
      </Text> */}
    </View>
  );
}; // CustomProgressBar.defaultProps = { progress: 0, width: 90, height: 5 };

export default CustomProgressBar;