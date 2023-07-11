import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import * as SecureStore from 'expo-secure-store';
import { t } from "../../../locals";
import styleCss from "../../style";

//Redux
import { connect } from "react-redux";
import { fetchAccessright, loadingStart } from "../redux/actions/sidebarMenu";
import { fetchUserdetails, Logoutmember } from "../redux/actions/auth";
class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffView: "",
      membershipView: "",
      groupView: "",
      memberView: "",
      activityView: "",
      scheduleView: "",
      assignworkoutView: "",
      nutritionView: "",
      workoutView: "",
      paymentView: "",
      messageView: "",
      noticeView: "",
      accountView: "",
      subscriptionView: "",
      ImageLoading: false,
      dataSource: [],
      user_image: "",
      First_Name: "",
      Last_Name: "",
      user_Address: "",
      user_City: "",
    };
  }

  async componentDidMount() {
    this.accessRights();
    this.singleMember();
  }

  logout = async () => {
    Alert.alert(t("Gym App"), t("Are you sure you want to exit app?"), [
      {
        text: t("No"),
        onPress: () => this.props.navigation.navigate("Dashboard"),
        style: "cancel",
      },
      { text: t("Yes"), onPress: () => this.memberLogout()},
    ]);
    // await SecureStore.deleteItemAsync("userid");
    // await SecureStore.deleteItemAsync("access_token");
  };

  async memberLogout() {
    const { Logoutmember, loadingStart } = this.props;
    const { navigate } = this.props.navigation;
    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const userData = {
      "current_user_id": Id,
      "access_token": Token,
    };
    Logoutmember(userData, navigate);
  }

  /** Open / sidebar_Close sidemenu */
  toggleDrawer = (navigation) => {
    // this.props.navigation.closeDrawer();
    this.props.navigation.navigate("CustomSideBar");
  };

  async singleMember() {
    const { fetchUserdetails, loadingStart } = this.props;
    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const userData = {
      "member_id": Id,
      "access_token": Token,
    };
    fetchUserdetails(userData)
  }

  async accessRights() {
    const { fetchAccessright, loadingStart, userData } = this.props;

    const id = await SecureStore.getItemAsync("id");
    const data = {
      user_id: id,
    };
    loadingStart();
    fetchAccessright(data);
  }

  /** Design part of page */
  render() {
    const { navigate } = this.props.navigation;
    const { userData, staffView, membershipView, groupView, memberView, activityView, scheduleView, assignworkoutView, workoutView, paymentView, messageView, noticeView, accountView, subscriptionView } = this.props;
    return (
      <View style={styleCss.sidebar_container}>
        <StatusBar />
        <Row style={styleCss.sidebar_NavRow}>
          <Col style={styleCss.sidebar_NavColImg}>
            <TouchableOpacity
              style={styleCss.sidebar_back_arrow}
              // onPress={this.toggleDrawer.bind(this)}
              onPress={() => navigate("Dashboard")}
            >
              <Image
                source={require("../../images/Close-white-512.png")}
                style={styleCss.sidebar_Close}
              />
            </TouchableOpacity>
          </Col>
        </Row>
        <TouchableOpacity
          style={styleCss.sidebar_ProfileRow}
          onPress={() => navigate("Account")}
        >
          <Row>
            <Col style={styleCss.sidebar_ProfileContainer}>
              <Row style={styleCss.sidebar_ProfileContainer_row}>
                <Image
                  onLoadStart={(e) => this.setState({ ImageLoading: true })}
                  source={
                    userData.member_image
                      ? { uri: userData.member_image }
                      : null
                  }
                  onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                  style={styleCss.sidebar_UserProfile}
                />
                <ActivityIndicator
                  style={styleCss.loading}
                  animating={this.state.ImageLoading}
                  size="small"
                  color="#102b46"
                />
              </Row>
            </Col>
            <Col>
              <Row style={styleCss.sidebar_ProfileName}>
                <Text numberOfLines={1} style={styleCss.sidebar_sideNavText}>
                  {userData.first_name} {userData.last_name}
                </Text>
              </Row>
              {userData.address && userData.city != null ? (
                <Row>
                  <Text numberOfLines={1} style={styleCss.sidebar_address_text}>
                    {userData.address} , {userData.city}
                  </Text>
                </Row>
              ) : (
                <View></View>
              )}
            </Col>
          </Row>
        </TouchableOpacity>

        <Col style={styleCss.sidebar_menu_col}>
          <ScrollView>
            <TouchableOpacity onPress={() => navigate("Dashboard")}>
              <Row style={styleCss.sidebar_DrawerRow}>
                <Col style={styleCss.sidebar_DrawerIcons}>
                  <Image
                    source={require("../../images/Dashboard-White.png")}
                    style={styleCss.sidebar_Close}
                  ></Image>
                </Col>
                <Col>
                  <Text style={styleCss.sidebar_sideNavSubText}>
                    {t("Dashboard")}
                  </Text>
                </Col>
              </Row>
            </TouchableOpacity>

            {staffView == 1 ? (
              <TouchableOpacity onPress={() => navigate("StaffMemberList")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Staff-Member-white.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Staff Member")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {membershipView == 1 ? (
              <TouchableOpacity onPress={() => navigate("MemberShipList")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Membership-Type-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Membership Type")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {groupView == 1 ? (
              <TouchableOpacity onPress={() => navigate("products")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Fees-Payment-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_ProductsText}>
                      {t("Products")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {groupView == 1 ? (
              <TouchableOpacity onPress={() => navigate("history")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/DOB.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_ProductsText}>
                      {t("History")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {groupView == 1 ? (
              <TouchableOpacity onPress={() => navigate("groupList")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Group-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Group")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {memberView == 1 ? (
              <TouchableOpacity onPress={() => navigate("memberArea")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Staff-Member-white.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Member")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {activityView == 1 ? (
              <TouchableOpacity onPress={() => navigate("ActivityList")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Class-Schedule-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Activity")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {scheduleView == 1 ? (
              <TouchableOpacity onPress={() => navigate("Schedule")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Date.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Class Schedule")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {scheduleView == 1 ? (
              <TouchableOpacity onPress={() => navigate("Booking")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Date.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Class Booking")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {assignworkoutView == 1 ? (
              <TouchableOpacity onPress={() => navigate("AssignWorkoutsList")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Workout-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Assign Workouts")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {workoutView == 1 ? (
              <TouchableOpacity onPress={() => navigate("Workouts")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Workout-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Workouts")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            <TouchableOpacity onPress={() => navigate("addmeasurement")}>
              <Row style={styleCss.sidebar_DrawerRow}>
                <Col style={styleCss.sidebar_DrawerIcons}>
                  <Image
                    source={require("../../images/Measurement-white.png")}
                    style={styleCss.sidebar_Close}
                  ></Image>
                </Col>
                <Col>
                  <Text style={styleCss.sidebar_sideNavSubText}>
                    {t("Measurement")}
                  </Text>
                </Col>
              </Row>
            </TouchableOpacity>

            {paymentView == 1 ? (
              <TouchableOpacity onPress={() => navigate("Feespayment")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Fees-Payment-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Fee Payment")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {messageView == 1 ? (
              <TouchableOpacity onPress={() => navigate("Message")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Message-white.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Message")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {noticeView == 1 ? (
              <TouchableOpacity onPress={() => navigate("Notice")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Notice-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Notice")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            <TouchableOpacity onPress={() => navigate("Nutritionplan")}>
              <Row style={styleCss.sidebar_DrawerRow}>
                <Col style={styleCss.sidebar_DrawerIcons}>
                  <Image
                    source={require("../../images/Nutrition-White.png")}
                    style={styleCss.sidebar_Close}
                  ></Image>
                </Col>
                <Col>
                  <Text style={styleCss.sidebar_sideNavSubText}>
                    {t("Nutrition Schedule")}
                  </Text>
                </Col>
              </Row>
            </TouchableOpacity>

            {accountView == 1 ? (
              <TouchableOpacity onPress={() => navigate("Account")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Account-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Account")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            {subscriptionView == 1 ? (
              <TouchableOpacity onPress={() => navigate("SubscriptionHistory")}>
                <Row style={styleCss.sidebar_DrawerRow}>
                  <Col style={styleCss.sidebar_DrawerIcons}>
                    <Image
                      source={require("../../images/Subscription-White.png")}
                      style={styleCss.sidebar_Close}
                    ></Image>
                  </Col>
                  <Col>
                    <Text style={styleCss.sidebar_sideNavSubText}>
                      {t("Subscription History")}
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            <TouchableOpacity onPress={() => this.logout()}>
              <Row style={styleCss.sidebar_DrawerRow}>
                <Col style={styleCss.sidebar_DrawerIcons}>
                  <Image
                    source={require("../../images/Logout-white.png")}
                    style={styleCss.sidebar_Close}
                  ></Image>
                </Col>
                <Col>
                  <Text style={styleCss.sidebar_sideNavSubText}>
                    {t("Logout")}
                  </Text>
                </Col>
              </Row>
            </TouchableOpacity>
          </ScrollView>
        </Col>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staffView: state.sidebarMenu.staffView,
    membershipView: state.sidebarMenu.datamembershipView,
    groupView: state.sidebarMenu.groupView,
    memberView: state.sidebarMenu.memberView,
    activityView: state.sidebarMenu.activityView,
    scheduleView: state.sidebarMenu.scheduleView,
    assignworkoutView: state.sidebarMenu.assignworkoutView,
    nutritionView: state.sidebarMenu.nutritionView,
    workoutView: state.sidebarMenu.workoutView,
    paymentView: state.sidebarMenu.paymentView,
    messageView: state.sidebarMenu.messageView,
    noticeView: state.sidebarMenu.noticeView,
    accountView: state.sidebarMenu.accountView,
    subscriptionView: state.sidebarMenu.subscriptionView,
    loading: state.sidebarMenu.loading,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = {
  fetchAccessright,
  fetchUserdetails,
  Logoutmember,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSidebarMenu);


// import { Text, View } from "react-native";

// export default function App() {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   );
// }
