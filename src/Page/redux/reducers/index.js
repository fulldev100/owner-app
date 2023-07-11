import { combineReducers } from 'redux';
import { auth } from './auth';
import { sidebarMenu } from './sidebarMenu';
import { dashboard } from './dashboard';
import { booking } from './booking';
import { staffMember } from './staffMember';
import { membershipType } from './membershipType';
import { groupList } from './groupList';
import { activity } from './activity';
import { feesPayment } from './feesPayment';
import { notice } from './notice';
import { measurement } from './measurement';
import { nutrition } from './nutrition';
import { subscription } from './subscription';
import { message } from './message';
import { inboxMessage } from './inboxMessage';
import { attendance } from './attendance';
import { staffDashboard } from './staffDashboard';
import { report } from './report';
import { classSchedule } from './classSchedule';
import { assignedWorkout } from './assignedWorkout';
import { workout } from './workout';
import { member } from './member';
import { history } from './history';
import { product } from './product';
import { productList } from './productList';
import { home } from './home';

const rootReducer = combineReducers({
    auth,
    sidebarMenu,
    dashboard,
    booking,
    staffMember,
    membershipType,
    groupList,
    activity,
    feesPayment,
    notice,
    measurement,
    nutrition,
    subscription,
    message,
    inboxMessage,
    classSchedule,
    assignedWorkout,
    attendance,
    staffDashboard,
    classSchedule,
    report,
    workout,
    member,
    history,
    product,
    productList,
    home
});

export default rootReducer;