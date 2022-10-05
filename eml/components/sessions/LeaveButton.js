import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native"
import { Icon, Button } from '@rneui/base';
const LeaveButton = () => {

    return (
      <TouchableOpacity>
          <Button buttonStyle={styles.buttons} color='white' radius='20' size='sm' icon={<Icon
              size={30}
              name='chevron-left'
              type='material-community'
              color='black'
            />}>
          </Button>
      </TouchableOpacity>
)
};
const styles = StyleSheet.create({
  buttons:{ width: 50, height: 50, }
  });

export default LeaveButton;