import { React, useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import Text from '../../components/general/Text';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getLectureById } from '../../api/api';

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
            {lecture ?
                <View className="flex-col  w-full h-full "  >
                    <View className="flex-row items-center p-[10] mt-[20%] mb-[10%]">
                        <View className="pl-2">
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons name="chevron-left" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-[25px] font-bold ml-[10]">{lecture.title}</Text>
                    </View>
                    <View className="flex-[1] flex-col">
                        {/* <ProgressBar fracBot={100} fracTop={50} type={"section"} /> */}

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* {sections && sections.map((section) => {
            return (
              <SectionCard key={section.sectionId} section={section}></SectionCard>
            )
          })
          } */}

                            <View>
                                <Text className="text-[25px] font-bold ml-[10]">{lecture.description}</Text>
                            </View>

                        </ScrollView>
                    </View>
                </View>
                : <View><Text className="text-[25px] font-bold ml-[10]">loading...</Text></View>
            }
        </View>
    );
}

