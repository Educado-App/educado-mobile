import {StyleSheet, View, TouchableOpacity, Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Text} from "@rneui/base";

const LOGIN_TOKEN = '@loginToken';
const USER_INFO = '@userInfo'

export default function LogOutButton() {

    const navigation = useNavigation();

    const logoutAlert = () =>
        Alert.alert(
            "Logout",
            "Are you sure?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () =>{

                    try {
                        AsyncStorage.removeItem(LOGIN_TOKEN).then(r => {
                            console.log("User logged out successfully!");
                            navigation.navigate('LoginStack');
                        });
                    }
                    catch (e){
                        console.log(e);
                    }

                }}
            ]
        );

    return (
        <View style ={styles.container}>

            <TouchableOpacity style={styles.formButton} onPress={logoutAlert}>
                <Text style={styles.text}>

                    <Feather name="log-out" size={36}  style={styles.tinyLogo}/>

                    Log out

                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'flex-start'
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        letterSpacing: 0.5
    },
    bottomContainer:{
        marginVertical: '150%',
        justifyContent: 'center',
        height: '25%',
    },
    formButton: {
        backgroundColor : 'white',
        height : 55,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius: 35,
        marginHorizontal : 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formInputContainer:{
        marginBottom: 70
    },
    text: {
        fontSize: 30,
        color: "#55747E"
    },

    tinyLogo: {
        width: 50,
        height: 50,
        marginRight: 10,
    }
});
