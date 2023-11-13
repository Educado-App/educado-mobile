import ProfileScreen from "../screens/drawer/Profile";
import SettingsScreen from "../screens/drawer/Settings";
import SavedScreen from "../screens/drawer/Saved";
import ReferScreen from "../screens/test/TestScreen";

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
