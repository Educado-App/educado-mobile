import { React, useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import Text from '../../components/general/Text';
import ProgressBar from '../../components/progress/ProgressBar';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getLectureById } from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

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




    return (

        <View className="flex-1 bg-[#f1f9fb]">
            <SafeAreaView> 
            {lecture ?
            
                <View className="flex-col  w-full h-full "  >
                    <ProgressBar fracBot={100} fracTop={50} type={"section"} />
                    <View className="flex-row items-center p-2 mb-8">
                        <View className="pl-2">
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <MaterialCommunityIcons name="chevron-left" size={25} color="black" />
                            </TouchableOpacity>
                            <ProgressBar fracBot={100} fracTop={50} type={"section"} />
                        </View>
                    </View>
                    <View className="flex-1 flex-col">
                             <View className="items-center">
                                <Text className="text-2xl font-extrabold uppercase pb-4">Bem vindo!</Text>
                            </View>

                            <View>
                                <Text className="text-md pl-8 pr-8 font-normal">{lecture.description}</Text>
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

