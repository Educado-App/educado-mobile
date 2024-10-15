import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CardLabel from '../explore/CardLabel';
import * as Utility from '../../services/utilityFunctions';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CertificateTemplate from './CertificateTemplate';
import Popup from '../popup/popup';

/**
 * This component is used to display a certificate card.
 * @param certificate - The certificate object to be displayed.
 * @param previewOnPress - The function to be executed when the preview button is pressed.
 * @returns {JSX.Element|null} - Returns a JSX element.
 */
export default function CertificateCard({ certificate }) {
	const [popupVisible, setPopupVisible] = useState(false);
  
	const handleVisualizarClick = () => {
	  setPopupVisible(true);
	};
  
	const handleClosePopup = () => {
	  setPopupVisible(false);
	};
	return (
		<View className="relative w-full h-[40%] min-h-[260px]">
			<CertificateTemplate
				studentName={certificate.studentFirstName + " " + certificate.studentLastName}
				estimatedCourseDuration={certificate.estimatedCourseDuration}
				courseName={certificate.courseName}
				dateOfCompletion={Utility.formatDate(certificate.dateOfCompletion)}
				creatorName={certificate.courseCreator}
			/>
			<View className="absolute bottom-0 left-0 right-0 h-1/2 bg-projectWhite rounded-lg mx-4 px-2">
					<View className="flex-col items-end mx-4 relative">
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
						<TouchableOpacity className="flex items-end absolute bottom-0 right-0" onPress={handleVisualizarClick}>
							<View className="flex flex-row items-center justify-center">
								<Text className="text-primary_custom font-bold mr-1">visualizar</Text>
								<MaterialCommunityIcons name={'eye'} size={13} color={"#166276"} />
							</View>
							<View className="border-b-[1px] w-[90px] border-primary_custom pt-[2px]"></View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<Popup visible={popupVisible} onClose={handleClosePopup} />
		</View>
	);
}

CertificateCard.propTypes = {
	certificate: PropTypes.object,
};