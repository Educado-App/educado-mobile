import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Alert } from 'react-native'
import * as Progress from 'react-native-progress'
import { Icon } from '@rneui/base'
import { State } from 'react-native-gesture-handler'

export default function Section({
  SectionIcon,
  SectionText,
  SectionProgressText,
  SectionProgressBarWidth,
  SectionOpacity
}) {
  const [selected, setSelected] = useState({
    pressed: 'lightgrey'
  })
  return (
    // Needs to have State To update Width of the view with background color which is now green
    <Pressable
      style={[
        {
          width: '95%',
          height: 80,
          marginTop: 30,
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 14
        }
      ]}
      onPressIn={() => setSelected({ pressed: 'gray' })}
      onPressOut={() => setSelected({ pressed: 'lightgrey' })}
    >
      <View
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <View //This is the active layer
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#F5F5F5',
            zIndex: 3,
            elevation: 3,
            opacity: SectionOpacity,
            borderRadius: 14
          }}
        ></View>
        <View //This is the content layer
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            borderRadius: 14,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 2,
            elevation: 2
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
        <View //This is progress bar layer
          style={{
            width: SectionProgressBarWidth + '%',
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
        <View //This is the background layer
          style={[
            {
              width: '100%',
              height: '100%',
              backgroundColor: selected.pressed,
              zIndex: 0,
              elevation: 0,
              borderRadius: 14,
              position: 'absolute'
            }
          ]}
        ></View>
      </View>
    </Pressable>
  )
}
