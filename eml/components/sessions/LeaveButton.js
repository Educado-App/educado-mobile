import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Button } from '@rneui/base'
const LeaveButton = () => {
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
const styles = StyleSheet.create({
  buttons: { width: 50, height: 50 }
})

export default LeaveButton
