import React from 'react';
import { ScrollView } from 'react-native'
import { Layout, Avatar, Button, ListItem } from '@ui-kitten/components';

const InstallButton = (props) => (
    <Button size='tiny'>
        INSTALL
    </Button>
);

const ItemImage = (props) => (
    <Avatar
        {...props}
        style={[props.style, { tintColor: null }]}
        source={require('../../assets/financeLogo.png')}
    />
);


export default function easyDynamicList({ JSONData }) {

    return (
        <ScrollView>
            <Layout>
                {JSONData.map((item, index) => {
                    return (
                        <ListItem
                            key={index}
                            title={item.title}
                            description={item.description}
                            accessoryLeft={ItemImage}
                            accessoryRight={InstallButton}
                        />
                    )
                })}
            </Layout>
        </ScrollView>
    )

};
