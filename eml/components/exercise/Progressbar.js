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
      width={275}
      height={10}
      color="rgba(123,254,77, 100)"
      borderColor="rgba(0,0,0, 0.17)"
    ></Progress.Bar>
  )
}

export default CustomProgressBar
