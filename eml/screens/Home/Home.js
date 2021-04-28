import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';

import CategoryContainer from './../../components/CategoryContainer';

import financeLogo from './../../assets/financeLogo.png';
const financeLogoUri = Image.resolveAssetSource(financeLogo).uri;
import healthLogo from './../../assets/healthLogo.png';
const healthLogoUri = Image.resolveAssetSource(healthLogo).uri;
import jobsLogo from './../../assets/jobsLogo.png';
const jobsLogoUri = Image.resolveAssetSource(jobsLogo).uri;
import languageLogo from './../../assets/languageLogo.png';
const languageLogoUri = Image.resolveAssetSource(languageLogo).uri;


export default function Home(props) {

  return (
    <View style={styles.container}>
        <View>
            <CategoryContainer nav={props.navigation.navigate} title="Finance" image={financeLogoUri}></CategoryContainer>
            <CategoryContainer nav={props.navigation.navigate} title="Health" image={healthLogoUri}></CategoryContainer>
        </View>
        <View>
            <CategoryContainer nav={props.navigation.navigate} title="Jobs" image={jobsLogoUri}></CategoryContainer>
            <CategoryContainer nav={props.navigation.navigate} title="Language" image={languageLogoUri}></CategoryContainer>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
});
