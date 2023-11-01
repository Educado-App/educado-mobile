import { useFonts } from 'expo-font';

import MontserratRegular from '../assets/fonts/Montserrat-Regular.ttf';
import MontserratBold from '../assets/fonts/Montserrat-Bold.ttf';
import MontserratSemiBold from '../assets/fonts/Montserrat-SemiBold.ttf';

export const isFontsLoaded = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': MontserratRegular,
    'Montserrat-Bold': MontserratBold,
    'Montserrat-SemiBold': MontserratSemiBold,
  });

  return fontsLoaded;
};