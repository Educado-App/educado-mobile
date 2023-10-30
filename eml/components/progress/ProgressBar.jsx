import React from 'react';
import { View } from 'react-native';
import Text from '../general/Text';
import PropTypes from 'prop-types';

/**
 * Renders a progress bar with the given fraction values.
 * @param {Object} props - The component props.
 * @param {number} props.fracTop - The numerator of the fraction.
 * @param {number} props.fracBot - The denominator of the fraction.
 * @param {string} props.type - The type of progress bar ("course" or "section").
 * @returns {JSX.Element} - The rendered component.
 */
export default function ProgressBar({ fracTop, fracBot, type = "course" }) {
    ProgressBar.propTypes = {
        fracTop: PropTypes.number.isRequired,
        fracBot: PropTypes.number.isRequired,
        type: PropTypes.oneOf(["course", "section"])
    };

    const progressWidth = (fracTop / fracBot) * 100;

    const baseStyles = {
        course: {
            container: "flex-col h-[45%] bg-[#ccc] rounded-[10px] my-[10px] w-[100%] max-w-[65%] min-w-[65%]",
            text: "text-[15px] font-bold text-black absolute bottom-[-23%] right-[-22%]"
        },
        section: {
            container: "self-start ml-[7.5%] h-[3%] bg-[#ccc] rounded-[10px] mb-[5%] w-[100%] max-w-[73%] min-w-[73%]",
            text: "text-[15px] font-bold text-black right-[-16%] bottom-[0%] self-end absolute"
        }
    };

    return (
        <View className={baseStyles[type].container}>
            <View className="rounded-tl-[10px] rounded-bl-[10px] rounded-br-[8px] rounded-tr-[8px] h-[100%] bg-[#5ECCE9] opacity-[0.5] absolute min-w-[0%]"
                  style={{ width: progressWidth + "%" }} />
            <Text className={baseStyles[type].text}>
                {progressWidth}%
            </Text>
        </View>
    );
}
