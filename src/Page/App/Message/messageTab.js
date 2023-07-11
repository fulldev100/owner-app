import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Inbox from './Inbox.js';
import InboxView from './InboxView.js';
import Compose from './Compose.js';
import Sent from './Sent.js';
import SentView from './SentView.js';
import { t } from '../../../../locals';

const Inbox_StackNavigator = createStackNavigator({
    Inbox: { screen: Inbox } ,
    InboxView: { screen: InboxView }
});

const Sent_StackNavigator = createStackNavigator({
    Sent: { screen: Sent } ,
    SentView: { screen: SentView }
});

/** Tab navigation page of bookings tab */
const TabNavigator = createMaterialTopTabNavigator(
	{
		Inbox: {screen: Inbox_StackNavigator,
			navigationOptions: {
				title: t("Inbox"),
			}
		},
		Compose: {
			screen: Compose,
			navigationOptions: {
				title: t("Compose")
			}
        },
        Sent: {
			screen: Sent_StackNavigator,
			navigationOptions: {
				title: t("Sent")
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
                fontFamily:'Poppins-SemiBold',
                fontWeight: '600'
            },
            indicatorStyle: {
                borderBottomColor: '#f1c40e',
                borderBottomWidth: 2,
            },
        },
    }
)
export default createAppContainer(TabNavigator);

