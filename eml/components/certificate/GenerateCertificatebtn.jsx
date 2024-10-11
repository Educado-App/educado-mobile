import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import tailwindConfig from '../../tailwind.config';
import PropTypes from 'prop-types';

/**
 * Renders a button component for generating a certificate.
 * @param {Function} onPress - The function to be called when the button is pressed.
 * @returns {JSX.Element} - The rendered component.
 */
const GenerateCertificate = ({ onPress }) => {
    GenerateCertificate.propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    const handlePress = async () => {
        try {
            const response = await axios.put('http://localhost:8080/routes/creatorCertificateRoutes/', {
    
                creatorId: '66f65e753522450ae085d021', //example from db
                courseId: '66e153dd49bbf6516c19e431', //example from db
            });
            console.log('Certificate generated:', response.data);
            onPress(); // Call the passed onPress function if needed
        } catch (error) {
            console.error('Error generating certificate:', error.response?.data || error.message);
        }
    };

    return (
        <View className="py-4 self-center justify-end">
            <Button
                mode={'contained'}
                color={tailwindConfig.theme.colors.error}
                testID="generateCertificateButton"
                onPress={handlePress}
            >
                Generate Certificate
            </Button>
        </View>
    );
};

export default GenerateCertificate;