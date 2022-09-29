import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button} from 'react-native';
import VeryNiceButton from './components/VeryNiceButton';
// import FontAwesomeIcon from '@fortawesome/fontawesome-free';
// import {faShapes} from '@fortawesome/free-solid-svg-icons/faShapes';

export default function App() {
  return (
    <View style={styles.container}>
        <Text>This is ap js</Text>
        <View>
        {/* <FontAwesomeIcon icon={faShapes}/> */}
        <VeryNiceButton />
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
