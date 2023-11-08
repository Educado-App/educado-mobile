import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import tailwindConfig from '../../tailwind.config';

/**
 * Renders a button component for cancelling a subscription.
 * @param {Function} onPress - The function to be called when the button is pressed.
 * @returns {JSX.Element} - The rendered component.
 */
const SubscriptionCancel = ({ onPress }) => {
  return (
    <View className="py-4 self-center justify-end">
          <Button
              mode={"contained"}
              color={tailwindConfig.theme.colors.error}
              testID="subscriptionCancelButton"
              onPress={onPress}
              >
              Cancelar inscrição
          </Button>
    </View>
  );
};

export default SubscriptionCancel;
