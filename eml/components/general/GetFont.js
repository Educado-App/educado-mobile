import { isFontsLoaded } from "../../constants/Fonts";

export default function getFont() {
  if (isFontsLoaded()) {
    return " font-montserrat";
  } else {
    return "";
  }
}