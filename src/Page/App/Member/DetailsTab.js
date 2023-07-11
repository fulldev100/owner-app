import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import PersonalDetails from './PersonalDetails.js';
import MembershipDetails from './MembershipDetails.js';
import { t } from '../../../../locals';

/** Tab navigation page of bookings tab */
const TabNavigator = createMaterialTopTabNavigator(
	{
		PersonalDetails: {
			screen: PersonalDetails,
			navigationOptions: {
				title: t("Personal Details")
			}
		},
		MembershipDetails: {
			screen: MembershipDetails,
			navigationOptions: {
				title: t("Membership Details")
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

