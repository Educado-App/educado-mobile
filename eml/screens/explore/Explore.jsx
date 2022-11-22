import React from 'react'
import { View, Text, Platform } from 'react-native'
import ActiveCourses from '../../components/explore/ActiveCourses'
import Courses from '../../components/explore/Courses'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading'
import { SelectList } from 'react-native-dropdown-select-list'
import StorageController from '../../assets/controller/storageController'

export default function Explore() {
    const [selected, setSelected] = React.useState(-1);

    const courseList = StorageController.getCourseList()

    const uniqueCategories = [{key: 1, value: "Cleaning"},{key: 2, value: "Health"},{key: 3, value: "Personal Finance"}]

    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular
    })
    if (!fontsLoaded) {
        return AppLoading
    } else {
        return (
            <View style={{ flex: 1 }} className="bg-babyBlue">
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
                    <Text style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular' }}> Explorar Novos Cursos </Text>
                </View>
                <View style={{elevation:15, zIndex:15 }} className="w-10/12 self-center">
                <SelectList 
                setSelected={setSelected} 
                data={uniqueCategories}
                search={false} 
                dropdownStyles={{backgroundColor: '#CFE9EF'}}
                save="key"
                label="categories"
            />
                </View>
                <View style={{ flex: 5 }}>
                    <View style={{ flex: 1 }}>
                        <ActiveCourses courseList={courseList} filter={selected}></ActiveCourses>
                    </View >
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <Courses courseList={courseList} filter={selected}></Courses>
                    </View>
                </View>
            </View>
        )
    }
}
