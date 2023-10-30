import * as React from 'react';
import { View } from 'react-native';
import Text from '../../components/general/Text';

export default function SettingsScreen() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{/* Settings Screen */}
			<Text style={{fontSize:16,fontWeight:'700'}}>Tela de configurações</Text>
		</View>
	);
}
