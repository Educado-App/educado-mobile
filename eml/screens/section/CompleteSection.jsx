import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import Text from '../../components/general/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export default function CompleteSectionScreen() {
  // const lottieRef = useRef(null);

	// useEffect(() => {
  //   const stopAnimation = setTimeout(() => {
  //     if (lottieRef.current) {
  //       lottieRef.current.pause();
  //     }
  //   }, 1500); // 2 seconds

  //   return () => {
  //     clearTimeout(stopAnimation);
  //   };
  // }, []);

  return (
    <SafeAreaView className="bg-bgPrimary h-screen w-screen">
			<View className="h-full w-full z-10 top-0">
				<LottieView 
					// ref={lottieRef}
					style={{"height":"60%", "width":"100%"}} 
					source={require('../../assets/animations/completeSection.json')} 
					autoPlay
				/>

				<View className="flex flex-col justify-center items-center">
					<View className="h-40 w-72 items-center justify-center">
						<Text className="z-20 text-center text-3xl font-montserrat-bold text-primary bg-bgPrimary rounded-small">
						Você está progredindo! Próxima seção, aqui vamos nós!
						</Text>
					</View>

					<View className="flex flex-row">
						<View className="h-20 w-40 bg-yellow">

						</View>
						<View className="h-20 w-40 bg-success">

						</View>
					</View>
				</View>
			</View>

			
    </SafeAreaView>
  );
};

