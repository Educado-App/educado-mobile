import React from 'react'
import { Layout, Card } from '@ui-kitten/components';
import { View, Text } from 'react-native'


const Header = (props) => (
    <View {...props}>
        <Text category='h6'>Personal Finance</Text>
    </View>
);
export default function EasyDynCard(params) {

    return (
        <>
            <Layout>
                <Card style={styles.card} header={Header} status={'primary'}></Card>
                <Card style={styles.card} header={Header} status={'primary'}>
                </Card>
            </Layout>
        </>
    )

};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 2,
    },
});



