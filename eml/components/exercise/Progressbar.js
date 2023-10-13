import * as React from "react";
import { View } from "react-native";

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
    <View>
      <Progress.Bar
        progress={progress}
        width={ScreenWidth * (width / 100)}
        height={ScreenHeight * (height / 100)}
        color="rgba(94, 204, 233, 1)"
        unfilledColor="rgba(228, 242, 245, 1)"
        borderWidth={0}
        borderRadius={8}
      ></Progress.Bar>
    </View>
  );
};

export default CustomProgressBar;
