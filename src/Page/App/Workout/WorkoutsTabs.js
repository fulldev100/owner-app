import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AddWorkout from './AddWorkout.js';
import ViewWorkout from './ViewWorkout.js';
import { t } from '../../../../locals';

/** Tab navigation page of bookings tab */
const TabNavigator = createMaterialTopTabNavigator(
	{
		PendingQuotation: {
			screen: AddWorkout,
			navigationOptions: {
				title: t("Add Workout")
			}
		},
		BookingStatus: {
			screen: ViewWorkout,
			navigationOptions: {
				title: t("View Workout")
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

