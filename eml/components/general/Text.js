import RN from "react-native";
import React from "react";

export default function Text(props) {
  const children = props.children;
  return (
    <RN.Text {...props} className="font-sans">{props.children}</RN.Text>
  )
}