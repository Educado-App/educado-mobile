import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button } from '@rneui/base';
import PropTypes from 'prop-types';
import tailwindConfig from '../../tailwind.config';

const projectColors = tailwindConfig.theme.colors;

const LeaveButton = ({ navigationPlace, courseID }) => {

  const navigation = useNavigation();
  return (
    <Button
      buttonStyle={styles.buttons}
      color='invisible'
      radius='20'
      size='sm'
      onPress={() =>
        navigation.navigate(navigationPlace, { courseId: courseID })
      }
      icon={
        <Icon
          size={25}
          name='chevron-left'
          type='material-community'
          color={projectColors.projectBlack}
        />
      }
    ></Button>
  );
};
const styles = StyleSheet.create({
  buttons: { width: 50, height: 50 },
});

LeaveButton.propTypes = {
  navigationPlace: PropTypes.string,
  courseID: PropTypes.string,
};

export default LeaveButton;
