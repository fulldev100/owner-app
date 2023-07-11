import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Calendar } from "react-native-calendars";
import { Col, Row } from "react-native-easy-grid";
import { t } from "../../../../locals";
import styleCss from "../../../style.js";

//Redux
import { connect } from "react-redux";
import {
  fetchWorkoutDates,
  fetchWorkoutDetails,
  addWorkout,
  loadingStart,
  makeAddWorkoutEmpty
} from "../../redux/actions/workout";
class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      workoutData: [],
      selectedDate: "",
      notes: "",
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
    const { makeAddWorkoutEmpty, loadingStart } = this.props;
    loadingStart();
    makeAddWorkoutEmpty();
    this.setState({ selectedDate: "" });
    this.workoutdateArrayAction();
  }

  async componentDidMount() {
    this.workoutdateArrayAction();
  }

  // Assign workout Date list array

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
    const { fetchWorkoutDetails, loadingStart } = this.props;
    loadingStart();
    this.setState({
      selectedDate: date.dateString,
    });
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const params = {
      current_user_id: Id,
      access_token: Token,
      record_date: this.state.selectedDate,
    };
    fetchWorkoutDetails(params);
  }

  async SaveData() {
    const { addWorkout, loadingStart, singleWorkout } = this.props;

    loadingStart();
    var workoutData = [];

    singleWorkout.map((item) => {
      let UserID = item.user_workout_id;
      let ID = item.workout_id;
      let Name = item.workout_name;
      let row = {
        workoutId: ID,
        workoutName: Name,
        sets: this.state["sets_" + ID],
        kg: this.state["kg_" + ID],
        reps: this.state["reps_" + ID],
        resttime: this.state["restTime_" + ID],
      };
      this.setState({ User_id: UserID });
      workoutData[item.workout_id] = row;
    });

    var filtered = workoutData.filter((e) => e != undefined);

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    var addWorkoutData = {
      current_user_id: Id,
      member_id: Id,
      access_token: Token,
      record_date: this.state.selectedDate,
      workouts_array: filtered,
      user_workout_id: this.state.User_id,
      note: this.state.notes,
    };

    var params = JSON.stringify(addWorkoutData);

    //Redux action call for save workout data
    addWorkout(params);
  }

  render() {
    const { workoutDatesList, singleWorkout, loading } = this.props;
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
          {Platform.OS == "ios" ? (
            <KeyboardAvoidingView
              style={styleCss.addworkout_keyboard}
              behavior="padding"
              enabled
              keyboardVerticalOffset={100}
            >
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
                  <Text style={styleCss.addworkout_HeaderText}>
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
                      selectedDotColor: "#ffffff",
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
                {singleWorkout != 0 ? (
                  <View>
                    {singleWorkout.map((List, index) => (
                      <View key={index}>
                        <Row style={styleCss.addworkout_Title}>
                          <Text style={styleCss.addworkout_HeaderText}>
                            {List.workout_name}
                          </Text>
                        </Row>
                        <Col style={styleCss.addworkout_Col}>
                          <Row style={styleCss.addworkout_Container}>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col style={styleCss.viewworkout_data_one_Col}>
                                  <Text style={styleCss.viewworkout_data_text}>
                                    {t("Sets")}({List.sets}):{" "}
                                  </Text>
                                </Col>
                                <Col style={styleCss.addworkout_input_Col}>
                                  <TextInput
                                    placeholder={t("Sets")}
                                    placeholderTextColor={"white"}
                                    style={styleCss.addworkout_input}
                                    maxLength={4}
                                    keyboardType={"numeric"}
                                    onChangeText={(sets) =>
                                      this.setState({
                                        ["sets_" + List.workout_id]: sets,
                                      })
                                    }
                                  ></TextInput>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col style={styleCss.addworkout_kg_col}>
                                  <Text style={styleCss.viewworkout_data_text}>
                                    {t("Kg")}({List.kg}):{" "}
                                  </Text>
                                </Col>
                                <Col style={styleCss.addworkout_kg_input_col}>
                                  <TextInput
                                    placeholder={t("Kg")}
                                    placeholderTextColor={"white"}
                                    style={styleCss.viewworkout_data_text}
                                    keyboardType={"numeric"}
                                    maxLength={4}
                                    onChangeText={(kg) =>
                                      this.setState({
                                        ["kg_" + List.workout_id]: kg,
                                      })
                                    }
                                  ></TextInput>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={styleCss.addworkout_Container}>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col style={styleCss.viewworkout_data_one_Col}>
                                  <Text style={styleCss.viewworkout_data_text}>
                                    {t("Reps")}({List.reps}):{" "}
                                  </Text>
                                </Col>
                                <Col style={styleCss.addworkout_input_Col}>
                                  <TextInput
                                    placeholder={t("Reps")}
                                    placeholderTextColor={"white"}
                                    style={styleCss.addworkout_input}
                                    keyboardType={"numeric"}
                                    maxLength={4}
                                    onChangeText={(reps) =>
                                      this.setState({
                                        ["reps_" + List.workout_id]: reps,
                                      })
                                    }
                                  ></TextInput>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col>
                                  <Row
                                    style={styleCss.addworkout_rest_time_row}
                                  >
                                    <Text
                                      style={styleCss.viewworkout_data_text}
                                    >
                                      {t("Rest Time")}({List.rest_time}):{" "}
                                    </Text>
                                  </Row>
                                </Col>
                                <Col style={styleCss.addworkout_rest_time_col}>
                                  <TextInput
                                    placeholder={t("Rest Time")}
                                    placeholderTextColor={"white"}
                                    style={styleCss.viewworkout_data_text}
                                    keyboardType={"numeric"}
                                    maxLength={4}
                                    onChangeText={(restTime) =>
                                      this.setState({
                                        ["restTime_" + List.workout_id]:
                                          restTime,
                                      })
                                    }
                                  ></TextInput>
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

                {singleWorkout != 0 ? (
                  <View>
                    <Row style={styleCss.addworkout_TextInputRow}>
                      <TextInput
                        style={styleCss.addworkout_notes_Input}
                        placeholder={t("Write here")}
                        placeholderTextColor={"#a4a4a4"}
                        multiline={true}
                        onChangeText={(notes) => this.setState({ notes })}
                      ></TextInput>
                    </Row>
                    <TouchableOpacity
                      style={styleCss.addworkout_btn}
                      onPress={this.SaveData.bind(this)}
                    >
                      <Row style={styleCss.addworkout_btn_container}>
                        <Text style={styleCss.addworkout_btn_text}>
                          {t("Save")}
                        </Text>
                      </Row>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
          ) : (
            <KeyboardAvoidingView>
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
                  <Text style={styleCss.addworkout_HeaderText}>
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
                      selectedDotColor: "#ffffff",
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
                {singleWorkout != 0 ? (
                  <View>
                    {singleWorkout.map((List, index) => (
                      <View key={index}>
                        <Row style={styleCss.addworkout_Title}>
                          <Text style={styleCss.addworkout_HeaderText}>
                            {List.workout_name}
                          </Text>
                        </Row>
                        <Col style={styleCss.addworkout_Col}>
                          <Row style={styleCss.addworkout_Container}>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col style={styleCss.viewworkout_data_one_Col}>
                                  <Text style={styleCss.viewworkout_data_text}>
                                    {t("Sets")}({List.sets}):{" "}
                                  </Text>
                                </Col>
                                <Col style={styleCss.addworkout_input_Col}>
                                  <Row style={styleCss.addworkout_input_row}>
                                    <TextInput
                                      // placeholder={t("Sets")}
                                      placeholderTextColor={"white"}
                                      style={styleCss.addworkout_input}
                                      maxLength={4}
                                      keyboardType={"numeric"}
                                      onChangeText={(sets) =>
                                        this.setState({
                                          ["sets_" + List.workout_id]: sets,
                                        })
                                      }
                                    ></TextInput>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col style={styleCss.addworkout_kg_col}>
                                  <Text style={styleCss.viewworkout_data_text}>
                                    {t("Kg")}({List.kg}):{" "}
                                  </Text>
                                </Col>
                                <Col style={styleCss.addworkout_kg_input_col}>
                                  <TextInput
                                    // placeholder={t("Kg")}
                                    placeholderTextColor={"white"}
                                    style={styleCss.viewworkout_data_text}
                                    keyboardType={"numeric"}
                                    maxLength={4}
                                    onChangeText={(kg) =>
                                      this.setState({
                                        ["kg_" + List.workout_id]: kg,
                                      })
                                    }
                                  ></TextInput>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={styleCss.addworkout_Container}>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col style={styleCss.viewworkout_data_one_Col}>
                                  <Text style={styleCss.viewworkout_data_text}>
                                    {t("Reps")}({List.reps}):{" "}
                                  </Text>
                                </Col>
                                <Col style={styleCss.addworkout_input_Col}>
                                  <Row style={styleCss.addworkout_input_row}>
                                    <TextInput
                                      // placeholder={t("Reps")}
                                      placeholderTextColor={"white"}
                                      style={styleCss.addworkout_input}
                                      keyboardType={"numeric"}
                                      maxLength={4}
                                      onChangeText={(reps) =>
                                        this.setState({
                                          ["reps_" + List.workout_id]: reps,
                                        })
                                      }
                                    ></TextInput>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row style={styleCss.viewworkout_row}>
                                <Col>
                                  <Row
                                    style={styleCss.addworkout_rest_time_row}
                                  >
                                    <Text
                                      style={styleCss.viewworkout_data_text}
                                    >
                                      {t("Rest Time")}({List.rest_time}):{" "}
                                    </Text>
                                  </Row>
                                </Col>
                                <Col style={styleCss.addworkout_rest_time_col}>
                                  <TextInput
                                    // placeholder={t("Rest Time")}
                                    placeholderTextColor={"white"}
                                    style={styleCss.viewworkout_data_text}
                                    keyboardType={"numeric"}
                                    maxLength={4}
                                    onChangeText={(restTime) =>
                                      this.setState({
                                        ["restTime_" + List.workout_id]:
                                          restTime,
                                      })
                                    }
                                  ></TextInput>
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

                {singleWorkout != 0 ? (
                  <View>
                    <Row style={styleCss.addworkout_TextInputRow}>
                      <TextInput
                        style={styleCss.addworkout_notes_Input}
                        placeholder={t("Write here")}
                        placeholderTextColor={"#a4a4a4"}
                        multiline={true}
                        onChangeText={(notes) => this.setState({ notes })}
                      ></TextInput>
                    </Row>
                    <TouchableOpacity
                      style={styleCss.addworkout_btn}
                      onPress={this.SaveData.bind(this)}
                    >
                      <Row style={styleCss.addworkout_btn_container}>
                        <Text style={styleCss.addworkout_btn_text}>
                          {t("Save")}
                        </Text>
                      </Row>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
          )}
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
    workoutDatesList: state.workout.workoutDatesList,
    singleWorkout: state.workout.singleWorkout,
    loading: state.workout.loading,
  };
};

const mapDispatchToProps = {
  fetchWorkoutDates,
  fetchWorkoutDetails,
  makeAddWorkoutEmpty,
  addWorkout,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkout);
