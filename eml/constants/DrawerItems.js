import ProfileScreen from "../screens/Drawer/Profile";
import SettingsScreen from "../screens/Drawer/Settings";
import SavedScreen from "../screens/Drawer/Saved";
import ReferScreen from "../screens/Drawer/Refer";

export default [
    {
        name:'Profile',
        iconType:'Material',
        iconName:'face-man',
        screen: ProfileScreen
    },
    {
        name:'Settings',
        iconType:'Feather',
        iconName:'settings',
        screen: SettingsScreen
    },
    {
        name:'Saved Items',
        iconType:'Material',
        iconName:'bookmark-check-outline',
        screen: SavedScreen

    },
    {
        name:'Refer a Friend!',
        iconType:'FontAwesome5',
        iconName:'user-friends',
        screen: ReferScreen
    }
]
