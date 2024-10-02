import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import Text from '../../components/general/Text';
import * as StorageService from '../../services/StorageService';
import SectionCard from '../../components/section/SectionCard';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomProgressBar from '../../components/exercise/Progressbar';
import BaseScreen from '../../components/general/BaseScreen';
import SubscriptionCancel from '../../components/section/CancelSubscriptionButton';
import { unsubscribe } from '../../services/StorageService';
import PropTypes from 'prop-types';
import { checkProgressCourse, checkProgressSection } from '../../services/utilityFunctions';

export default function SectionScreen({ route }) {
	SectionScreen.propTypes = {
		route: PropTypes.object,
	};
	const { course } = route.params;
	const navigation = useNavigation();
	const [sections, setSections] = useState(null);
	const [studentProgress, setStudentProgress] = useState(0);
	const [completedComponents, setCompletedComponents] = useState({});

	// Fetch sections for the course
	async function loadSections(id) {
		const sectionData = await StorageService.getSectionList(id);
		setSections(sectionData);
	}

	// Fetch course progress
	const checkProgress = async () => {
		const progress = await checkProgressCourse(course.courseId);
		setStudentProgress(progress);
	};

	// Fetch progress for all sections
	const loadSectionProgress = async (sections) => {
		const progressData = {};
		for (const section of sections) {
			const completed = await checkProgressSection(section.sectionId);
			progressData[section.sectionId] = completed;
		}
		setCompletedComponents(progressData);
	};

	useEffect(() => {
		// Add focus listener to refresh progress on screen focus
		const unsubscribe = navigation.addListener('focus', () => {
			checkProgress();
		});
		return unsubscribe; // Cleanup the listener
	}, [navigation]);

	useEffect(() => {
		async function loadData() {
			await loadSections(course.courseId);
			checkProgress(); // Fetch course progress

			// Once sections are loaded, fetch their progress
			if (sections && sections.length > 0) {
				await loadSectionProgress(sections);
			}
		}

		loadData();
	}, [course.courseId, sections]);

	const unsubAlert = () =>
		Alert.alert('Cancelar subscrição', 'Tem certeza?', [
			{
				text: 'Não',
				style: 'cancel',
			},
			{ text: 'Sim', onPress: () => { unsubscribe(course.courseId); setTimeout(() =>  {navigation.goBack();}, 300 ); }},
		]);

	return (
		<BaseScreen>
			<View className="flex flex-row flex-wrap items-center justify-between px-6 pt-[20%]">
				{/* Back Button */}
				<TouchableOpacity className="pr-3" onPress={() => navigation.goBack()}>
					<MaterialCommunityIcons name="chevron-left" size={25} color="black" />
				</TouchableOpacity>

				{/* Course Title */}
				<Text className="text-[25px] font-bold">{course.title}</Text>
			</View>

			{/* Render sections */}
			{sections ? (
				sections.length === 0 ? null : (
					<View className="flex-[1] flex-col my-[10px]">
						{/* Progress Bar */}
						<CustomProgressBar width={60} progress={studentProgress} height={3}></CustomProgressBar>

						{/* Section Cards */}
						<ScrollView className="mt-[5%]" showsVerticalScrollIndicator={false}>
							{sections.map((section, i) => (
								<SectionCard
									key={i}
									section={section}
									course={course}
									progress={completedComponents[section.sectionId] || 0} // Use loaded progress
								/>
							))}
						</ScrollView>

						{/* Unsubscribe Button */}
						<SubscriptionCancel onPress={unsubAlert} />
					</View>
				)
			) : null}
		</BaseScreen>
	);
}
