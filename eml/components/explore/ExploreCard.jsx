import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import UpdateDate from './ExploreUpdate';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardLabel from './CardLabel';
import CustomRating from './CustomRating';
import SubscriptionButton from './SubscriptionButton';
import AccessCourseButton from './AccessCourseButton';
import * as Utility from '../../services/utilityFunctions';
import PropTypes from 'prop-types';

/**
 * This component is used to display a course card.
 * @param course - The course object to be displayed.
 * @param isPublished - Boolean value that indicates if the course is published. If false, the card will not be displayed.
 * @param subscribed - Boolean value that indicates if the user is subscribed to the course.
 * @returns {JSX.Element|null} - Returns a JSX element. If the course is not published, returns null.
 */
export default function ExploreCard({ course, isPublished, subscribed }) {
	const [isCollapsed, setIsCollapsed] = useState(true);

	return isPublished ? (
		<Pressable
			className="bg-projectWhite rounded-lg shadow-2xl mb-4 mx-4 p-6 overflow-hidden"
			onPress={() => setIsCollapsed(!isCollapsed)}
		>
			<View className="flex-col items-center">
				<View className="flex-row justify-between w-full items-center">
					<Text className="text-projectBlack font-medium text-lg">{course.title}</Text>
					<MaterialCommunityIcons
						name={isCollapsed ? 'chevron-down' : 'chevron-up'}
						size={25}
						color="gray"
					/>
				</View>

				<View className="h-1 border-b-[1px] w-full border-projectGray opacity-50 pt-2"></View>

				<View className="w-full h-[0.5] pt-2" />
				<View className="flex-row justify-between w-full items-start">
					<View className="flex-col items-start justify-between">
						<View className="flex-row items-center justify-start pb-2 flex-wrap">
							<CardLabel
								title={Utility.determineCategory(course.category)}
								icon={Utility.determineIcon(course.category)}
							/>
							<View className="w-2.5" />
							<CardLabel
								title={Utility.formatHours(course.estimatedHours)}
								icon={'clock-outline'}
							/>
							<View className="w-2.5" />
							<CardLabel
								title={Utility.getDifficultyLabel(course.difficulty)}
								icon={'book-multiple-outline'}
							/>
						</View>
						<View className="h-1.25 opacity-50" />
						<CustomRating rating={course.rating} />

					</View>

				</View>

			</View>


			<Collapsible className="w-full" collapsed={isCollapsed}>
				<View className="py-7 flex-row items-center justify-between px-1">
					<Text className="text-projectBlack text-m">{course.description}</Text>
				</View>

				<View>
					{
						subscribed ? (
							<AccessCourseButton course={course} />
						) : (
							<SubscriptionButton course={course} />
						)
					}
					<UpdateDate dateUpdated={Utility.getUpdatedDate(course.dateUpdated)} />
				</View>

			</Collapsible>
			<View className="items-start absolute">
				<View className="rotate-[315deg] items-center">
					{
						subscribed ? (
							<Text className="bg-yellow text-xs text-projectWhite font-bold px-8 -left-8 -top-4 drop-shadow-sm">
              Inscrito
							</Text>
						) : null
					}
				</View>
			</View>
		</Pressable>
	) : null;
}

ExploreCard.propTypes = {
	course: PropTypes.object,
	isPublished: PropTypes.bool,
	subscribed: PropTypes.bool,
};