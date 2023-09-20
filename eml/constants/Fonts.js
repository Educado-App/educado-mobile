import { useFonts } from 'expo-font';

export const isFontsLoaded = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  return fontsLoaded;
};