import React from 'react';
import { View } from 'react-native';

/**
 * Reusable screen component to provide consistent layout and styling.
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The children components to render inside the screen.
 * @returns {JSX.Element} The BaseScreen component.
 */
export default function BaseScreen({ children }) {
    return (
        <View className="flex-1 bg-[#f1f9fb]">
            {children}
        </View>
    );
}
