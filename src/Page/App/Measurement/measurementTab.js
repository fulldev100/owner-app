import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Measurementadd from './measurementadd';
import Measurementview from './measurementview';
import { t } from '../../../../locals';

/** Tab navigation page of bookings tab */
const TabNavigator = createMaterialTopTabNavigator(
    {
        Measurementadd: {
            screen: Measurementadd,
            navigationOptions: {
                title: t("Add Measurement")
            }
        },
        Measurementview: {
            screen: Measurementview,
            navigationOptions: {
                title: t("View Measurement")
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
            fontSize: 14,
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

