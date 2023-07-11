import { t } from '../../../../locals';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ClassSchedule from './ClassSchedule.js';
import ClassList from './ClassList.js';

/** Tab navigation page of bookings tab */
const TabNavigator = createMaterialTopTabNavigator(
	{
		ClassSchedule: {
			screen: ClassSchedule,
			navigationOptions: {
				title: t("Class Schedule")
			}
		},
		ClassList: {
			screen: ClassList,
			navigationOptions: {
				title: t("Class List")
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
                fontFamily:'Poppins-SemiBold'
            },
            indicatorStyle: {
                borderBottomColor: '#f1c40e',
                borderBottomWidth: 2,
            },
        },
    }
)
export default createAppContainer(TabNavigator);

