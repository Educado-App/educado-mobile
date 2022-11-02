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


export default function easyDynamicList({ JSONData }) {
    const navigation = useNavigation()


    return (
        <ScrollView style={styles.scrollView}>
            {JSONData.map((item, index) => {
                return (
                    <ListItem
                        onPress={() => { navigation.navigate('Exercise', { itemId: item.sectionNumber },) }}
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



