import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ExploreCard({ title, courseId }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 15,
        marginHorizontal: 18,
        padding: 25,
      }}
      onPress={() => navigation.navigate('Course', { courseId: courseId })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: 16,
            color: 'black',
          }}
        >
          {title}
        </Text>
        <View
          style={{
            backgroundColor: '#f1f1f1',
            borderRadius: 50,
            padding: 5,
          }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
            source={require('../../assets/favicon.png')}
          />
        </View>
      </View>
    </Pressable>
  );
}
