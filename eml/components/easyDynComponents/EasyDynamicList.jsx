import React from 'react';
import { Layout, Button, ListItem } from '@ui-kitten/components';
import { Icon } from '@rneui/base';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const InstallButton = (props) => (
    <Button size='tiny'>
        DOWNLOAD
    </Button>
);

const ItemImage = (props) => (
    <Icon
        name='circle'
        type='entypo'
    />
);


export default function easyDynamicList({ courseData }) {
    const navigation = useNavigation()

    const courseSections = courseData.sections


    return (
        <ScrollView style={styles.scrollView}>
            {courseSections.map((item, index) => {
                return (
                    <ListItem
                        onPress={() => { navigation.navigate('Exercise', { sectionId: item.sectionId, courseId: courseData.courseId }) }}
                        style={styles.listItems}
                        key={index}
                        title={item.title}
                        description={item.description}
                        accessoryLeft={ItemImage}
                    />
                )
            })}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scrollView: {
        height: '83%',
    },
    listItems: {
        margin: 10,
    }
});



