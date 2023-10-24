import React from 'react';
import { View, Text } from 'react-native'; // Assuming this is for React Native based on the tags.

const UpdateDate = ({ dateUpdated }) => (
    <View>
        <Text className="text-xs opacity-40 pt-3">
            ATUALIZADO: {dateUpdated}
        </Text>
    </View>
);

export default UpdateDate;
