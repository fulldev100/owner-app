// import { StyleSheet, Dimensions } from "react-native";
// import { createAppContainer } from "react-navigation";
// import { createDrawerNavigator } from "react-navigation-drawer";
// import { createStackNavigator } from "react-navigation-stack";
// import CustomSideBar from "./CustomSideBar";
// import Dashboard from "./Dashboard.js";
// import MemberShipList from "./Membership/MemberShipList.js";
// import ActivityList from "./Activity/ActivityList";
// import activityvideo from "./Activity/activityvideo.js";
// import Workouts from "./Workout/Workouts.js";
// import Schedule from "./ClassSchedule/schedule.js";
// import Booking from "./ClassBooking/Booking.js";
// import Nutritionplan from "./NutritionPlan/nutritionplan.js";
// import StaffMemberList from "./StaffMember/staffmemberlist.js";
// import Message from "./Message/message.js";
// import groupList from "./Group/groupList.js";
// import AssignWorkoutsList from "./AssignWorkouts/AssignWorkoutsList.js";
// import WorkoutsList from "./AssignWorkouts/WorkoutsList.js";
// import memberArea from "./Member/memberArea.js";
// import addmeasurement from "./Measurement/addmeasurement.js";
// import Feespayment from "./FeesPayment/feespayment.js";
// import viewpayment from "./FeesPayment/viewpayment.js";
// import viewinvoice from "./FeesPayment/viewinvoice.js";
// import Account from "./Account/account.js";
// import SubscriptionHistory from "./SubscriptionHistory/subscriptionhistory.js";
// import nutritionschudule from "./NutritionPlan/nutritionschudule.js";
// import Notice from "./Notice/showNotices.js";
// const { width, height } = Dimensions.get("screen");

// // Member Dashboard Menu

// const Dashboard_StackNavigator = createStackNavigator({
//   First: { screen: Dashboard },
// });
// const MemberShipList_StackNavigator = createStackNavigator({
//   MemberShipList: { screen: MemberShipList },
// });
// const Workouts_StackNavigator = createStackNavigator({
//   Workouts: { screen: Workouts },
// });
// const schedule_StackNavigator = createStackNavigator({
//   Schedule: { screen: Schedule },
// });
// const Booking_StackNavigator = createStackNavigator({
//   Booking: { screen: Booking },
// });
// const nutritionplan_StackNavigator = createStackNavigator({
//   Nutritionplan: { screen: Nutritionplan },
//   nutritionschudule: { screen: nutritionschudule },
// });
// const StaffMemberList_StackNavigator = createStackNavigator({
//   StaffMemberList: { screen: StaffMemberList },
// });
// const activity_StackNavigator = createStackNavigator({
//   ActivityList: { screen: ActivityList },
//   activityvideo: { screen: activityvideo },
// });
// const message_StackNavigator = createStackNavigator({
//   Message: { screen: Message },
// });
// const groupList_StackNavigator = createStackNavigator({
//   groupList: { screen: groupList },
// });

// const AssignWorkoutsList_StackNavigator = createStackNavigator({
//   AssignWorkoutsList: { screen: AssignWorkoutsList },
//   WorkoutsList: { screen: WorkoutsList },
// });

// const Member_StackNavigator = createStackNavigator({
//   Member: { screen: memberArea },
// });

// const addmeasurement_StackNavigator = createStackNavigator({
//   addmeasurement: { screen: addmeasurement },
// });

// const Feespayment_StackNavigator = createStackNavigator({
//   Feespayment: { screen: Feespayment },
//   viewpayment: { screen: viewpayment },
//   viewinvoice: { screen: viewinvoice },
// });

// const Account_StackNavigator = createStackNavigator({
//   Account: { screen: Account },
// });

// const SubscriptionHistory_StackNavigator = createStackNavigator({
//   SubscriptionHistory: { screen: SubscriptionHistory },
// });

// const notices_StackNavigator = createStackNavigator({
//   Notice: { screen: Notice },
// });

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Dashboard: { screen: Dashboard_StackNavigator },
//     MemberShipList: { screen: MemberShipList_StackNavigator },
//     Workouts: { screen: Workouts_StackNavigator },
//     Schedule: { screen: schedule_StackNavigator },
//     Booking: { screen: Booking_StackNavigator },
//     Nutritionplan: { screen: nutritionplan_StackNavigator },
//     StaffMemberList: { screen: StaffMemberList_StackNavigator },
//     Message: { screen: message_StackNavigator },
//     groupList: { screen: groupList_StackNavigator },
//     AssignWorkoutsList: { screen: AssignWorkoutsList_StackNavigator },
//     activitylist: { screen: activity_StackNavigator },
//     addmeasurement: { screen: addmeasurement_StackNavigator },
//     Feespayment: { screen: Feespayment_StackNavigator },
//     Account: { screen: Account_StackNavigator },
//     SubscriptionHistory: { screen: SubscriptionHistory_StackNavigator },
//     Member: { screen: Member_StackNavigator },
//     Notice: { screen: notices_StackNavigator },
//   },
//   {
//     contentComponent: CustomSideBar,
//     drawerWidth: width - 75,
//   }
// );

// // export default createAppContainer(DrawerNavigator);

// // const styles = StyleSheet.create({
// //   DrawerLogoPart: {
// //     marginTop: 80,
// //     height: 150,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   DrawerLogo: {
// //     height: 120,
// //     width: 120,
// //     marginLeft: 5,
// //   },
// //   DrawerLogoText: {
// //     color: "#FFFFFF",
// //     fontSize: 20,
// //     marginTop: 10,
// //     opacity: 0.8,
// //   },
// // });

// export default createDrawerNavigator(
//   {
//     Dashboard: { screen: Dashboard_StackNavigator },
//     MemberShipList: { screen: MemberShipList_StackNavigator },
//     Workouts: { screen: Workouts_StackNavigator },
//     Schedule: { screen: schedule_StackNavigator },
//     Booking: { screen: Booking_StackNavigator },
//     Nutritionplan: { screen: nutritionplan_StackNavigator },
//     StaffMemberList: { screen: StaffMemberList_StackNavigator },
//     Message: { screen: message_StackNavigator },
//     groupList: { screen: groupList_StackNavigator },
//     AssignWorkoutsList: { screen: AssignWorkoutsList_StackNavigator },
//     activitylist: { screen: activity_StackNavigator },
//     addmeasurement: { screen: addmeasurement_StackNavigator },
//     Feespayment: { screen: Feespayment_StackNavigator },
//     Account: { screen: Account_StackNavigator },
//     SubscriptionHistory: { screen: SubscriptionHistory_StackNavigator },
//     Member: { screen: Member_StackNavigator },
//     Notice: { screen: notices_StackNavigator },
//   }, 
//   {
//     initialRouteName: 'Dashboard',
//     contentComponent: CustomSideBar,
//     drawerWidth: width - 75,
//   }
//   );


import { View,} from "react-native";
export default function App() {
  return (
    <View>
      Hello
    </View>
  );
}
