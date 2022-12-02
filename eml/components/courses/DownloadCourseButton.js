import React, {useState} from 'react'
import {ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Icon } from '@rneui/themed'
import * as StorageService from "../../services/StorageService";

const downloadCourseButton = ({courseId, downloadStateSignal}) => {

    const [downloadState, setDownloadState] = useState(2);
    console.log(courseId)

    function testLog () {
        return console.log("hello");
    }

    const downloadCourse = async () => {

        setDownloadState(0);
        await StorageService.downloadCourse(courseId)
            .then(()=>{
                console.log("download finished"); setDownloadState(1); downloadStateSignal(courseId);})
            .catch((error)=>{
                console.log(error); setDownloadState(-1);
            });
    }

    // by default the switch will return the download icon,
    // if the user has pressed the download button the loading indicator will be return
    // when the download is finished it return a checkmark

    const downloadStateIcon = (state) => {

        switch(state){
            case 0:
                return <ActivityIndicator size = "small" color="#00ff00"/>

            case 1:
                return <Icon

                    // make this disappear after a few seconds after download
                    style={styles.tinyLogo}
                    name="check"
                    type="material-community"
                    color="#55747E"
                    size={30}/>

            case -1:
                return <Icon
                    style={styles.tinyLogo}
                    name="alert-circle"
                    type="material-community"
                    color="#55747E"
                    size={25}/>

            case 2:
                return <Icon
                    style={styles.tinyLogo}
                    name="download"
                    type="material-community"
                    color="#55747E"
                    size={30}/>
        }
    }
    const downloadStateLabel = (state) => {

        //test state - change between values: null, 0 and 1 to see different states

        switch(state){
            case 0:
                return <Text>downloading...</Text>;
            case 1:
                return <Text></Text>;
            case -1:
                return <Text style={styles.alertMessage}> Can't download </Text>;
            case 2:
                return <Text></Text>;
        }
    }

    return (
        <View style={styles.takeItToTheRight}>
            <View>
                <Text style={styles.text}>
                    <View>
                        <TouchableOpacity onPress={downloadCourse}>

                            {downloadStateIcon(downloadState)}
                            {downloadStateLabel(downloadState)}
                        </TouchableOpacity>
                    </View>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    takeItToTheRight:{
        marginLeft: 275

    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginLeft: 65,
        marginRight: 65
    },
    text: {
        fontSize: 3,
        color: "#55747E"
    },

    tinyLogo: {
        width: 25,
        height: 35,
        marginRight: 0,
        marginLeft: 15,
        marginTop: 5
    },
    alertMessage: {
        color: 'red',
        fontSize: 7
    }
});

export default downloadCourseButton
