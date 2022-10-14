import React from 'react'
import { View } from 'react-native'
import Section from './Section'
import { Icon } from '@rneui/base'
export default function CourseSectionList() {
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
        SectionText={"How To Save Money"}
        SectionProgressText={"13 / 30"}
        SectionProgressBarWidth={String((13 / 30) * 100)}
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
        SectionText={"How To Get Money"}
        SectionProgressText={"23 / 90"}
        SectionProgressBarWidth={String((23 / 90) * 100)}
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
        SectionText={"How To  Money"}
        SectionProgressText={"0 / 90"}
        SectionProgressBarWidth={String((0 / 90) * 100)}
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
        SectionText={"How To  Money"}
        SectionProgressText={"10 / 10"}
        SectionProgressBarWidth={String((10 / 10) * 100)}
        SectionOpacity={0}
      ></Section>
    </View>
  )
}
