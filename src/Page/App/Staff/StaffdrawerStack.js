import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import staffDashboard from '../Staff/staffDashboard';
import MemberReport from '../Staff/MemberReport/Member_Report';
import StaffCustomSideBar from '../Staff/StaffCustomSideBar';
import Attendance_Scanner from './Staff_Attendance_Scanner/Attendance_Scanner';
import Attendance from './Staff_Attendance/Attendance';
import Attendancedetails from './Staff_Attendance_Scanner/AttendanceDetails';
import staffmemberlist from '../Staff/Staff_staffMember/staffmemberlist';
import AddMembership from '../Staff/Staff_membership/AddMembership';
import AddGroup from '../Staff/Staff_group/AddGroup';
import AddMember from '../Staff/Staff_member/AddMember';
import AddActivity from '../Staff/Staff_activity/AddActivity';
import AddClass from '../Staff/Staff_classSchedule/AddClass';
import AddAssignWorkout from '../Staff/Staff_assignWorkout/AddAssignWorkout';
import AddnutritionSchedule from '../Staff/Staff_nutritionSchedule/AddnutritionSchedule';
import Addworkout from '../Staff/Staff_workout/Addworkout';
import Accountant from '../Staff/Staff_Accountant/Accountant';
import AddProduct from '../Staff/Staff_Product/AddProduct';
import AddStore from '../Staff/Staff_Store/AddStore';
import Message from '../Staff/Staff_Message/Message';
import Notice from '../Staff/Staff_Notice/Notice';
import AddReservation from '../Staff/Staff_Reservation/AddReservation';
import staffaccount from '../Staff/Staff_account/staffaccount';
import SubscriptionHistory from '../Staff/Staff_subscriptionHistory/SubscriptionHistory';

const { width, height } = Dimensions.get('screen');


const StaffDashboard_StackNavigator = createStackNavigator({
    First: { screen: staffDashboard }
});
const MemberReport_StackNavigator = createStackNavigator({
    MemberReport: { screen: MemberReport }
});
const Attendance_StackNavigator = createStackNavigator({
    Attendance: { screen: Attendance },
});
const AttendanceScanner_StackNavigator = createStackNavigator({
    Attendance_Scanner: { screen: Attendance_Scanner },
    Attendancedetails: { screen: Attendancedetails }
});
const staffmemberlist_StackNavigator = createStackNavigator({
    staffmemberlist: { screen: staffmemberlist },
});
const Membership_StackNavigator = createStackNavigator({
    AddMembership: { screen: AddMembership },
});
const Group_StackNavigator = createStackNavigator({
    AddGroup: { screen: AddGroup },
});
const Member_StackNavigator = createStackNavigator({
    AddMember: { screen: AddMember },
});
const Activity_StackNavigator = createStackNavigator({
    AddActivity: { screen: AddActivity },
});
const ClassSchedule_StackNavigator = createStackNavigator({
    AddClass: { screen: AddClass },
});
const AssignWorkout_StackNavigator = createStackNavigator({
    AddAssignWorkout: { screen: AddAssignWorkout },
});
const NutritionSchedule_StackNavigator = createStackNavigator({
    AddnutritionSchedule: { screen: AddnutritionSchedule },
});
const Workout_StackNavigator = createStackNavigator({
    Addworkout: { screen: Addworkout },
});
const Accountant_StackNavigator = createStackNavigator({
    Accountant: { screen: Accountant },
});
const Product_StackNavigator = createStackNavigator({
    AddProduct: { screen: AddProduct },
});
const Store_StackNavigator = createStackNavigator({
    AddStore: { screen: AddStore },
});
const Message_StackNavigator = createStackNavigator({
    Message: { screen: Message },
});
const Notice_StackNavigator = createStackNavigator({
    Notice: { screen: Notice },
});
const Reservation_StackNavigator = createStackNavigator({
    AddReservation: { screen: AddReservation },
});
const staffaccount_StackNavigator = createStackNavigator({
    staffaccount: { screen: staffaccount },
});
const SubscriptionHistory_StackNavigator = createStackNavigator({
    SubscriptionHistory: { screen: SubscriptionHistory },
});
const StaffDrawerNavigator = createDrawerNavigator(
    {
        staffDashboard: { screen: StaffDashboard_StackNavigator },
        MemberReport: { screen: MemberReport_StackNavigator },
        Attendance: { screen: Attendance_StackNavigator },
        Attendance_Scanner: { screen: AttendanceScanner_StackNavigator },
        staffmemberlist: { screen: staffmemberlist_StackNavigator },
        AddMembership: { screen: Membership_StackNavigator },
        AddGroup: { screen: Group_StackNavigator },
        AddMember: { screen: Member_StackNavigator },
        AddActivity: { screen: Activity_StackNavigator },
        AddClass: { screen: ClassSchedule_StackNavigator },
        AddAssignWorkout: { screen: AssignWorkout_StackNavigator },
        AddnutritionSchedule: { screen: NutritionSchedule_StackNavigator },
        Addworkout: { screen: Workout_StackNavigator },
        Accountant: { screen: Accountant_StackNavigator },
        AddProduct: { screen: Product_StackNavigator },
        AddStore: { screen: Store_StackNavigator },
        Message: { screen: Message_StackNavigator },
        Notice: { screen: Notice_StackNavigator },
        AddReservation: { screen: Reservation_StackNavigator },
        staffaccount: { screen: staffaccount_StackNavigator },
        SubscriptionHistory: { screen: SubscriptionHistory_StackNavigator },

    },
    {
        contentComponent: StaffCustomSideBar,
        drawerWidth: width - 75,

    });

export default createAppContainer(StaffDrawerNavigator);

const styles = StyleSheet.create({
    DrawerLogoPart: {
        marginTop: 80,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    DrawerLogo: {
        height: 120,
        width: 120,
        marginLeft: 5
    },
    DrawerLogoText: {
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 10,
        opacity: 0.8,
    }
});