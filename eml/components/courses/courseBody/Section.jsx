import React from 'react'
import { View, Text } from 'react-native'
import * as Progress from 'react-native-progress'
import { Icon } from '@rneui/base'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Section({
  SectionIcon,
  SectionText,
  SectionProgressText,
  SectionProgressBarWidth,
  SectionOpacity
}) {
  // needs props that contain icons, text and progress for specific section.
  return (
    // Needs to have State To update Width of the view with background color which is now green
    <TouchableOpacity
      style={{
        width: '95%',
        height: 80,
        marginTop: 30,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 14,
        borderColor: 'red'
      }}
    >
      <View
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'grey',
            zIndex: 2,
            elevation: 2,
            opacity: SectionOpacity,
            borderRadius: 14
          }}
        ></View>
        <View
          style={{
            width: SectionProgressBarWidth + '%', //we use state to change this width
            borderRadius: 14,
            height: '100%',
            backgroundColor: '#00ff18',
            justifyContent: 'center',
            opacity: 0.5,
            zIndex: 1,
            elevation: 1,
            position: 'absolute'
          }}
        />
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            borderRadius: 14,
            backgroundColor: '#DEDEDE',
            flexDirection: 'row',
            position: 'absolute'
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>{SectionIcon}</View>
          <View style={{ flex: 2.4, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: '18',
                fontWeight: '700'
              }}
            >
              {SectionText}
            </Text>
            {/* Text that will change with state */}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              paddingRight: '2%'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: '14',
                  fontWeight: 'bold'
                }}
              >
                {SectionProgressText}
              </Text>
              <Icon // icon
                size={30}
                name="star"
                type="material-community"
                color="yellow"
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
