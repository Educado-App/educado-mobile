import {StyleSheet, View, TouchableOpacity, Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Text} from "@rneui/base";
import {deleteUser, loginUser} from "../../api/userApi";

const LOGIN_TOKEN = '@loginToken';
const USER_INFO = '@userInfo'

export default function DeleteAccount() {

    const navigation = useNavigation();

    async function Delete () {

        try {

            const obj = JSON.parse(await AsyncStorage.getItem(USER_INFO));

            if (obj !== null){

                try {
                    await deleteUser(obj.id)
                        .then(function (response) {
                            AsyncStorage.multiRemove([LOGIN_TOKEN, USER_INFO]).then(r => {
                                console.log("User account deleted successfully!");
                                navigation.navigate('LoginStack');
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } catch (e) {
                    console.log(e);
                }

            }
        }
        catch (e){
            console.log(e);
        }

    }


    const deleteAlert = () =>
        Alert.alert(
            "Delete Account",
            "Are you sure?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: Delete}
            ]
        );

    return (
        <View style ={styles.container}>

            <TouchableOpacity style={styles.formButton} onPress={deleteAlert}>
                <Text style={styles.text}>

                    <Feather name="delete" size={36}  style={styles.tinyLogo}/>

                    Delete Account

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
