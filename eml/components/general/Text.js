import RN from "react-native";
import React from "react";

export default function Text(props) {
  const children = props.children;
  return (
    <RN.Text {...props} className="font-sans text-projectBlack text-body">{props.children}</RN.Text>
  )
}