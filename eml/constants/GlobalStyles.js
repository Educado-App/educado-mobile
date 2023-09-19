import { StyleSheet } from "react-native";
import { fontSizes } from "./Theme";

export const globalStyles = StyleSheet.create({
  heading: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: fontSizes.heading,
  },
  subheading: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: fontSizes.subheading,
  },
  "body-regular": {
    fontFamily: "Montserrat-Regular",
    fontSize: fontSizes.body,
  },
  "body-itatic": {
    fontFamily: "Montserrat-Italic",
    fontSize: fontSizes.body,
  },
  "body-bold": {
    fontFamily: "Montserrat-Bold",
    fontSize: fontSizes.body,
  },
  "body-bold-italic": {
    fontFamily: "Montserrat-BoldItalic",
    fontSize: fontSizes.body,
  },
  "body-bold-link": {
    fontFamily: "Montserrat-Bold",
    fontSize: fontSizes.body,
    textDecorationLine: "underline",
  },
  "body-regular-italic": {
    fontFamily: "Montserrat-Itatic",
    fontSize: fontSizes.body,
    textDecorationLine: "underline",
  },
  "caption-medium-regular": {
    fontFamily: "Montserrat-Regular",
    fontSize: fontSizes["caption-medium"],
  },
  "caption-medium-bold": {
    fontFamily: "Montserrat-Bold",
    fontSize: fontSizes["caption-medium"],
  },
  "caption-small-regular": {
    fontFamily: "Montserrat-Regular",
    fontSize: fontSizes["caption-small"],
  },
  "caption-small-bold": {
    fontFamily: "Montserrat-Bold",
    fontSize: fontSizes["caption-small"],
  },
});
