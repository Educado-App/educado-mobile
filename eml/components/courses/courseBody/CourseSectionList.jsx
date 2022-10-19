import React from 'react'
import { View } from 'react-native'
import Section from './Section'
import { Icon } from '@rneui/base'
import PropTypes from 'prop-types'

const nrArr = [
  [1, 3],
  [2, 3],
  [3, 3],
  [0, 3]
]

export default function CourseSectionList() {
  CourseSectionList.propTypes = {
    CourseProgression: PropTypes.array.isRequired
  }

  return (
    <View>
      <Section
        SectionIcon={
          <Icon // icon
            size={50}
            name="cash"
            type="material-community"
            color="green"
          />
        }
        SectionText={'How To Save Money'}
        SectionProgressText={`${nrArr[0][0]}/${nrArr[0][1]}`}
        SectionProgressBarWidth={String((nrArr[0][0] / nrArr[0][1]) * 100)}
        SectionOpacity={0}
      ></Section>

      <Section
        SectionIcon={
          <Icon // icon
            size={50}
            name="currency-usd"
            type="material-community"
            color="#095410"
          />
        }
        SectionText={'How To Get Money'}
        SectionProgressText={`${nrArr[1][0]}/${nrArr[1][1]}`}
        SectionProgressBarWidth={String((nrArr[1][0] / nrArr[1][1]) * 100)}
        SectionOpacity={0.8}
      ></Section>

      <Section
        SectionIcon={
          <Icon // icon
            size={50}
            name="currency-usd"
            type="material-community"
            color="#095410"
          />
        }
        SectionText={'How To Invest'}
        SectionProgressText={`${nrArr[2][0]}/${nrArr[2][1]}`}
        SectionProgressBarWidth={String((nrArr[2][0] / nrArr[2][1]) * 100)}
        SectionOpacity={0.5}
      ></Section>
      <Section
        SectionIcon={
          <Icon // icon
            size={50}
            name="currency-usd"
            type="material-community"
            color="#095410"
          />
        }
        SectionText={'How To Earn Millions'}
        SectionProgressText={`${nrArr[3][0]}/${nrArr[3][1]}`}
        SectionProgressBarWidth={String((nrArr[3][0] / nrArr[3][1]) * 100)}
        SectionOpacity={0}
      ></Section>
    </View>
  )
}
