import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import Text from '../../components/general/Text';
import PropTypes from 'prop-types';

export default function Section({
	SectionIcon,
	SectionText,
	SectionProgressText,
	SectionProgressBarWidth,
	SectionOpacity
}) {
	const [selected, setSelected] = useState({
		pressed: 'lightgrey'
	});
	const navigation = useNavigation();
	return (
	// Needs to have State To update Width of the view with background color which is now green
		<Pressable
			style={[
				{
					width: '95%',
					height: 80,
					marginTop: 20,
					alignItems: 'center',
					alignSelf: 'center',
					borderRadius: 14
				}
			]}
			onPressIn={() => {
				setSelected({ pressed: 'grey' });
				navigation.navigate('Exercise');
			}}
			onPressOut={() => setSelected({ pressed: 'lightgrey' })}
		>
			<View
				style={{
					width: '100%',
					height: '100%'
				}}
			>
				<View //This is the active layer
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#F5F5F5',
						zIndex: 3,
						opacity: SectionOpacity,
						borderRadius: 14
					}}
				></View>
				<View //This is the content layer
					style={{
						width: '100%',
						height: '100%',
						alignItems: 'center',
						borderRadius: 14,
						flexDirection: 'row',
						position: 'absolute',
						zIndex: 2
					}}
				>
					<View style={{ flex: 1, alignItems: 'center' }}>{SectionIcon}</View>
					<View style={{ flex: 2.4, alignItems: 'center' }}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: '700'
							}}
						>
							{SectionText}
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							alignItems: 'flex-end',
							paddingRight: '2%'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 14,
									fontWeight: '800'
								}}
							>
								{SectionProgressText}
							</Text>
							<Icon // icon
								size={30}
								name="star"
								type="material-community"
								color="yellow"
							/>
						</View>
					</View>
				</View>
				<View //This is progress bar layer
					style={{
						width: SectionProgressBarWidth + '%',
						borderRadius: 14,
						height: '100%',
						backgroundColor: '#00ff18',
						justifyContent: 'center',
						opacity: 0.5,
						zIndex: 1,
						position: 'absolute'
					}}
				/>
				<View //This is the background layer
					style={[
						{
							width: '100%',
							height: '100%',
							backgroundColor: selected.pressed,
							zIndex: 0,
							borderRadius: 14,
							position: 'absolute'
						}
					]}
				></View>
			</View>
		</Pressable>
	);
}

Section.propTypes = {
	SectionIcon: PropTypes.element,
	SectionText: PropTypes.string,
	SectionProgressText: PropTypes.string,
	SectionProgressBarWidth: PropTypes.number,
	SectionOpacity: PropTypes.number
};