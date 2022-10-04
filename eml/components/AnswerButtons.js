import AnswerButton from './AnswerButton';
import { StyleSheet, View } from 'react-native';
import { Icon, Button } from '@rneui/base';
const AnswerButtons = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <AnswerButton icon={
          <Button buttonStyle={styles.buttons} color='red' raised radius='20' size='lg'>
            <Icon
              size={50}
              name='triangle'
              type='material-community'
              color='white'
            />
          </Button>
        }></AnswerButton>
        <AnswerButton icon={
          <Button buttonStyle={styles.buttons} color='green' raised radius='20' size='lg'>
            <Icon
              size={50}
              name='square'
              type='material-community'
              color='white'
            />
          </Button>
        }></AnswerButton>
      </View>
      <View style={styles.row}>
        <AnswerButton icon={
          <Button buttonStyle={styles.buttons} color='blue' raised radius='20' size='lg'>
            <Icon
              size={50}
              name='circle'
              type='material-community'
              color='white'
            />
          </Button>
        }></AnswerButton>
        <AnswerButton icon={
          <Button buttonStyle={styles.buttons} color='gold' raised radius='20' size='lg'>
            <Icon
              size={50}
              name='star'
              type='material-community'
              color='white'
            />
          </Button>
        }></AnswerButton>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  row: {
    flexDirection: 'row'
  },
  buttons:{ width: 150, height: 100 }
});
export default AnswerButtons;