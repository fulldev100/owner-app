import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  FlatList,
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import { Calendar } from "react-native-calendars";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { ListItem } from "native-base";
import {
  viewMemberAttendanceListAction,
} from "../../../util/action.js";
import moment from "moment";
import { t } from "../../../../locals";
import DropdownAlert from "react-native-dropdownalert";
import styleCss from "../../../style";
const today = moment().format("YYYY-MM-DD");
import * as SecureStore from 'expo-secure-store';

//Redux
import { connect } from "react-redux";
import {
  fetchAllClass,
  fetchMemberAttendace,
  loadingStart,
} from "../../redux/actions/member";
class Attendances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      date: "",
      selectedDate: "",
      attendancedata: [],
      collapsed: false,
      markedDay: {},
      selecttitle: t("Select Class"),
    };
  }
  toggleDrawer = ({ navigation }) => {
    this.props.navigation.toggleDrawer();
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };
  componentDidMount() {
    this.ClassList();
  }

  onRefresh() {
    this.ClassList();
  }
  async ClassList() {
    const { fetchAllClass, loadingStart } = this.props;

    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    
    const params = {
      current_user_id: Id,
      access_token: Token,
    };

    //Redux action call to fetch class data
    fetchAllClass(params);
  }

  async viewMemberAttendance(cid = null, cname = null) {
    this.setState({ selecttitle: cname });
    this.setState({ attendancedata: [] });

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      member_id: Id,
      end_date: today,
      current_user_id: Id,
      access_token: Token,
      class_id: cid,
    };
    this.setState({ collapsed: false });
    viewMemberAttendanceListAction(params).then((responseJson) => {
      if (responseJson.status == 1) {
        this.setState({
          attendancedata: responseJson.result,
        });
        this.setState({ markedDay: this.setDates() });
        this.dropdown.alertWithType(
          "success",
          t("Success"),
          responseJson.error
        );
      } else {
        this.dropdown.alertWithType("error", t("Error"), responseJson.error);
      }
    });
  }
  setDates() {
    let markedDay = {};
    Object.entries(this.state.attendancedata).map((item) => {
      var d = item[1].date;
      if (item[1].status === "Absent") {
        markedDay[d] = { marked: true, dotColor: "red" };
      } else {
        markedDay[d] = { marked: true, dotColor: "green" };
      }
    });

    return markedDay;
  }
  renderItem = ({ item }) => {
    return (
      <View style={styleCss.container}>
        <CollapseBody style={styleCss.attendance_collapse_body}>
          <ListItem style={styleCss.attendance_body_list}>
            <TouchableOpacity
              style={styleCss.attendance_body_item}
              onPress={() => {
                this.viewMemberAttendance(item.class_id, item.class_name);
              }}
            >
              <Text style={styleCss.attendance_body_item_text}>
                {item.class_name}
              </Text>
            </TouchableOpacity>
          </ListItem>
        </CollapseBody>
      </View>
    );
  };

  render() {
    const { userData, allClassList, attendanceData, loading } = this.props;
    const { collapsed } = this.state;
    if (!loading) {
      return (
        <View style={styleCss.attendance_container}>
          <Row style={styleCss.attendance_name_col}>
            <Text style={styleCss.attendance_name_text}>
              {userData.first_name} {userData.last_name}
            </Text>
          </Row>

          <Collapse
            isCollapsed={this.state.collapsed}
            onToggle={(isCollapsed) =>
              this.setState({ collapsed: !this.state.collapsed })
            }
            style={{
              borderWidth: 1,
              borderColor: "#102b46",
              borderRadius: 5,
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "5%",
            }}
          >
            {collapsed == true ? (
              <CollapseHeader>
                <Row style={styleCss.attendance_collapse_row}>
                  <Col style={styleCss.attendance_collapse_text_col}>
                    <Text style={styleCss.attendance_collapse_text}>
                      {this.state.selecttitle}
                    </Text>
                  </Col>
                  <Col style={styleCss.attendance_collapse_image_col}>
                    <Image
                      style={styleCss.attendance_collapse_image}
                      source={require("../../../images/down-arrow.png")}
                    />
                  </Col>
                </Row>
              </CollapseHeader>
            ) : (
              <CollapseHeader>
                <Row style={styleCss.attendance_collapse_row}>
                  <Col style={styleCss.attendance_collapse_text_col}>
                    <Text style={styleCss.attendance_ClassText}>
                      {this.state.selecttitle}
                    </Text>
                  </Col>
                  <Col style={styleCss.attendance_collapse_image_col}>
                    <Image
                      style={styleCss.attendance_collapse_image}
                      source={require("../../../images/right-arrow.png")}
                    />
                  </Col>
                </Row>
              </CollapseHeader>
            )}
            <CollapseBody style={styleCss.attendance_collapse_body}>
              <FlatList
                data={allClassList}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.class_id.toString()}
                ListEmptyComponent={
                  <EmptyComponent
                    title={t("Data not available")}
                    style={{ color: "white" }}
                  />
                }
              />
            </CollapseBody>
          </Collapse>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={["#102b46"]}
                refreshing={this.state.loading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          >
            <Calendar
              monthFormat={"MMMM, yyyy"}
              theme={{
                textSectionTitleColor: "#b6c1cd",
                textSectionTitleDisabledColor: "#102b46",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00adf5",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "white",
                arrowColor: "#102b46",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#102b46",
                indicatorColor: "#102b46",
                textDayFontFamily: "Poppins-Medium",
                textMonthFontFamily: "Poppins-SemiBold",
                textDayHeaderFontFamily: "Poppins-Medium",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
              markedDates={
                (this.state.markedDay)
              }
              maxDate={today}
            />
            <Row style={styleCss.attendance_row}>
              <Col style={styleCss.attendance_image_col}>
                <Col style={styleCss.attendance_image_css}></Col>
              </Col>
              <Col style={styleCss.attendance_col}>
                <Text style={styleCss.attendance_image_col_text}>
                  {t("Presente")}
                </Text>
              </Col>
              <Col style={styleCss.attendance_image_col}>
                <Col style={styleCss.attendance_image_two_css}></Col>
              </Col>
              <Col style={styleCss.attendance_col}>
                <Text style={styleCss.attendance_image_col_text}>
                  {t("Absent")}
                </Text>
              </Col>
            </Row>
          </ScrollView>
          <DropdownAlert ref={(ref) => (this.dropdown = ref)} />
        </View>
      );
    } else {
      return (
        <ActivityIndicator
          style={styleCss.loading}
          size="large"
          color="#102b46"
        />
      );
    }
  }
}
const EmptyComponent = ({ title }) => (
  <View style={styleCss.emptyContainer}>
    <Text style={styleCss.emptyText}>{title}</Text>
  </View>
);

const mapStateToProps = (state) => {
  return {
    allClassList: state.member.allClassList,
    attendanceData: state.member.attendanceData,
    userData: state.auth.userData,
    loading: state.member.loading,
  };
};

const mapDispatchToProps = {
  fetchAllClass,
  fetchMemberAttendace,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Attendances);
