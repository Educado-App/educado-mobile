import React from 'react';
import { View, Text } from 'react-native'; // Assuming this is for React Native based on the tags.
import PropTypes from 'prop-types';

/**
 * This component is used to display the date a course was last updated.
 * @param dateUpdated - The date the course was last updated.
 * @returns {JSX.Element} - Returns a JSX element.
 */
const UpdateDate = ({ dateUpdated }) => (
  <View>
    <Text className="text-xs opacity-40 pt-3">
      ATUALIZADO: {dateUpdated}
    </Text>
  </View>
);

UpdateDate.propTypes = {
  dateUpdated: PropTypes.string,
};

export default UpdateDate;
