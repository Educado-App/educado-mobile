import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ViewComponent } from 'react-native';
import Session from './Session/SessionScreen'
export default function CourseComponent()  {
    return (
        <View>
      <StatusBar style="auto" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  