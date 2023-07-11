import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Profile from './Profile.js';
import Attendance from './Attendance.js';
import { t } from '../../../../locals';

/** Tab navigation page of bookings tab */
const TabNavigator = createMaterialTopTabNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: t("Profile")
            }
        },
        Attendance: {
            screen: Attendance,
            navigationOptions: {
                title: t("Attendance")
            }
        },
    }, {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        upperCaseLabel: false,
        activeTintColor: '#f1c40e',
        inactiveTintColor: '#fff',
        style: {
            backgroundColor: '#102b46',
        },
        labelStyle: {
            textAlign: 'center',
            fontSize: 15,
            fontFamily: 'Poppins-SemiBold'
        },
        indicatorStyle: {
            borderBottomColor: '#f1c40e',
            borderBottomWidth: 2,
        },
    },
}
)
export default createAppContainer(TabNavigator);

