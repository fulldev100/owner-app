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
import * as SecureStore from 'expo-secure-store';
import { t } from "../../../../../locals";
import { Col, Row } from "react-native-easy-grid";
import { NavigationEvents } from "react-navigation";
import PureChart from 'react-native-pure-chart';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import moment from "moment";
import { connect } from "react-redux";
import { fetchmemberAttendance, fetchstaffAttendance, loadingStart, fetchfeesPayment, fetchincomePayment, fetchsellproduct, fetchmembership, } from '../../../redux/actions/report';
import styleCss from '../../../../style'
const today = moment().format("YYYY-MM-DD");
class Member_Report extends Component {
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
    this.dashboardReport();
    this.staffAttendance();
    this.feeReport();
    this.incomeReport();
    this.sellReport();
    this.membershipReport();

    this.focusListener = navigation.addListener("didFocus", () => {
      this.dashboardReport();
      this.staffAttendance();
      this.feeReport();
      this.incomeReport();
      this.sellReport();
      this.membershipReport();
    });

    this.setState({ loader: false })
  }

  async dashboardReport() {
    const { fetchmemberAttendance, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const Data = {
      current_user_id: Id,
      access_token: Token,
      report_type: "member_attendance",
    };
    fetchmemberAttendance(Data)
  }

  async staffAttendance() {
    const { fetchstaffAttendance, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const Data = {
      current_user_id: Id,
      access_token: Token,
      report_type: "staff_attendance",
    };
    fetchstaffAttendance(Data)
  }

  async feeReport() {
    const { fetchfeesPayment, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const Data = {
      current_user_id: Id,
      access_token: Token,
      report_type: "fees_payment_report",
    };
    fetchfeesPayment(Data)
  }

  async incomeReport() {
    const { fetchincomePayment, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const Data = {
      current_user_id: Id,
      access_token: Token,
      report_type: "income_payment_report",
    };
    fetchincomePayment(Data)
  }

  async sellReport() {
    const { fetchsellproduct, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const Data = {
      current_user_id: Id,
      access_token: Token,
      report_type: "sell_product_report",
    };
    fetchsellproduct(Data)
  }

  async membershipReport() {
    const { fetchmembership, loadingStart } = this.props
    loadingStart()
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const Data = {
      current_user_id: Id,
      access_token: Token,
      report_type: "membership_report",
    };
    fetchmembership(Data)
  }

  onRefresh() {
    this.dashboardReport();
    this.staffAttendance();
    this.feeReport();
    this.incomeReport();
    this.sellReport();
    this.membershipReport();

    this.setState({ collapsed: false })
    this.setState({ two_collapsed: false })
    this.setState({ three_collapsed: false })
    this.setState({ four_collapsed: false })
    this.setState({ five_collapsed: false })
    this.setState({ six_collapsed: false })
  }


  render() {

    const { collapsed, two_collapsed, three_collapsed, four_collapsed, five_collapsed, six_collapsed } = this.state;
    const { attendance_report, staff_attendance_report, fees_payment_report, income_payment_report, sell_product_report, membership_report, loading } = this.props;
    const { navigate } = this.props.navigation;
    if (!loading) {
      return (
        <View style={styleCss.container}>
          <Row style={styleCss.NaveBar}>
            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("StaffCustomSideBar")} style={styleCss.menu_col}>
                <Image style={styleCss.Naveicon}
                  source={require('../../../../images/Menu-white.png')}
                />
              </TouchableOpacity>
            </Col>

            <Col>
              <TouchableOpacity onPress={() => navigate("staffDashboard")} style={styleCss.back_arrow}>
                <Image style={styleCss.Naveicon}
                  source={require('../../../../images/Back-Arrow-White.png')}
                />
              </TouchableOpacity>
            </Col>

            <Col style={styleCss.name_col}>
              <Text style={styleCss.NaveText}>{t("Reports")}</Text>
            </Col>

            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Attendance_Scanner")} style={styleCss.workout_col}>
                <Image style={styleCss.Naveicon}
                  source={require("../../../../images/barcode-scanner.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffMessage')} style={styleCss.message_col}>
                <Image style={styleCss.Naveicon}
                  source={require('../../../../images/Message-white.png')}
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
            <Col
              style={styleCss.staffside_report_col}
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
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Member Attendance Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Member Attendance Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                {attendance_report == 0 ?
                  (
                    <CollapseBody style={styleCss.report_collaps_nodata_body}>
                      <Text style={styleCss.report_collaps_nodata_body_text}>{t("Record not available")}</Text>
                    </CollapseBody>
                  ) : (
                    <CollapseBody style={styleCss.report_collaps_data_body}>
                      <PureChart data={attendance_report} type='bar'
                        backgroundColor="#102B46"
                        labelColor='#ffffff'
                        // height={180}
                      />
                      <Row style={styleCss.attendance_report_row}>
                        <Col style={styleCss.attendance_report_first_col}><Text></Text></Col>
                        <Text style={styleCss.attendance_report_first_col_text}>{t("Present")}</Text>
                        <Col style={styleCss.attendance_report_second_col}><Text></Text></Col>
                        <Text style={styleCss.attendance_report_second_col_text}>{t("Absent")}</Text>
                      </Row>
                    </CollapseBody>
                  )}

              </Collapse>
            </Col>

            <Col
              style={styleCss.staffside_report_col}
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
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Staff Attendance Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Staff Attendance Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                {staff_attendance_report == 0 ?
                  (
                    <CollapseBody style={styleCss.report_collaps_nodata_body}>
                      <Text style={styleCss.report_collaps_nodata_body_text}>{t("Record not available")}</Text>
                    </CollapseBody>
                  ) : (
                    <CollapseBody style={styleCss.report_collaps_data_body}>
                      <PureChart data={staff_attendance_report} type='bar'
                        backgroundColor="#102B46"
                        labelColor='#ffffff'
                        // height={180}
                      />
                      <Row style={styleCss.attendance_report_row}>
                        <Col style={styleCss.attendance_report_first_col}><Text></Text></Col>
                        <Text style={styleCss.attendance_report_first_col_text}>{t("Present")}</Text>
                        <Col style={styleCss.attendance_report_second_col}><Text></Text></Col>
                        <Text style={styleCss.attendance_report_second_col_text}>{t("Absent")}</Text>
                      </Row>
                    </CollapseBody>

                  )}
              </Collapse>
            </Col>

            <Col
              style={styleCss.staffside_report_col}
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
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Fee Payment Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Fee Payment Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                {fees_payment_report == 0 ?
                  (
                    <CollapseBody style={styleCss.report_collaps_nodata_body}>
                      <Text style={styleCss.report_collaps_nodata_body_text}>{t("Record not available")}</Text>
                    </CollapseBody>
                  ) : (
                    <CollapseBody style={styleCss.report_collaps_data_body}>
                      <PureChart data={fees_payment_report} type='bar'
                        backgroundColor="#102B46"
                        labelColor='#ffffff'
                        // height={180}
                      />
                    </CollapseBody>
                  )}

              </Collapse>
            </Col>

            <Col
              style={styleCss.staffside_report_col}
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
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Income Payment Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Income Payment Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                {income_payment_report == 0 ?
                  (
                    <CollapseBody style={styleCss.report_collaps_nodata_body}>
                      <Text style={styleCss.report_collaps_nodata_body_text}>{t("Record not available")}</Text>
                    </CollapseBody>
                  ) : (
                    <CollapseBody style={styleCss.report_collaps_data_body}>
                      <PureChart data={income_payment_report} type='bar'
                        backgroundColor="#102B46"
                        labelColor='#ffffff'
                        // height={180}
                      />
                    </CollapseBody>
                  )}

              </Collapse>
            </Col>

            <Col
              style={styleCss.staffside_report_col}
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
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Sell Product Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Sell Product Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                {sell_product_report == 0 ? (
                  <CollapseBody style={styleCss.report_collaps_nodata_body}>
                    <Text style={styleCss.report_collaps_nodata_body_text}>{t("Record not available")}</Text>
                  </CollapseBody>
                ) : (
                  <CollapseBody style={styleCss.report_collaps_data_body}>
                    <PureChart data={sell_product_report} type='bar'
                      backgroundColor="#102B46"
                      labelColor='#ffffff'
                      // height={180}
                    />
                  </CollapseBody>
                )}

              </Collapse>
            </Col>

            <Col
              style={styleCss.staffside_report_last_col}
            >
              <Collapse
                isCollapsed={this.state.six_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ six_collapsed: !this.state.six_collapsed })
                }
              >
                {six_collapsed == true ? (
                  <CollapseHeader>
                    <Row
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Membership Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Down_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row
                      style={styleCss.report_collaps_row}
                    >
                      <Col style={styleCss.report_text_col}>
                        <Text
                          style={styleCss.report_text_col_css}
                        >
                          {t("Membership Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.report_image_col}>
                        <Image
                          style={styleCss.report_image_col_css}
                          source={require("../../../../images/Right_Arrow_gray.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                {membership_report == 0 ? (
                  <CollapseBody style={styleCss.report_collaps_nodata_body}>
                    <Text style={styleCss.report_collaps_nodata_body_text}>{t("Record not available")}</Text>
                  </CollapseBody>
                ) : (
                  <CollapseBody style={styleCss.report_collaps_data_body}>
                    <PureChart data={membership_report} type='bar'
                      backgroundColor="#102B46"
                      labelColor='#ffffff'
                      // height={110}
                    />
                  </CollapseBody>
                )}
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
              <TouchableOpacity onPress={() => this.props.navigation.navigate("StaffCustomSideBar")} style={styleCss.menu_col}>
                <Image style={styleCss.Naveicon}
                  source={require('../../../../images/Menu-white.png')}
                />
              </TouchableOpacity>
            </Col>

            <Col>
              <TouchableOpacity onPress={() => navigate("staffDashboard")} style={styleCss.back_arrow}>
                <Image style={styleCss.Naveicon}
                  source={require('../../../../images/Back-Arrow-White.png')}
                />
              </TouchableOpacity>
            </Col>

            <Col style={styleCss.name_col}>
              <Text style={styleCss.NaveText}>{t("Reports")}</Text>
            </Col>

            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Attendance_Scanner")} style={styleCss.workout_col}>
                <Image style={styleCss.Naveicon}
                  source={require("../../../../images/barcode-scanner.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffMessage')} style={styleCss.message_col}>
                <Image style={styleCss.Naveicon}
                  source={require('../../../../images/Message-white.png')}
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
    attendance_report: state.report.memberAttendanceData,
    staff_attendance_report: state.report.staffAttendanceData,
    fees_payment_report: state.report.feesPaymentData,
    income_payment_report: state.report.incomePaymentData,
    sell_product_report: state.report.sellProductData,
    membership_report: state.report.membershipData,
    loading: state.report.loading,
  };
};

const mapDispatchToProps = {
  fetchmemberAttendance,
  fetchstaffAttendance,
  fetchfeesPayment,
  fetchincomePayment,
  fetchsellproduct,
  fetchmembership,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member_Report);