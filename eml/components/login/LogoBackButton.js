import { View, Image } from "react-native";
import LeaveButton from "../exercise/LeaveButton";

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
      <Image
        source={require('../../assets/logo_educado.png')}
        className='h-12'
        resizeMode='contain'
      />
    </View>
  )
}