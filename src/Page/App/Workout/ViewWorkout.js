import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Calendar } from "react-native-calendars";
import { Col, Row } from "react-native-easy-grid";
import { t } from "../../../../locals";
import styleCss from "../../../style.js";

//Redux
import { connect } from "react-redux";
import { fetchPreviewWorkout, loadingStart, fetchWorkoutDates, makeViewWorkoutEmpty } from "../../redux/actions/workout";

class ViewWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      selectedDate: "",
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  toggleDrawer = ({ navigation }) => {
    this.props.navigation.toggleDrawer();
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  onRefresh() {
    // this.onDayPress();
    const { makeViewWorkoutEmpty, loadingStart } = this.props;
    loadingStart();
    makeViewWorkoutEmpty();
    this.setState({ selectedDate: "" });
    this.workoutdateArrayAction();
  }

  async workoutdateArrayAction() {
    const { fetchWorkoutDates, loadingStart } = this.props;
    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const params = {
      current_user_id: Id,
      access_token: Token,
    };

    //Redux action call for fetch workout dates list
    fetchWorkoutDates(params);
  }

  async onDayPress(date) {
    const { fetchPreviewWorkout, loadingStart } = this.props;

    loadingStart();
    this.setState({
      selectedDate: date.dateString,
    });

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      member_id: Id,
      access_token: Token,
      current_date: this.state.selectedDate,
    };

    // Redux function all for fetch selected date workout data
    fetchPreviewWorkout(params);
  }

  render() {
    
    const { previewWorkoutData, workoutDatesList, loading  } = this.props;

    const mark = {
      [this.state.selectedDate]: {
        customStyles: {
          container: {
            backgroundColor: "#102b46",
            borderWidth: 2,
            borderColor: "#f1c40e",
          },
          text: {
            color: "#fff",
          },
        },
      },
    };

    workoutDatesList.forEach((day) => {
      mark[day] = {
        selected: true,
        // marked: true,
        customStyles: {
          container: {
            backgroundColor: "#102b46",
          },
          text: {
            color: "#f1c40e",
          },
        },
      };
      mark[this.state.selectedDate] = {
        selected: true,
        // marked: true,
        customStyles: {
          container: {
            backgroundColor: "#f1c40e",
            borderColor: "#102b46",
            borderWidth: 2,
          },
          text: {
            color: "#102b46",
            fontWeight: "bold",
          },
        },
      };
    });

    if (!loading) {
      return (
        <View style={styleCss.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={["#102b46"]}
                refreshing={loading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          >
            <Row style={styleCss.viewworkout_date_row}>
              <Text style={styleCss.viewworkout_HeaderText}>
                {t("Select Date")}:
              </Text>
            </Row>
            <Col style={styleCss.viewworkout_calendar_col}>
              <Calendar
                monthFormat={"MMMM, yyyy"}
                markingType={"custom"}
                date={this.state.date}
                onDayPress={(date) => {
                  this.onDayPress(date);
                }}
                markedDates={mark}
                theme={{
                  textSectionTitleColor: "#b6c1cd",
                  textSectionTitleDisabledColor: "#102b46",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#00adf5",
                  dayTextColor: "#2d4150",
                  textDisabledColor: "#d9e1e8",
                  dotColor: "#00adf5",
                  arrowColor: "#102b46",
                  disabledArrowColor: "#d9e1e8",
                  monthTextColor: "#102b46",
                  indicatorColor: "#102b46",
                  textDayFontFamily: "Poppins-Medium",
                  textMonthFontFamily: "Poppins-SemiBold",
                  textDayHeaderFontFamily: "Poppins-Medium",
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
            </Col>

            {previewWorkoutData != 0 ? (
              <View>
                {previewWorkoutData.map((Data, index) => (
                  <View key={index}>
                    <Row style={styleCss.viewworkout_title}>
                      <Text style={styleCss.viewworkout_HeaderText}>
                        {Data.workout_name}
                      </Text>
                    </Row>
                    <Col style={styleCss.viewworkout_Col}>
                      <Row style={styleCss.viewworkout_contanier}>
                        <Col>
                          <Row style={styleCss.viewworkout_row}>
                            <Col style={styleCss.viewworkout_data_one_Col}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {t("Sets")}({Data.total_sets}):{" "}
                              </Text>
                            </Col>
                            <Col style={styleCss.viewworkout_data_two_Col}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {Data.memeber_sets}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row style={styleCss.viewworkout_row}>
                            <Col style={styleCss.viewworkout_data_one_Col2}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {t("Kg")}({Data.total_kg}):{" "}
                              </Text>
                            </Col>
                            <Col style={styleCss.viewworkout_data_two_Col}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {Data.memeber_kg}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row style={styleCss.viewworkout_contanier}>
                        <Col>
                          <Row style={styleCss.viewworkout_row}>
                            <Col style={styleCss.viewworkout_data_one_Col}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {t("Reps")}({Data.total_reps}):{" "}
                              </Text>
                            </Col>
                            <Col style={styleCss.viewworkout_data_two_Col}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {Data.memeber_reps}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row style={styleCss.viewworkout_row}>
                            <Col style={styleCss.viewworkout_data_one_Col2}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {t("Reps Time")}({Data.total_rest_time}):{" "}
                              </Text>
                            </Col>
                            <Col style={styleCss.viewworkout_data_two_Col}>
                              <Text style={styleCss.viewworkout_data_text}>
                                {Data.memeber_rest_time}
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </View>
                ))}
              </View>
            ) : (
              <View></View>
            )}
          </ScrollView>
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
    previewWorkoutData: state.workout.previewWorkoutData,
    workoutDatesList: state.workout.workoutDatesList,
    loading: state.workout.loading,
  };
};

const mapDispatchToProps = {
  fetchPreviewWorkout,
  makeViewWorkoutEmpty,
  fetchWorkoutDates,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkout);
