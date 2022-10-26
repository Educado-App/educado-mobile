import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon, Button } from '@rneui/base'
import PropTypes from 'prop-types'

const LeaveButton = ({ navigationPlace }) => {
  LeaveButton.propTypes = {
    navigationPlace: PropTypes.string.isRequired
  }
  const navigation = useNavigation()
  return (
    <Button
      buttonStyle={styles.buttons}
      color="invisible"
      radius="20"
      size="sm"
      onPress={() => navigation.navigate('Course')}
      icon={
        <Icon
          size={40}
          name="chevron-left"
          type="material-community"
          color="black"
        />
      }
    ></Button>
  )
}
const styles = StyleSheet.create({
  buttons: { width: 50, height: 50 }
})

export default LeaveButton
