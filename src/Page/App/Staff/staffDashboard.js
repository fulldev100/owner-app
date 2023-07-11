import React, { Component } from "react";
import {
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StatusBar,
} from "react-native";
import * as SecureStore from 'expo-secure-store';;
import { Col, Row } from "react-native-easy-grid";
import { NavigationEvents } from "react-navigation";
import { Calendar } from "react-native-calendars";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { t } from "../../../../locals";
import normalize from "react-native-normalize";
import styleCss from "../../../style";
import { connect } from "react-redux";
import { fetchActivitylist, fetchGrouplist, loadingStart, fetchMembershiplist, fetchReservationList, fetchClassList } from '../../redux/actions/staffDashboard';
const today = moment().format("YYYY-MM-DD");

import moment from "moment";
class StaffDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      collapsed: false,
      two_collapsed: false,
      three_collapsed: false,
      four_collapsed: false,
      five_collapsed: false,
      six_collapsed: false,

    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  toggleDrawer = ({ navigation }) => {
    this.props.navigation.toggleDrawer();
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ loader: true })
    this.ActivityList();
    this.groupList();
    this.memberShipList();
    this.reservationList();
    this.classList();

    this.setState({ loader: false })
  }

  async ActivityList() {
    const { fetchActivitylist, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const Data = {
      "current_user_id": Id,
      "access_token": Token,
    };
    fetchActivitylist(Data)
  }

  async groupList() {
    const { fetchGrouplist, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const Data = {
      "current_user_id": Id,
      "access_token": Token,
    };
    fetchGrouplist(Data)
  }

  async memberShipList() {
    const { fetchMembershiplist, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const Data = {
      "current_user_id": Id,
      "access_token": Token,
    };
    fetchMembershiplist(Data)
  }

  async reservationList() {
    const { fetchReservationList, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const Data = {
      "current_user_id": Id,
      "access_token": Token,
    };
    fetchReservationList(Data)
  }

  async classList() {
    const { fetchClassList, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const Data = {
      "current_user_id": Id,
      "access_token": Token,
    };
    fetchClassList(Data)
  }

  onRefresh() {
    this.ActivityList();
    this.groupList();
    this.memberShipList();
    this.reservationList();
    this.classList();
  }


  render() {
    const { collapsed, two_collapsed, three_collapsed, four_collapsed, five_collapsed } = this.state;
    const {activitiSource, grouplistSource, membershiplistSource, reservationListSource, classListSource, loading} = this.props
    if (!loading) {
      return (
        <View style={styleCss.container}>
          <Row style={styleCss.NaveBar}>
            <Col>
              <TouchableOpacity style={styleCss.menu_col} 
              onPress={() => this.props.navigation.navigate("StaffCustomSideBar")}>
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Menu-white.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col
              style={styleCss.dashboard_NaveBar_text_col}
            >
              <Text style={styleCss.NaveText}>{t("Dashboard")}</Text>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Attendance_Scanner")}
                style={styleCss.workout_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/barcode-scanner.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("StaffMessage")}
                style={styleCss.message_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Message-white.png")}
                />
              </TouchableOpacity>
            </Col>
          </Row>

          <ScrollView
            refreshControl={
              <RefreshControl
                colors={["#102b46"]}
                refreshing={loading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          >
            <Row style={styleCss.dashboard_menu_row}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddMember")}
                style={styleCss.dashboard_workout_menu}
              >
                <Col style={styleCss.dashboard_workout_image_col}>
                  <Row
                    style={styleCss.dashboard_workout_image_row}
                  >
                    <Image
                      style={styleCss.dashboard_workout_image}
                      source={require("../../../images/staff-Member.png")}
                    />
                  </Row>
                  <Row>
                    <Text
                      style={styleCss.dashboard_workout_text}
                    >
                      {t("Member")}
                    </Text>
                  </Row>
                </Col>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("StaffNotice")}
                style={styleCss.dashboard_schedule_menu}
              >
                <Col style={styleCss.dashboard_schedule_image_col}>
                  <Row
                    style={styleCss.dashboard_schedule_image_row}
                  >
                    <Image
                      style={styleCss.dashboard_schedule_image}
                      source={require("../../../images/Notice-blue.png")}
                    />
                  </Row>
                  <Row>
                    <Text
                      style={styleCss.dashboard_schedule_text}
                    >
                      {t("Notice")}
                    </Text>
                  </Row>
                </Col>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddMembership")}
                style={styleCss.dashboard_booking_menu}
              >
                <Col style={styleCss.dashboard_booking_col}>
                  <Row
                    style={styleCss.dashboard_booking_row}
                  >
                    <Image
                      style={styleCss.dashboard_booking_image}
                      source={require("../../../images/staff-Membership-card.png")}
                    />
                  </Row>
                  <Row>
                    <Text
                      style={styleCss.dashboard_booking_text}
                    >
                      {t("Membership")}
                    </Text>
                  </Row>
                </Col>
              </TouchableOpacity>
            </Row>

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
                selectedDotColor: "#ffffff",
                arrowColor: "#102b46",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#102b46",
                indicatorColor: "#102b46",
                textDayFontFamily: "Poppins-Medium",
                textMonthFontFamily: "Poppins-SemiBold",
                textDayHeaderFontFamily: "Poppins-Medium",
                textDayFontSize: 13,
                textMonthFontSize: 17,
                textDayHeaderFontSize: 13,
              }}
              markedDates={{
                [today]: {
                  selected: true,
                  selectedColor: "#102b46",
                  selectedborderColor: "yellow",
                  selectedborderWidth: 1,
                },
              }}
            />

            <TouchableOpacity style={{ borderWidth: 1, borderColor: "#102b46", borderRadius: 5, marginLeft: "5%", marginRight: "5%", marginBottom: "5%", }} onPress={() => this.props.navigation.navigate("MemberReport")}>
              <Row
                style={{
                  paddingLeft: "5%",
                  height: 45,
                  backgroundColor: "#102b46",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col style={{ width: "90%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-SemiBold",
                      color: "#ffffff",
                    }}
                  >
                    {t("Reports")}
                  </Text>
                </Col>
                <Col style={{ width: "10%" }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../../images/Icon-open-external-link.png")}
                  />
                </Col>
              </Row>
            </TouchableOpacity>

            <Col
              style={{
                borderWidth: 1,
                borderColor: "#102b46",
                borderRadius: 5,
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            >
              <Collapse
                isCollapsed={this.state.collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ collapsed: !this.state.collapsed })
                }
              >
                {collapsed == true ? (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Activities")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Activities")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                <CollapseBody>
                  {activitiSource.length !== 0 ?
                    (
                      <View>
                        {activitiSource.map((ActivitiData, index) => (
                          <Col key={index}
                            style={{
                              paddingTop: normalize(10),
                              backgroundColor: "#102b46",
                              paddingBottom: normalize(10),
                            }}
                          >
                            <Row
                              style={{
                                paddingLeft: "5%",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: "Poppins-SemiBold",
                                  color: "#ffffff",
                                }}
                              >
                                {ActivitiData.activity_title}
                              </Text>
                            </Row>
                            <Row style={{
                              marginLeft: "5%",
                              marginRight: "5%",
                            }}>
                              <Col style={{ width: normalize(130) }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                    color: "#8795A2",
                                  }}
                                >
                                  {t("Trainer")} :
                                </Text>
                              </Col>
                              <Col>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                    color: "#8795A2",
                                  }}
                                >
                                  {ActivitiData.activity_trainer}
                                </Text>
                              </Col>
                            </Row>
                            <Row style={{
                              marginLeft: "5%",
                              marginRight: "5%",
                            }}>
                              <Col style={{ width: normalize(130) }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                    color: "#8795A2",
                                  }}
                                >
                                  {t("Category")} :
                                </Text>
                              </Col>
                              <Col>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                    color: "#8795A2",
                                  }}
                                >
                                  {ActivitiData.activity_category}
                                </Text>
                              </Col>
                            </Row>
                            <Row
                              style={{
                                paddingLeft: "5%",
                                paddingRight: "5%",
                              }}
                            >
                              <Col style={{ width: normalize(130) }}>
                                <Text
                                  style={{
                                    fontSize: 13,
                                    fontFamily: "Poppins-Regular",
                                    color: "#8795A2",
                                  }}
                                >
                                  {t("Membership List")} :
                                </Text>
                              </Col>
                              <Col>
                                <Text
                                  style={{
                                    fontSize: 13,
                                    fontFamily: "Poppins-Regular",
                                    color: "#8795A2",
                                  }}
                                >
                                  {ActivitiData.membership_list}
                                </Text>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </View>
                    ) : (
                      <View style={{ borderTopWidth: 1, borderColor: "#fff" }}>
                        <Row
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: 170,
                            backgroundColor: "#102B46",
                          }}
                        >
                          <Text style={{ fontSize: 20, color: "#fff" }}>
                            {t("Record not available")}
                          </Text>
                        </Row>
                      </View>
                    )}
                </CollapseBody>
              </Collapse>
            </Col>

            <Col
              style={{
                borderWidth: 1,
                borderColor: "#102b46",
                borderRadius: 5,
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            >
              <Collapse
                isCollapsed={this.state.two_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ two_collapsed: !this.state.two_collapsed })
                }
              >
                {two_collapsed == true ? (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Group List")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Group List")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                <CollapseBody>
                  {grouplistSource.length !== 0 ? (
                    <View>
                      {grouplistSource.map((groupData, index) => (
                        <Col key={index}
                          style={{
                            paddingTop: normalize(10),
                            backgroundColor: "#102b46",
                          }}
                        >
                          <Row
                            style={{
                              paddingLeft: "5%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins-SemiBold",
                                color: "#ffffff",
                              }}
                            >
                              {groupData.group_name}
                            </Text>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Description")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {groupData.group_description}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            // borderBottomWidth: 1,
                            marginLeft: "5%",
                            marginRight: "5%",
                            // borderBottomColor: "#5E6E7E",
                            paddingBottom: normalize(10),
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Total Member")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {groupData.total_group_member}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </View>
                  ) : (
                    <View style={{ borderTopWidth: 1, borderColor: "#fff" }}>
                      <Row
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 170,
                          backgroundColor: "#102B46",
                        }}
                      >
                        <Text style={{ fontSize: 20, color: "#fff" }}>
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}

                </CollapseBody>
              </Collapse>
            </Col>

            <Col
              style={{
                borderWidth: 1,
                borderColor: "#102b46",
                borderRadius: 5,
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            >
              <Collapse
                isCollapsed={this.state.three_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ three_collapsed: !this.state.three_collapsed })
                }
              >
                {three_collapsed == true ? (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Membership")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Membership")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                <CollapseBody style={{
                  // borderTopWidth: 1,
                  // borderTopColor: "white",
                }}>
                  {membershiplistSource.length !== 0 ? (
                    <View>
                      {membershiplistSource.map((membershipData, index) => (
                        <Col
                          key={index}
                          style={{
                            paddingTop: normalize(10),
                            backgroundColor: "#102b46",
                          }}
                        >
                          <Row
                            style={{
                              paddingLeft: "5%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins-SemiBold",
                                color: "#ffffff",
                              }}
                            >
                              {membershipData.membership_name}
                            </Text>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Amount")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {membershipData.membership_amount} {membershipData.currency_symbol}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Period")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {membershipData.membership_period}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Installment Plan")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {membershipData.installment_plan}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            // borderBottomWidth: 1,
                            marginLeft: "5%",
                            marginRight: "5%",
                            // borderBottomColor: "#5E6E7E",
                            paddingBottom: normalize(10),
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Signup Fee")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {membershipData.signup_fee}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </View>
                  ) : (
                    <View style={{ borderTopWidth: 1, borderColor: "#fff" }}>
                      <Row
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 170,
                          backgroundColor: "#102B46",
                        }}
                      >
                        <Text style={{ fontSize: 20, color: "#fff" }}>
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}

                </CollapseBody>
              </Collapse>
            </Col>

            <Col
              style={{
                borderWidth: 1,
                borderColor: "#102b46",
                borderRadius: 5,
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            >
              <Collapse
                isCollapsed={this.state.four_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ four_collapsed: !this.state.four_collapsed })
                }
              >
                {four_collapsed == true ? (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Reservation List")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Reservation List")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                <CollapseBody style={{
                  // borderTopWidth: 1,
                  // borderTopColor: "white",
                }}>
                  {reservationListSource.length !== 0 ? (
                    <View>
                      {reservationListSource.map((reservationData, index) => (
                        <Col
                          key={index}
                          style={{
                            paddingTop: normalize(10),
                            backgroundColor: "#102b46",
                          }}
                        >
                          <Row
                            style={{
                              paddingLeft: "5%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins-SemiBold",
                                color: "#ffffff",
                              }}
                            >
                              {reservationData.event_name}
                            </Text>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Event Place")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {reservationData.event_place}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Event Date")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {reservationData.event_date}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Start Time")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {reservationData.start_time}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            // borderBottomWidth: 1,
                            marginLeft: "5%",
                            marginRight: "5%",
                            // borderBottomColor: "#5E6E7E",
                            paddingBottom: normalize(10),
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("End Time")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {reservationData.end_time}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </View>
                  ) : (
                    <View style={{ borderTopWidth: 1, borderColor: "#fff" }}>
                      <Row
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 170,
                          backgroundColor: "#102B46",
                        }}
                      >
                        <Text style={{ fontSize: 20, color: "#fff" }}>
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}

                </CollapseBody>
              </Collapse>
            </Col>

            <Col
              style={{
                borderWidth: 1,
                borderColor: "#102b46",
                borderRadius: 5,
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            >
              <Collapse
                isCollapsed={this.state.five_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ five_collapsed: !this.state.five_collapsed })
                }
              >
                {five_collapsed == true ? (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Class List")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={{
                        paddingLeft: "5%",
                        height: 45,
                        backgroundColor: "#102b46",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ width: "90%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Poppins-SemiBold",
                            color: "#ffffff",
                          }}
                        >
                          {t("Class List")}
                        </Text>
                      </Col>
                      <Col style={{ width: "10%" }}>
                        <Image
                          style={{ height: 18, width: 18 }}
                          source={require("../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                <CollapseBody style={{
                  // borderTopWidth: 1,
                  // borderTopColor: "white",
                }}>
                  {classListSource.length !== 0 ? (
                    <View>
                      {classListSource.map((classListData, index) => (
                        <Col
                          key={index}
                          style={{
                            paddingTop: normalize(10),
                            backgroundColor: "#102b46",
                          }}
                        >
                          <Row
                            style={{
                              paddingLeft: "5%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Poppins-SemiBold",
                                color: "#ffffff",
                              }}
                            >
                              {classListData.class_name}
                            </Text>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Staff Member")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {classListData.staff_member}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Start Time")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {classListData.start_time}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            marginLeft: "5%",
                            marginRight: "5%",
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("End Time")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {classListData.end_time}
                              </Text>
                            </Col>
                          </Row>
                          <Row style={{
                            // borderBottomWidth: 1,
                            marginLeft: "5%",
                            marginRight: "5%",
                            // borderBottomColor: "#5E6E7E",
                            paddingBottom: normalize(10),
                          }}>
                            <Col style={{ width: normalize(130) }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {t("Class Days")} :
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: "Poppins-Regular",
                                  color: "#8795A2",
                                }}
                              >
                                {classListData.day}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </View>
                  ) : (
                    <View style={{ borderTopWidth: 1, borderColor: "#fff" }}>
                      <Row
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 170,
                          backgroundColor: "#102B46",
                        }}
                      >
                        <Text style={{ fontSize: 20, color: "#fff" }}>
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}

                </CollapseBody>
              </Collapse>
            </Col>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styleCss.container}>
          <NavigationEvents
            onWillFocus={this._onFocus}
            onWillBlur={this._onBlurr}
          />
          <StatusBar />
          <Row style={styleCss.NaveBar}>
            <Col>
              <TouchableOpacity style={styleCss.menu_col} onPress={() => this.props.navigation.navigate("StaffCustomSideBar")}>
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Menu-white.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: normalize(240),
                paddingLeft: normalize(50),
              }}
            >
              <Text style={styleCss.NaveText}>{t("Dashboard")}</Text>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Attendance_Scanner")}
                style={{
                  backgroundColor: "",
                  height: normalize(50),
                  justifyContent: "center",
                  alignItems: "center",
                  width: normalize(50),
                }}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/barcode-scanner.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("StaffMessage")}
                style={{
                  backgroundColor: "",
                  height: normalize(50),
                  justifyContent: "center",
                  alignItems: "center",
                  width: normalize(50),
                }}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Message-white.png")}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <ActivityIndicator
            style={styleCss.loading}
            size="large"
            color="#102b46"
          />
        </View>

      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    activitiSource: state.staffDashboard.activityData,
    grouplistSource: state.staffDashboard.groupData,
    membershiplistSource: state.staffDashboard.membershipData,
    reservationListSource: state.staffDashboard.reservationData,
    classListSource: state.staffDashboard.ClassData,
    loading: state.staffDashboard.loading,
  };
};

const mapDispatchToProps = {
  fetchActivitylist,
  fetchGrouplist,
  fetchMembershiplist,
  fetchReservationList,
  fetchClassList,
  loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffDashboard);