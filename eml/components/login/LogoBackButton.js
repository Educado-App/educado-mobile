import { View, Image } from "react-native";
import LeaveButton from "../exercise/LeaveButton";
import EducadoLogo from "../images/EducadoLogo";


/**
 * Component that includes, logo, title and backbutton, used in login and register screens
 * @param {Object} props Should contain the following properties:
 * - navigationPlace: String
 * @returns {React.Element} Header/logo/back button component

 */
export default function LogoBackButton(props) {

  return (
    <View className='flex-row justify-center w-full mt-4'>
      {/* TODO: Implement with general back button instead */}
      <View className='absolute left-0'>
        <LeaveButton
          navigationPlace={props.navigationPlace ? props.navigationPlace : 'Home'}
        />
      </View>
      {/* Educado logo */}
      <EducadoLogo/>
    </View>
  )
}