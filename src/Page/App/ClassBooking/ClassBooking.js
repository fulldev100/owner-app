import React, { Component } from "react";
import {
  TouchableOpacity,
  BackHandler,
  RefreshControl,
  View,
  Modal,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import moment from "moment";
import { t } from "../../../../locals";
import { Agenda } from "react-native-calendars";
import styleCss from "../../../style";
import * as SecureStore from 'expo-secure-store';

const today = moment().format("YYYY-MM-DD");

//Redux
import { connect } from "react-redux";
import {
  addBooking,
  fetchClassSchedule,
  loadingStart,
} from "../../redux/actions/booking";

class ClassBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
    this.getClassSchedule();
  }

  async getClassSchedule() {
    const { fetchClassSchedule, loadingStart } = this.props;

    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const userData = {
      current_user_id: Id,
      access_token: Token,
    };
    // Redux action call for fetch class schedule data
    fetchClassSchedule(userData);
  }

  // class booking modal view code

  async setClassBookingData(Data) {
    this.setState({ ClassData: [Data] });
    this.setState({ modalVisible: true });
  }

  Visible(modalVisible) {
    this.setState({ modalVisible: false });
  }

  //class booking API calling code
  async classBooing(classbooking_item) {
    const { addBooking, loadingStart } = this.props;

    loadingStart();

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const classBooingData = {
      class_id: classbooking_item.class_id,
      day: classbooking_item.day,
      class_date: classbooking_item.class_date,
      remaning_member: classbooking_item.remaning_member,
      current_user_id: Id,
      access_token: Token,
    };

    this.setState({ modalVisible: false });

    addBooking(classBooingData);
  }

  onRefresh() {
    this.setState({ ClassbookingData: [] });
    this.getClassSchedule();
  }

  _onBlurr = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this._handleBackButtonClick
    );
  };

  _onFocus = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButtonClick
    );
  };

  _handleBackButtonClick = () => this.props.navigation.navigate("Dashboard");

  render() {
    const renderItem = (Data) => {
      return (
          <TouchableOpacity
          style={styleCss.classbooking_item}
          testID={"classbooking_item"}
          onPress={() => this.setClassBookingData(Data)}
        >
          <View style={styleCss.loign_container}>
            <Row>
              <Col>
                <Row style={styleCss.class_title_css}>
                  <Text style={styleCss.classbooking_title} numberOfLines={1}>{Data.title}</Text>
                </Row>
                <Row>
                  <Text style={styleCss.classbooking_title}>
                    {Data.start_time} - {Data.end_time}
                  </Text>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Text style={styleCss.classbooking_title}>{Data.trainer}</Text>
                </Row>
              </Col>
            </Row>
          </View>
        </TouchableOpacity>
      );
    };

    const { modalVisible } = this.state;
    const { classSchedule, loading } = this.props;
    if (!loading) {
      return (
        <View style={styleCss.container}>
          {/* <ScrollView
            refreshControl={
              <RefreshControl
                colors={["#102b46"]}
                refreshing={loading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }> */}
          <Agenda
            monthFormat={"MMMM, yyyy"}
            markingType={"custom"}
            testID={"agenda"}
            minDate={today}
            pastScrollRange={0}
            futureScrollRange={2}
            horizontal={true}
            pagingEnabled={false}
            calendarWidth={320}
            items={classSchedule}
            renderItem={(classbooking_item, firstItemInDay) => {
              return renderItem(classbooking_item, firstItemInDay);
            }}
            refreshControl={
              <RefreshControl
                colors={["#102b46"]}
                refreshing={loading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            // specify how agenda knob should look like
            renderKnob={() => {
              return (
                <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/
                >
                  <Image
                    source={require("../../../../assets/down-arrow.png")}
                    fadeDuration={0}
                    style={styleCss.classbooking_agenda_down_arrow}
                  />
                </TouchableOpacity>
              );
            }}
            showClosingKnob={false}
            hideArrows={true}
          />
          {/* </ScrollView> */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={styleCss.classbooking_main_modal_view}
            >
              <View
                style={styleCss.classbooking_modal_view}
              >
                <Row
                  style={styleCss.classbooking_modal_row}
                >
                  <Col
                    style={styleCss.classbooking_modal_col}
                  >
                    <Text
                      style={styleCss.classbooking_modal_title}
                    >
                      {t("Class Booking")}
                    </Text>
                  </Col>
                  <Col
                    style={styleCss.classbooking_modal_close_col}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.Visible(!modalVisible);
                      }}
                      style={styleCss.classbooking_modal_close_button}
                    >
                      <Image
                        style={styleCss.classbooking_modal_close_image}
                        source={require("../../../images/Close-blue-512.png")}
                      />
                    </TouchableOpacity>
                  </Col>
                </Row>
                {this.state.ClassData &&
                  this.state.ClassData.map((classbooking_item, index) => (
                    <View
                      style={styleCss.classbooking_modal_data_view}
                      key={index}
                    >
                      <Row
                        style={styleCss.classbooking_modal_data_row}
                      >
                        <Col
                          style={styleCss.classbooking_modal_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data_label}
                          >
                            {t("Class Name")} :
                          </Text>
                        </Col>
                        <Col
                          style={styleCss.classbooking_modal_class_data_col}
                        >
                          <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styleCss.classbooking_modal_data}
                          >
                            {classbooking_item.title}
                          </Text>
                        </Col>
                      </Row>
                      <Row
                        style={styleCss.classbooking_modal_data_row}
                      >
                        <Col
                          style={styleCss.classbooking_modal_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data_label}
                          >
                            {t("Date")} :
                          </Text>
                        </Col>
                        <Col
                          style={styleCss.classbooking_modal_class_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data}
                          >
                            {classbooking_item.class_date}
                          </Text>
                        </Col>
                      </Row>
                      <Row
                        style={styleCss.classbooking_modal_data_row}
                      >
                        <Col
                          style={styleCss.classbooking_modal_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data_label}
                          >
                            {t("Start Time")} :
                          </Text>
                        </Col>
                        <Col
                          style={styleCss.classbooking_modal_class_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data}
                          >
                            {classbooking_item.start_time}
                          </Text>
                        </Col>
                      </Row>
                      <Row
                        style={styleCss.classbooking_modal_data_row}
                      >
                        <Col
                          style={styleCss.classbooking_modal_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data_label}
                          >
                            {t("End Time")} :
                          </Text>
                        </Col>
                        <Col
                          style={styleCss.classbooking_modal_class_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data}
                          >
                            {classbooking_item.end_time}
                          </Text>
                        </Col>
                      </Row>
                      <Row
                        style={styleCss.classbooking_modal_data_row}
                      >
                        <Col
                          style={styleCss.classbooking_modal_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data_label}
                          >
                            {t("Trainer Name")} :
                          </Text>
                        </Col>
                        <Col
                          style={styleCss.classbooking_modal_class_data_col}
                        >
                          <Text
                            style={styleCss.classbooking_modal_data}
                          >
                            {classbooking_item.trainer}
                          </Text>
                        </Col>
                      </Row>
                      <Row
                        style={styleCss.classbooking_modal_data_row2}
                      >
                        <Col style={styleCss.classbooking_modal_data_col2}>
                          <Text
                            style={styleCss.classbooking_modal_data_label}
                          >
                            {t("Member Limit In Class")} :
                          </Text>
                        </Col>
                        <Col style={styleCss.classbooking_modal_data_col3}>
                          <Text
                            style={styleCss.classbooking_modal_data}
                          >
                            {classbooking_item.Member_limit}
                          </Text>
                        </Col>
                      </Row>
                      <Row
                        style={styleCss.classbooking_modal_data_row2}
                      >
                        <Col style={styleCss.classbooking_modal_data_col2}>
                          <Text
                            style={styleCss.classbooking_modal_data_label}
                          >
                            {t("Remaining Member In Class")} :
                          </Text>
                        </Col>
                        <Col style={styleCss.classbooking_modal_data_col3}>
                          <Text
                            style={styleCss.classbooking_modal_data}
                          >
                            {classbooking_item.remaning_member}
                          </Text>
                        </Col>
                      </Row>

                      {classbooking_item.booked_class_status == "no" && (
                        <TouchableOpacity
                          style={styleCss.classbooking_book_button}
                          onPress={() => this.classBooing(classbooking_item)}
                        >
                          <Row
                            style={styleCss.classbooking_book_button_row}
                          >
                            <Text style={styleCss.classbooking_book_class_text}>
                              {t("Book Class")}
                            </Text>
                          </Row>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
              </View>
            </View>
          </Modal>
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

const mapStateToProps = (state) => {
  return {
    data: state.booking.bookingData,
    bookedClass: state.booking.bookedClass,
    totalClass: state.booking.totalClass,
    classLimit: state.booking.Classlimit,
    classSchedule: state.booking.classSchedule,
    loading: state.booking.loading,
  };
};

const mapDispatchToProps = {
  addBooking,
  fetchClassSchedule,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassBooking);
