import React, { Component } from "react";
import {
  BackHandler,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Col, Row } from "react-native-easy-grid";
import { t } from "../../../../locals";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';

//Redux
import { connect } from "react-redux";
import { fetchBooking, cancelBooking, loadingStart } from "../../redux/actions/booking";

//CSS
import styleCss from "../../../style";
class BookingList extends Component {
  constructor(props) {
    super(props);
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
    this.bookingData();
  }

  async bookingData() {
    const { fetchBooking, loadingStart } = this.props;

    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const BookingListData = {
      current_user_id: Id,
      access_token: Token,
    };

    // Redux action called for fetch booked class of logined user
    fetchBooking(BookingListData);
  }

  async bookingCancelAction(item) {
    const { cancelBooking, loadingStart } = this.props;
    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const CancelBookingData = {
      current_user_id: Id,
      access_token: Token,
      booking_id: item.booking_id,
    };

    // Redux action called for cancel booking
    cancelBooking(CancelBookingData);
  }

  onRefresh() {
    this.bookingData();
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

  // render item for flatlist
  renderItem = ({ item }) => {
    return (
      <View style={styleCss.container}>
        <Row
          style={styleCss.bookclasslist_row}
        >
          <Col>
            <Row
              style={styleCss.bookclasslist_name_row}
            >
              <Text
                numberOfLines={1}
                style={styleCss.bookclasslist_name_text}
              >
                {item.class_name}
              </Text>
            </Row>
            <Row
              style={styleCss.bookclasslist_calendar_row}
            >
              <Col
                style={styleCss.bookclasslist_calendar_col}
              >
                <Image
                  style={styleCss.bookclasslist_calendar_image}
                  source={require("../../../images/calendar.png")}
                />
              </Col>
              <Col
                style={styleCss.bookclasslist_class_col}
              >
                <Text
                  style={styleCss.bookclasslist_class_text}
                >
                  {item.class_date}
                </Text>
              </Col>
            </Row>
            <Row
              style={styleCss.bookclasslist_time_row}
            >
              <Col
                style={styleCss.bookclasslist_time_col}
              >
                <Image
                  style={styleCss.bookclasslist_time_image}
                  source={require("../../../images/Time-512.png")}
                />
              </Col>
              <Col
                style={styleCss.bookclasslist_time_col2}
              >
                <Text
                  style={styleCss.bookclasslist_time_text}
                >
                  {item.start_time} - {item.end_time}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col
            style={styleCss.bookclasslist_cancel_button_col}
          >
            {item.status_for_cancel == 1 && (
              <TouchableHighlight
                onPress={() => this.bookingCancelAction(item)}
                underlayColor={"#F1C40E"}
                style={styleCss.bookclasslist_cancel_button}
              >
                <Text
                  style={styleCss.bookclasslist_cancel_button_text}
                >
                  {t("cancel")}
                </Text>
              </TouchableHighlight>
            ) }
          </Col>
        </Row>
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { data, bookedClass, totalClass, classLimit, loading } = this.props;

    if (!loading) {
      return (
        <View
          style={styleCss.container}
        >
          <NavigationEvents
            onWillFocus={this._onFocus}
            onWillBlur={this._onBlurr}
          />
          <StatusBar />
          <SafeAreaView
            style={styleCss.container}
          >
            <View>
              {classLimit === "limited" ? (
                <Row
                  style={styleCss.classlimit_row}
                >
                  <Text
                    numberOfLines={1}
                    style={styleCss.classlimit_row_text}
                  >
                    {t("Booking Class")} {bookedClass} {t("Out of")} {totalClass}
                  </Text>
                </Row>
              ) : (
                <View></View>
              )}
            </View>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.booking_id.toString()}
              ListEmptyComponent={
                <EmptyComponent title={t("Data not available")} />
              }
              refreshControl={
                <RefreshControl
                  colors={["#102b46"]}
                  refreshing={loading}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
            />
          </SafeAreaView>
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
// empty component
const EmptyComponent = ({ title }) => (
  <View style={styleCss.emptyContainer}>
    <Text style={styleCss.emptyText}> {title} </Text>
  </View>
);

const mapStateToProps = (state) => {
  return {
    data: state.booking.bookingData,
    bookedClass: state.booking.bookedClass,
    totalClass: state.booking.totalClass,
    classLimit: state.booking.Classlimit,
    loading: state.booking.loading,
  };
};

const mapDispatchToProps = {
  fetchBooking,
  cancelBooking,
  loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);
