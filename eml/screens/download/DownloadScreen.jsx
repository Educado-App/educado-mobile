import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, RefreshControl, ScrollView, View, SafeAreaView,} from 'react-native';
import Text from '../../components/general/Text';
import * as StorageService from '../../services/StorageService';
import { checkCourseStoredLocally } from '../../services/StorageService';
import CourseCard from '../../components/courses/courseCard/CourseCard';
import IconHeader from '../../components/general/IconHeader';
import {shouldUpdate} from '../../services/utilityFunctions';
import ToastNotification from '../../components/general/ToastNotification';
import LoadingScreen from '../../components/loading/Loading';
import NetworkStatusObserver from '../../hooks/NetworkStatusObserver';
import AsyncStorage from '@react-native-async-storage/async-storage';
import errorSwitch from '../../components/general/errorSwitch';
import ShowAlert from '../../components/general/ShowAlert';

/**
 * Profile screen
 * @returns {React.Element} Component for the profile screen
*/
export default function Download() {
    const [courses, setCourses] = useState([]);
    const [courseLoaded, setCourseLoaded] = useState(false);
    const [downloadedCourses, setDownloadedCourses] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

    async function loadCourses() {
        const courseData = await StorageService.getSubCourseList();
        
        if (shouldUpdate(courses, courseData)) {
            if (courseData.length !== 0 && Array.isArray(courseData)) {
                
                // Create an array of promises to check if courses are downloaded
                const downloadedCoursePromises = courseData.map(async (course) => {
                    const isDownloaded = await checkCourseStoredLocally(course.courseId);
                    if (isDownloaded) {
                        return course;  // Return the course if it's downloaded
                    }
                    return null;  // Return null for courses that are not downloaded
                });
    
                // Wait for all download checks to complete
                const downloadedCoursesResults = await Promise.all(downloadedCoursePromises);
                // Filter out null values (courses that are not downloaded)
                const filteredDownloadedCourses = downloadedCoursesResults.filter(course => course !== null);
    
                
                setDownloadedCourses(filteredDownloadedCourses);
                setCourses(courseData);
                setCourseLoaded(true);
    
            } else {
                setCourses([]);
                setCourseLoaded(false);
            }
        }
        
        // Finally set loading to false
        setLoading(false);
    }
    

    const onRefresh = () => {
		setRefreshing(true);
		loadCourses();
		setRefreshing(false);
	};

    useEffect(() => {
		// this makes sure loadCourses is called when the screen is focused
		return navigation.addListener('focus', () => {
			loadCourses();
		});
	}, [navigation]);

    useEffect(() => {
		const logged = async () => {
			const loggedIn = await AsyncStorage.getItem('loggedIn');
			if (loggedIn) {
				setTimeout(async () => {
					ToastNotification('success', 'Logado!');
					await AsyncStorage.removeItem('loggedIn');
				}, 1000);
			}
		};
		try {
			logged();
		} catch (e) {
			ShowAlert(errorSwitch(e));
		}
	}, []);

	return (
       loading ? <LoadingScreen /> :
            <>
                <NetworkStatusObserver setIsOnline={setIsOnline}/>
                <SafeAreaView className='bg-secondary'>
                {courseLoaded ?
					<View height="100%">
                    <IconHeader
                        title={'Bem Vindo!'}
                        description={'Aqui você encontra todos os cursos em que você está inscrito!'}/>
                    <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                        {downloadedCourses.map((course, index) => (
                            <CourseCard key={index} course={course} isOnline={isOnline}></CourseCard>
                        )
                        )}
                    </ScrollView>
                </View>
					:
					<View className="bg-secondary justify-center items-center ">
						<Text className="text-center text-white text-2xl">No courses available</Text>
					</View>}
                </SafeAreaView>
            </>
	);
}