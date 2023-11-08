import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Icon } from '@rneui/themed';
import * as StorageService from '../../services/StorageService';
import { getCourseById } from '../../services/StorageService';
import { useIsFocused } from '@react-navigation/native';

const downloadCourseButton = ({ courseId, downloadStateSignal }) => {
  const [downloadState, setDownloadState] = useState(2);

  useEffect(() => {
    checkIfActive();
  }, [courseId]);

  async function checkIfActive() {
    await getCourseById(courseId).then((course) => {
      if (course.isActive) {
        setDownloadState(1);
      } else {
        setDownloadState(2);
      }
    });
  }

  const downloadCourseById = async () => {
    setDownloadState(0);
    await StorageService.downloadCourse(courseId)
      .then(() => {
        console.log('download finished');
        setDownloadState(1);
        downloadStateSignal(courseId);
      })
      .catch((error) => {
        console.log(error);
        setDownloadState(-1);
      });
  };

  const deleteCourseById = async () => {
    await checkIfActive();
    await StorageService.deleteCourse(courseId)
      .then(() => {
        console.log('Delete finished');
        setDownloadState(2);
        downloadStateSignal(null);
      })
      .catch((error) => {
        console.log(error);
        setDownloadState(-1);
      });
  };

  const deleteAlertButton = () => {
    Alert.alert(
      'Delete Downloaded Course',
      'Are you sure you want to delete the downloaded course?',
      [
        {
          text: 'Yes',
          onPress: () => deleteCourseById(courseId),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]
    );
  };

  // by default the switch will return the download icon,
  // if the user has pressed the download button the loading indicator will be return
  // when the download is finished it return a checkmark

  const downloadStateIcon = (state) => {
    switch (state) {
    case 0:
      return <ActivityIndicator size="small" color="#55747E" />;

    case 1:
      return (
        <Icon
          // make this disappear after a few seconds after download
          style={styles.tinyLogo}
          name="trash-can-outline"
          type="material-community"
          color="#55747E"
          size={30}
        />
      );

    case -1:
      return (
        <Icon
          style={styles.tinyLogo}
          name="alert-circle"
          type="material-community"
          color="#55747E"
          size={25}
        />
      );

    case 2:
      return (
        <Icon
          style={styles.tinyLogo}
          name="download"
          type="material-community"
          color="#55747E"
          size={30}
        />
      );
    }
  };
  const downloadStateLabel = (state) => {
    //test state - change between values: null, 0 and 1 to see different states

    switch (state) {
    case 0:
      //downloading
      return <Text>baixando...</Text>;
    case 1:
      return <Text></Text>;
    case -1:
      //Can't download
      return <Text style={styles.alertMessage}> não consigo baixar </Text>;
    case 2:
      return <Text></Text>;
    }
  };

  return (
    <View style={styles.takeItToTheRight}>
      <View>
        <Text style={styles.text}>
          <View>
            <TouchableOpacity
              onPress={
                downloadState === 1 ? deleteAlertButton : downloadCourseById
              }
            >
              {downloadStateIcon(downloadState)}
              {downloadStateLabel(downloadState)}
            </TouchableOpacity>
          </View>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  takeItToTheRight: {
    marginLeft: 275,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft: 65,
    marginRight: 65,
  },
  text: {
    fontSize: 3,
    color: '#55747E',
  },

  tinyLogo: {
    width: 25,
    height: 35,
    marginRight: 0,
    marginLeft: 15,
    marginTop: 5,
  },
  alertMessage: {
    color: 'red',
    fontSize: 7,
  },
});

export default downloadCourseButton;
