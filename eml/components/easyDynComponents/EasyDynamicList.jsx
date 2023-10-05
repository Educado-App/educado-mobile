import React from 'react'
import { ScrollView, View } from 'react-native'

import SectionItem from '../courses/courseBody/SectionItem'

export default function easyDynamicList({ course }) {

    const courseSections = course;//.sections;

    return (
        <View className="flex-auto grow pb-1 h-full">
            <ScrollView>
                {/*courseSections.map((item, index) => {
                    return (
                        <SectionItem
                            //active={course.isActive}
                            //sectionId={item.id}
                            //key={index}
                            courseId={course.id}
                            title={item}
                            //index={index + 1}
                        />
                    )
                })*/}
            </ScrollView>
        </View>
    )
}
