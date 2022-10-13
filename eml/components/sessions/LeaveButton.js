import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Button } from '@rneui/base'
const LeaveButton = () => {
<<<<<<< HEAD

    return (
      <TouchableOpacity>
          <Button buttonStyle={styles.buttons} color='white' radius='20' size='sm' icon={
          <Icon
              size={30}
              name='chevron-left'
              type='material-community'
              color='black'
            />}>
          </Button>
      </TouchableOpacity>
)
};
=======
  return (
    <TouchableOpacity>
      <Button
        buttonStyle={styles.buttons}
        color="invisible"
        radius="20"
        size="sm"
        icon={
          <Icon
            size={40}
            name="chevron-left"
            type="material-community"
            color="black"
          />
        }
      ></Button>
    </TouchableOpacity>
  )
}
>>>>>>> 0e61f0a1c43888d401629d05d780853b7d6f1208
const styles = StyleSheet.create({
  buttons: { width: 50, height: 50 }
})

export default LeaveButton
