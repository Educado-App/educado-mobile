import * as React from 'react'
import * as Progress from 'react-native-progress'
import PropTypes from 'prop-types'
const CustomProgressBar = ({ progress }) => {
  CustomProgressBar.propTypes = {
    progress: PropTypes.number.isRequired
  }
  return (
    <Progress.Bar
      progress={progress}
      width={253}
      height={10}
      color="rgba(94, 204, 233, 1)"
      unfilledColor="rgba(228, 242, 245, 1)"
      borderWidth={0}
      borderRadius={8}
    ></Progress.Bar>
  )
}

export default CustomProgressBar
