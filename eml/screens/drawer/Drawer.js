import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DrawerItems from '../../constants/DrawerItems';

const Drawer = createDrawerNavigator();

export default function DrawerView() {
  return (

    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Profile"
      screenOptions={{
        activeTintColor: '#0FE222',
        itemStyle: { marginVertical: 10 },
      }}
    >
      {
        DrawerItems.map(drawer=>
          <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            component={drawer.screen}
            options={{
              drawerIcon:({focused})=>
                drawer.iconType==='Material' ?
                  <MaterialCommunityIcons
                    name={drawer.iconName}
                    size={24}
                    color={focused ? '#0FE501' : 'black'}/>
                  :
                  drawer.iconType==='Feather' ?
                    <Feather
                      name={drawer.iconName}
                      size={24}
                      color={focused ? '#0FE501' : 'black'}/>
                    :
                    <FontAwesome5
                      name={drawer.iconName}
                      size={24}
                      color={focused ? '#0FE501' : 'black'}/>
            }}
          />)
      }
    </Drawer.Navigator>
  );
}
