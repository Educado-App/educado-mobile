import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { AppLoading } from 'expo-app-loading';

export default function RightAnswerScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  const { courseId, sectionId } = route.params;
  return (
    <View
      style={{
        flex: 0.5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      className="bg-babyBlue flex-auto justify-evenly align-center"
    >
      <View style={{ flex: 1.5 }}>
        <View style={{ paddingTop: '40%', paddingBottom: '10%' }}>
          <Text
            style={{
              fontSize: 45
            }}
            className="text-gray-600"
          >
            {/* GOOD JOB! */}
            BOM TRABALHO!
          </Text>
        </View>
        <View style={{ justifyContent: 'space-evenly' }}>
          <Icon
            style={{
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: '#ffd633',
              elevation: 10,
            }}
            size={200}
            name="star"
            type="material-community"
            color="#fac12f"
          />
        </View>
      </View>
      <View style={{ top: '5%', flex: 0.7 }}>
        <View
          style={[
            styles.nextArrow,
            styles.buttonShadow,
            { shadowColor: '#2db300' },
          ]}
        >
          <Icon
            size={70}
            name="chevron-right"
            type="material-community"
            color="white"
            onPress={() =>
              navigation.navigate('Exercise', {
                sectionId,
                courseId,
              })
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    width: 140,
    height: 110,
  },
  buttonShadow: {
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  nextArrow: {
    borderRadius: 15,
    backgroundColor: '#2db300',
    width: 300,
    height: 75,
    position: 'relative',
  },
});
