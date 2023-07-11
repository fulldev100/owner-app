import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginPage from "./Page/Auth/LoginPage";
import RegistrationPage from "./Page/Auth/RegistrationPage";
// import Workouts from "./Page/App/StaffMember/staffmemberlist.js";
import Dashboard from "./Page/App/Dashboard";

import MemberShipList from "./Page/App/Membership/MemberShipList.js";
import ActivityList from "./Page/App/Activity/ActivityList";
import activityvideo from "./Page/App/Activity/activityvideo.js";
import Workouts from "./Page/App/Workout/Workouts.js";
import Schedule from "./Page/App/ClassSchedule/schedule.js";
import Booking from "./Page/App/ClassBooking/Booking.js";
import Nutritionplan from "./Page/App/NutritionPlan/nutritionplan.js";
import StaffMemberList from "./Page/App/StaffMember/staffmemberlist.js";
import Message from "./Page/App/Message/message.js";
import groupList from "./Page/App/Group/groupList.js";
import AssignWorkoutsList from "./Page/App/AssignWorkouts/AssignWorkoutsList.js";
import WorkoutsList from "./Page/App/AssignWorkouts/WorkoutsList.js";
import memberArea from "./Page/App/Member/memberArea.js";
import addmeasurement from "./Page/App/Measurement/addmeasurement.js";
import Feespayment from "./Page/App/FeesPayment/feespayment.js";
import viewpayment from "./Page/App/FeesPayment/viewpayment.js";
import viewinvoice from "./Page/App/FeesPayment/viewinvoice.js";
import Account from "./Page/App/Account/account.js";
import SubscriptionHistory from "./Page/App/SubscriptionHistory/subscriptionhistory.js";
import nutritionschudule from "./Page/App/NutritionPlan/nutritionschudule.js";
import Notice from "./Page/App/Notice/showNotices.js";
import CustomSideBar from "./Page/App/CustomSideBar";

import staffDashboard from "./Page/App/Staff/staffDashboard";
import MemberReport from "./Page/App/Staff/MemberReport/Member_Report";
import Attendance_Scanner from "./Page/App/Staff/Staff_Attendance_Scanner/Attendance_Scanner";
import Attendance from "./Page/App/Staff/Staff_Attendance/Attendance";
import Attendancedetails from "./Page/App/Staff/Staff_Attendance_Scanner/AttendanceDetails";
import Addstaffmemberlist from "./Page/App/Staff/Staff_staffMember/staffmemberlist";
import AddMembership from "./Page/App/Staff/Staff_membership/AddMembership";
import AddGroup from "./Page/App/Staff/Staff_group/AddGroup";
import AddMember from "./Page/App/Staff/Staff_member/AddMember";
import AddActivity from "./Page/App/Staff/Staff_activity/AddActivity";
import AddClass from "./Page/App/Staff/Staff_classSchedule/AddClass";
import AddAssignWorkout from "./Page/App/Staff/Staff_assignWorkout/AddAssignWorkout";
import AddnutritionSchedule from "./Page/App/Staff/Staff_nutritionSchedule/AddnutritionSchedule";
import Addworkout from "./Page/App/Staff/Staff_workout/Addworkout";
import Accountant from "./Page/App/Staff/Staff_Accountant/Accountant";
import AddProduct from "./Page/App/Staff/Staff_Product/AddProduct";
import AddStore from "./Page/App/Staff/Staff_Store/AddStore";
import StaffMessage from "./Page/App/Staff/Staff_Message/Message";
import StaffNotice from "./Page/App/Staff/Staff_Notice/Notice";
import AddReservation from "./Page/App/Staff/Staff_Reservation/AddReservation";
import staffaccount from "./Page/App/Staff/Staff_account/staffaccount";
import StaffSubscriptionHistory from "./Page/App/Staff/Staff_subscriptionHistory/SubscriptionHistory";
import StaffCustomSideBar from "./Page/App/Staff/StaffCustomSideBar";

// import staffDrawer from "./Page/App/Staff/StaffdrawerStack";
import DropdownAlert from "react-native-dropdownalert";
import NetInfo from "@react-native-community/netinfo";
// import { createDrawerNavigator } from "react-navigation-drawer";
import ViewProducts from "./Page/App/Products/myProducts";
import ProductsList from "./Page/App/Products/productList";
import History from "./Page/App/History/history";

