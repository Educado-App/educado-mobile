import React from 'react';
import { View, Text } from 'react-native';
import CardLabel from '../explore/CardLabel';
import * as Utility from '../../services/utilityFunctions';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CertificateTemplate from './CertificateTemplate';


/**
 * This component is used to display a certificate card.
 * @param certificate - The certificate object to be displayed.
 * @param previewOnPress - The function to be executed when the preview button is pressed.
 * @returns {JSX.Element|null} - Returns a JSX element.
 */
export default function CertificateCard({ certificate }) {
	return (
		<View>
			<CertificateTemplate
				studentName={certificate.studentFirstName + " " + certificate.studentLastName}
				estimatedCourseDuration={certificate.estimatedCourseDuration}
				courseName={certificate.courseName}
				dateOfCompletion={Utility.formatDate(certificate.dateOfCompletion)}
				creatorName={certificate.courseCreator}
			/>
			{/* <View className="h-[210px] bg-projectWhite rounded-lg mx-4">
				<View className="bg-projectWhite rounded-lg shadow-2xl mb-4 mx-4  overflow-hidden absolute bottom-0 left-0">
					<View className="flex-col items-end">
						<View className="flex-row justify-between w-full items-center">
							<Text className="text-black font-medium text-lg">{certificate.courseName}</Text>
						</View>
						<View className="h-1 border-b-[1px] w-full border-gray opacity-50 pt-2"></View>
						<View className="w-full h-[0.5] bg-gray-500 opacity-50 pt-2" />
						<View className="flex-row justify-between w-full items-start mb-6">
							<View className="flex-col items-start justify-between">
								<View className="flex-row items-center justify-start pb-2 flex-wrap">
									<CardLabel
										title={Utility.determineCategory(certificate.courseCategory)}
										icon={Utility.determineIcon(certificate.courseCategory)}
									/>
									<View className="w-2.5" />
									<CardLabel
										title={Utility.formatHours(certificate.estimatedCourseDuration)}
										icon={'clock-outline'}
									/>
									<View className="w-2.5" />
									<CardLabel
										title={Utility.formatDate(certificate.dateOfCompletion)}
										icon={'calendar-check'} />
								</View>
							</View>
						</View>
						<View className="flex w-[90px]">
							<View className="flex flex-row items-center justify-center w-full">
								<Text className="text-primary_custom font-bold mr-1">visualizar</Text>
								<MaterialCommunityIcons name={'eye'} size={13} color={"#166276"} />
							</View>
							<View className="border-b-[1px] w-full border-primary_custom pt-[2px]"></View>
						</View>
					</View>
				</View>
			</View> */}
		</View>

	);
}

CertificateCard.propTypes = {
	certificate: PropTypes.object,
};