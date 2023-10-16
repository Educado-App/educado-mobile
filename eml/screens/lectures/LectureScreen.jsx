import { React, useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Image } from 'react-native';
import Text from '../../components/general/Text';
import ProgressBar from '../../components/progress/ProgressBar';
import CustomProgressBar from '../../components/progress/ProgressBar2';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getLectureById } from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

import healthLogo from '../../assets/healthLogo.png'

export default function LectureScreen({ route }) {

    const { lectureId } = route.params;
    const navigation = useNavigation();
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        console.log("lectureId", lectureId)
        getLecture(lectureId);
    }, [])

    const getLecture = async (id) => {
        const res = await getLectureById(id);
        console.log("lecture", res)
        setLecture(res);
    }

    //make dummydata for testing
    const dummyData = {
        intro : "Nesse curso você vai aprender sobre finanças pessoais e como gerenciar sua vida financeira. Nesse curso você vai aprender sobre finanças pessoais e como gerenciar sua vida financeira.",
        description : "Nesse curso você vai aprender sobre finanças pessoais e como gerenciar sua vida financeira.",
        lectureImage : require('../../assets/dummyCourseImage.png'),
        textUnderImage : "Nesse curso você vai aprender sobre finanças pessoais e como gerenciar sua vida financeira.Nesse curso você."
    }



    return (

        <View className="flex-1 bg-[#f1f9fb]">
            <SafeAreaView> 
            {lecture ?
                <View className="flex-col w-full h-full "  >
                    <View className="px-6 mt-4 mb-8">
                        <View className=" flex flex-row justify-between items-center">
                           
                                <View>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <MaterialCommunityIcons name="chevron-left" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <CustomProgressBar progress={28} width={0.70} height={0.01} />
                                </View>

                                <View>
                                    <Text className=" text-xs font-extrabold">
                                        28%
                                    </Text>
                                </View>
                      
                        </View>
                    </View>
                    <View className="flex-1 flex-col items-center">
                            
                            <View className="items-center">
                                <Text className="text-2xl font-extrabold uppercase pb-4">Bem vindo!</Text>
                            </View>

                            <View className="px-4">
                                <Text className="text-md text-primary font-normal">{dummyData.intro}</Text>
                            </View>

                            <View className="mt-8 px-4">
                                <Text className="text-md text-gray font-normal">{dummyData.description}</Text>
                            </View>

                            <View className="mt-8">
                                <Image
                                    className=" w-80"
                                    source={dummyData.lectureImage}
                                />
                            </View>
                            <View className="mt-8 px-4">
                                <Text className="text-md text-gray font-normal">{dummyData.textUnderImage}</Text>
                            </View>
                    </View>
                </View>
                
                : 
                <View className="w-full h-full items-center justify-center align-middle">
                    <Text className="text-[25px] font-bold ml-[10]">loading...</Text></View>
            }
            </SafeAreaView>
        </View>
    );
}

