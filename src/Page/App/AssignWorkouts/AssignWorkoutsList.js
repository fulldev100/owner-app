import React, { Component } from "react";
import {
  BackHandler,
  ActivityIndicator,
  RefreshControl,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import { NavigationEvents } from "react-navigation";
import { t } from "../../../../locals";
import styleCss from "../../../style.js";
import * as SecureStore from 'expo-secure-store';

//Redux
import { connect } from "react-redux";
import {
  fetchAssignedWorkoutList,
  loadingStart,
} from "../../redux/actions/assignedWorkout";
class AssignWorkoutsList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      MyID: "",
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleDrawer = ({ navigation }) => {
    this.props.navigation.toggleDrawer();
  };

  componentDidMount() {
    this.viewAssignWorkout();
  }

  async viewAssignWorkout() {
    const { fetchAssignedWorkoutList, loadingStart } = this.props;

    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
    };

    // Redux action call for fetch my assigned workout list
    fetchAssignedWorkoutList(params);
  }
  onRefresh() {
    this.setState({ dataSource: [] });
    this.viewAssignWorkout();
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styleCss.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("WorkoutsList", {
              paramKey: item.workout_id, workoutData : item.arranged_workout
            })
          }
        >
          <Row style={styleCss.assignworkouts_row}>
            <Col style={styleCss.assignworkouts_image_col_one}>
              <Col style={styleCss.assignworkouts_image_col_two}>
                <Image
                  style={styleCss.assignworkouts_image}
                  source={require("../../../images/Date-blue-512.png")}
                />
              </Col>
            </Col>
            <Col style={styleCss.assignworkouts_time_col}>
              <Row style={styleCss.assignworkouts_time_one_row}>
                <Text style={styleCss.assignworkouts_time_text}>
                  {t("Start From")} :{" "}
                </Text>
                <Text style={styleCss.assignworkouts_time_data}>
                  {item.start_date}
                </Text>
              </Row>

              <Row style={styleCss.assignworkouts_time_two_row}>
                <Text style={styleCss.assignworkouts_time_text}>
                  {t("To")} :{" "}
                </Text>
                <Text style={styleCss.assignworkouts_time_data}>
                  {item.end_date}
                </Text>
              </Row>
            </Col>
          </Row>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { assignedWorkoutList, loading } = this.props;
    const { navigate } = this.props.navigation;

    if (!loading) {
      return (
        <View style={styleCss.container}>
          <NavigationEvents
            onWillFocus={this._onFocus}
            onWillBlur={this._onBlurr}
          />
          <StatusBar />
          <Row style={styleCss.NaveBar}>
            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CustomSideBar")}
                style={styleCss.menu_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Menu-white.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => navigate("Dashboard")}
                style={styleCss.back_arrow}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Back-Arrow-White.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col style={styleCss.name_col}>
              <Text style={styleCss.NaveText}>{t("Assigned Workouts")}</Text>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Workouts")}
                style={styleCss.workout_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Workout-White.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Message")}
                style={styleCss.message_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Message-white.png")}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <FlatList
            data={assignedWorkoutList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.workout_id.toString()}
            ListEmptyComponent={
              <EmptyComponent title={t("Data not available")} />
            }
            refreshControl={
              <RefreshControl
                colors={["#102b46"]}
                refreshing={this.state.loading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CustomSideBar")}
                style={styleCss.menu_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Menu-white.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => navigate("Dashboard")}
                style={styleCss.back_arrow}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Back-Arrow-White.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col style={styleCss.name_col}>
              <Text style={styleCss.NaveText}>{t("Assigned Workouts")}</Text>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Workouts")}
                style={styleCss.workout_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../../images/Workout-White.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Message")}
                style={styleCss.message_col}
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
// empty component
const EmptyComponent = ({ title }) => (
  <View style={styleCss.emptyContainer}>
    <Text style={{ fontSize: 20 }}>{title}</Text>
  </View>
);

const mapStateToProps = (state) => {
  return {
    assignedWorkoutList: state.assignedWorkout.assignedWorkoutList,
    loading: state.assignedWorkout.loading,
  };
};

const mapDispatchToProps = {
  fetchAssignedWorkoutList,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignWorkoutsList);
