import { View, Image, Pressable, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../components/general/Text';
import { AppLoading } from 'expo-app-loading';
import ProgressBar from '../../progress/ProgressBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * CourseCard component displays a card for a course with its details and progress.
 * @param {Object} props - Component props.
 * @param {Object} props.course - Course object containing course details.
 * @returns {JSX.Element} - Rendered component.
 */
export default function CourseCard({ course }) {
    const navigation = useNavigation();

        return (  
          <Pressable className="
          bg-[#fff]
          m-[8px]
          rounded-[10px]
          shadow-[0_0px_2px_#000]
          shadow-opacity-[0.3]
          elevation-[8]
          mb-[15px]
          mx-[18px]
          p-[15px]
          "
            onPress={()=> {
              navigation.navigate('Section', {
              courseId: course.courseId,
            });
          }}
          > 
      <View>
        <View className="
        flex-row
        items-start
        justify-between
        px-[5px]
        py-[5px]
        "
        >
          <MaterialCommunityIcons size={28} name={course.image ? course.image : 'school'}> </MaterialCommunityIcons>
          <Text className="
          text-[18px]
          text-black
          flex-1
          self-center
          "
          >
             { course.title ? course.title : 'Course Title' }
          </Text>
        </View>
        <View className="h-[1px] bg-[#e0e0e0] m-[5px]"></View>
        <View className="flex-row items-center justify-start">
            <MaterialCommunityIcons size={18} name="school" color={'gray'}></MaterialCommunityIcons>
            <Text className="mx-[5px] my-[10px]">{course.category ? course.category : 'category'}</Text>
            <MaterialCommunityIcons size={18} name="clock" color={'gray'}></MaterialCommunityIcons>
            <Text className="mx-[5px] my-[10px]">{course.duration ? course.duration : 'duration'}</Text>
        </View>
        <View className="flex-row items-center">
            <ProgressBar fracTop={50} fracBot={100} type={"course"} />
            <Pressable className="z-[1] ml-[20%]"
                                 onPress={()=> {
                                    navigation.navigate('Section', {
                                    courseId: course.courseId,
                                  });
                                }}>
                <MaterialCommunityIcons size={28} name="play-circle" color={'#5ECCE9'}></MaterialCommunityIcons>
            </Pressable>
        </View>
      </View>
      </Pressable>
    )
    }