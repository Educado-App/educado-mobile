import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native"
import { Icon, Button } from '@rneui/base';
const ContinueButton = () => {

    return (
      <TouchableOpacity>
          <Button buttonStyle={styles.buttons} color='#4CBB17' raised radius='20' size='lg' iconRight={true} icon={<Icon
              size={60}
              name='arrow-right-thin'
              type='material-community'
              color='white'
            />}>Continue
          </Button>
      </TouchableOpacity>
)
};
const styles = StyleSheet.create({
  buttons:{ width: 160, height: 80 }
  });

export default ContinueButton;