import React from 'react';
import { Layout, Card } from '@ui-kitten/components';
import { View } from 'react-native';
import Text from '../general/Text';


const Header = (props) => (
  <View {...props}>
    {/* Personal Finance */}
    <Text category='h6'>Finanças pessoais</Text>
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
  );

}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
});



