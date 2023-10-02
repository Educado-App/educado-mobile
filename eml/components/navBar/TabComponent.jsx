import React from 'react';
import { Icon } from '@rneui/themed';

const TabComponent = ({name, component, iconName, tabBarActiveBackgroundColor = '#5fcce9', tabBarActiveTintColor = 'white', tabBarInactiveTintColor = 'grey', headerShown = false}) => {
    return (
        <Tab.Screen
            name={name}
            component={component}
            options={{
                tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
                headerShown: headerShown,
                tabBarIcon: ({ color }) => (
                    <Icon
                        size={17}
                        name={iconName}
                        type="material-community"
                        color={color}
                    />
                ),
                tabBarActiveTintColor: tabBarActiveTintColor,
                tabBarInactiveTintColor: tabBarInactiveTintColor,
            }}
        />
    );
};
