import React from 'react'
import { View, Text } from 'react-native'
import * as Progress from 'react-native-progress'
import { Icon } from '@rneui/base'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CourseSectionList(props) {
  // needs props that contain icons, text and progress for specific section.
  return (
    // Needs to have State To update Width of the view with background color which is now green
    <TouchableOpacity
      style={{
        marginTop: 300,
        width: '95%',
        height: '15%',
        alignItems: 'center',
        alignSelf: 'center'
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
            width: '40%', //we use state to change this width
            borderRadius: 17,
            height: '100%',
            backgroundColor: '#00ff18',
            justifyContent: 'center'
          }}
        />
        <View
          style={{
            width: '98%',
            height: '89%',
            alignItems: 'center',
            borderRadius: 14,
            opacity: 0.6,
            backgroundColor: 'lightgrey',
            flexDirection: 'row',
            zIndex: 1,
            elevation: 1,
            position: 'absolute',
            marginTop: '1%',
            marginLeft: '1%'
          }}
        >
          <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
            <Icon // icon
              size={30}
              name="cash"
              type="material-community"
              color="#095410"
            />
          </View>
          <View style={{ flex: 4, alignItems: 'flex-end' }}>
            <Text
              style={{
                fontSize: '18',
                fontWeight: '700'
              }}
            >
              How to save money
            </Text>
            {/* Text that will change with state */}
          </View>
          <View
            style={{
              flex: 2,
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
                4 / 13
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
