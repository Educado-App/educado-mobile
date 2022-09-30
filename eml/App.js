import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import VeryNiceButton from './components/VeryNiceButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShapes} from '@fortawesome/free-solid-svg-icons/';

export default function App() {
  return (
    <View style={styles.container}>
        <Text>This is app js</Text>
        <View>
        <FontAwesomeIcon icon={faShapes}/>
        <VeryNiceButton></VeryNiceButton>
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
  },
  row:{

  }
});
