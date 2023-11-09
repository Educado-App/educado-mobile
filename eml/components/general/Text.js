import RN from "react-native";
import React from "react";
import PropTypes from "prop-types";

export default function Text(props) {
  const children = props.children;
  return (
    <RN.Text {...props} className="font-sans text-projectBlack text-body">{props.children}</RN.Text>
  )
}

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};