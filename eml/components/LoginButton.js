import React from "react";
import {StyleSheet, Pressable, Text, Image, View, Dimensions} from "react-native";

import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";


export default function LoginButton(props) {
    const navigation = useNavigation();
    const route = useRoute().name;

    return (

        <View>
            <View>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Image source={{
                        uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    }} style={styles.loginButton}/>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
   loginButton: {
       height: 250,
       width: 250,
   }
});