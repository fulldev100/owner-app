import { t } from '../../../../locals';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ClassBooking from './ClassBooking.js';
import BookingList from './BookingList';

/** Tab navigation page of bookings tab */
const TabNavigator = createMaterialTopTabNavigator(
	{
		ClassBooking: {
			screen: ClassBooking,
			navigationOptions: {
				title: t("Class Booking")
			}
		},
		BookingList: {
			screen: BookingList,
			navigationOptions: {
				title: t("Booking List")
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