// Simplify APP
import myHome from "./Page/App/Home/myHome";
import location from "./Page/App/Location/location";

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this.state = {
      Role_name: "",
      connection_status: true,
      connection_type: null,
      connection_net_reachable: false,
      connection_wifi_enabled: false,
      connection_details: null,
    };
    this._bootstrapAsync();
  }

  async componentDidMount() {
    // internet not connected alert code
    this.NetInfoSubscribtion = NetInfo.addEventListener(
      this._handleConnectivityChange
    );

    if (!this.state.connection_status) {
      this.dropdown.alertWithType(
        "error",
        "OH!!",
        "Sorry you're not connected to the Internet"
      );
    }
    this._bootstrapAsync();
  }

  _handleConnectivityChange = async (state) => {
    this.setState({
      connection_status: state.isConnected,
      connection_type: state.type,
      connection_net_reachable: state.isInternetReachable,
      connection_wifi_enabled: state.isWifiEnabled,
      connection_details: state.details,
    });
    if (this.state.connection_status) {
      const userToken = await SecureStore.getItemAsync("access_token");
    }
  };

  _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync("access_token");
    const role_name = await SecureStore.getItemAsync("role_name");
    if (this.state.connection_status) {
      if (userToken) {
        if (role_name == "member") {
          this.props.navigation.navigate("App");
        } else if (role_name == "staff_member") {
          this.props.navigation.navigate("Staff");
        } else {
          this.props.navigation.navigate("Auth");
        }
      } else {
        this.props.navigation.navigate("Auth");
      }
    }
  };

  render() {
    const { loader, mobile, connection_status } = this.state;
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.loader} size="large" color="#0f4471" />
        {connection_status == false ? (
          <DropdownAlert ref={(ref) => (this.dropdown = ref)} />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}

const DrawerNavigator = createStackNavigator(
  {
    Dashboard: Dashboard,
    MemberShipList: MemberShipList,
    ActivityList: ActivityList,
    activityvideo: activityvideo,
    Workouts: Workouts,
    Schedule: Schedule,
    Booking: Booking,
    Nutritionplan: Nutritionplan,
    StaffMemberList: StaffMemberList,
    Message: Message,
    groupList: groupList,
    AssignWorkoutsList: AssignWorkoutsList,
    WorkoutsList: WorkoutsList,
    memberArea: memberArea,
    addmeasurement: addmeasurement,
    Feespayment: Feespayment,
    viewpayment: viewpayment,
    viewinvoice: viewinvoice,
    Account: Account,
    SubscriptionHistory: SubscriptionHistory,
    nutritionschudule: nutritionschudule,
    Notice: Notice,
    CustomSideBar: CustomSideBar,
    products: ViewProducts,
    ProductsList: ProductsList,
    history: History,

    myHome: myHome,
    location: location,

  },
  {
    headerMode: "none",
    initialRouteName: "myHome",
    // contentComponent: CustomSideBar,

  }
);

const StaffStack = createStackNavigator(
  {
    staffDashboard: staffDashboard,
    MemberReport: MemberReport,
    Attendance_Scanner: Attendance_Scanner,
    Attendance: Attendance,
    Attendancedetails: Attendancedetails,
    Addstaffmemberlist: Addstaffmemberlist,
    AddMembership: AddMembership,
    AddGroup: AddGroup,
    AddMember: AddMember,
    AddActivity: AddActivity,
    AddClass: AddClass,
    AddAssignWorkout: AddAssignWorkout,
    AddnutritionSchedule: AddnutritionSchedule,
    Addworkout: Addworkout,
    Accountant: Accountant,
    AddProduct: AddProduct,
    AddStore: AddStore,
    StaffMessage: StaffMessage,
    StaffNotice: StaffNotice,
    AddReservation: AddReservation,
    staffaccount: staffaccount,
    StaffSubscriptionHistory: StaffSubscriptionHistory,
    StaffCustomSideBar:StaffCustomSideBar,
  },
  {
    headerMode: "none",
    initialRouteName: "staffDashboard",
    contentComponent: StaffCustomSideBar,
  }
);

// const StaffStack = createStackNavigator(
//   { staffDrawer: { screen: staffDrawer } },
//   {
//     headerMode: "none",
//     navigationOptions: {
//       headerVisible: false,
//     },
//   }
// );

const AuthStack = createStackNavigator({
  LoginPage: LoginPage,
  RegistrationPage: RegistrationPage,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: DrawerNavigator,
      Staff: StaffStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
