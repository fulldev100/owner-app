import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import validate from "validate.js";
import { Row } from "react-native-easy-grid";
import DropdownAlert from "react-native-dropdownalert";
import { Textarea } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import { t } from "../../../../locals";
import styleCss from "../../../style.js";
import { connect } from "react-redux";
import {
  composeMessagesend,
  loadingStart,
  fetchMemberAndStaffAction,
} from "../../redux/actions/message";
class compose extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      Membershipopen: false,
      Name: "",
      Message_Comment: "",
      Message_subject: "",
    };
  }
  toggleDrawer = ({ navigation }) => {
    this.props.navigation.toggleDrawer();
  };

  componentDidMount() {
    this.getallMemberAndStaff();
  }

  async getallMemberAndStaff() {
    const { fetchMemberAndStaffAction, loadingStart } = this.props;
    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const Data = {
      current_user_id: Id,
      access_token: Token,
    };
    fetchMemberAndStaffAction(Data);
  }

  async sendmessage() {
    const { Name, Message_subject, Message_Comment } = this.state;
    const { navigate } = this.props.navigation;

    var constraints = {
      Name: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Name is required"),
        },
      },
      Message_subject: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Message subject is required"),
        },
      },
      Message_Comment: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Message comment is required"),
        },
      },
    };

    const result = validate(
      {
        Name: this.state.Name,
        Message_subject: this.state.Message_subject,
        Message_Comment: this.state.Message_Comment,
      },
      constraints
    );

    if (result) {
      if (result.Name) {
        this.dropdown.alertWithType("error", t("Error"), result.Name);
        this.setState({ visible: true });
        return false;
      }
      if (result.Message_subject) {
        this.dropdown.alertWithType(
          "error",
          t("Error"),
          result.Message_subject
        );
        this.setState({ visible: true });
        return false;
      }
      if (result.Message_Comment) {
        this.dropdown.alertWithType(
          "error",
          t("Error"),
          result.Message_Comment
        );
        this.setState({ visible: true });
        return false;
      }
    }
    if (!result) {
      const { composeMessagesend, loadingStart } = this.props;
      loadingStart();

      const Id = await SecureStore.getItemAsync("id");
      const Token = await SecureStore.getItemAsync("access_token");

      const composeData = {
        current_user_id: Id,
        access_token: Token,
        receiver: this.state.Name,
        subject: this.state.Message_subject,
        message_body: this.state.Message_Comment,
      };

      composeMessagesend(composeData);
      this.setState({ Name: "", Message_subject: "", Message_Comment: "" });
    }
  }

  setMembershipOpen = (Membershipopen) => {
    this.setState({
      Membershipopen,
    });
  };

  setMembershipValue = (callback) => {
    this.setState((state) => ({
      Name: callback(state.Name),
    }));
  };

  setMembershipItems = (callback) => {
    this.setState((state) => ({
      items: callback(state.items),
    }));
  };

  render() {
    const { loading, staffData } = this.props;
    const { Membershipopen, Name, Message_Comment, Message_subject } =
      this.state;
    let staffList = [];
    if (staffData !== null) {
      for (let userObject of staffData) {
        staffList.push({
          label:
            userObject.staff_name ||
            userObject.member_name ||
            userObject.admin_name,
          value:
            userObject.staff_id || userObject.member_id || userObject.admin_id,
        });
      }
    }
    if (!loading) {
      return (
        <View style={styleCss.container}>
          {Platform.OS == "ios" ? (
            <KeyboardAvoidingView behavior="padding">
              <ScrollView>
                <View style={styleCss.compose_container}>
                  <Row style={styleCss.compose_row}>
                    <Text style={styleCss.compose_text}>
                      {t("Message To")}:{" "}
                    </Text>
                  </Row>
                  <View style={styleCss.compose_view}>
                    <DropDownPicker
                      style={styleCss.compose_dropdown}
                      listItemContainerStyle={{
                        backgroundColor: "#FCFBFB",
                        borderColor: "#EBEBEB",
                        borderWidth: 1,
                        fontFamily: "Poppins-Medium",
                      }}
                      conta
                      listMode="SCROLLVIEW"
                      scrollViewProps={{
                        nestedScrollEnabled: true,
                      }}
                      placeholder={t("Select Membership")}
                      dropDownContainerStyle={{
                        // zIndex: 50000,
                        height: 120,
                        borderColor: "#EBEBEB",
                        borderWidth: 1,
                        position: "relative",
                        top: 0,
                      }}
                      open={Membershipopen}
                      value={Name}
                      // onSelectItem={(items) => this.getClass(items)}
                      items={staffList}
                      setOpen={this.setMembershipOpen}
                      setValue={this.setMembershipValue}
                      setItems={this.setMembershipItems}
                      mode="BADGE"
                      placeholderStyle={{
                        color: "#777777",
                        fontFamily: "Poppins-Medium",
                        paddingLeft: 12,
                      }}
                    />
                  </View>

                  <Row style={styleCss.compose_row}>
                    <Text style={styleCss.compose_text}>{t("Subject")}: </Text>
                  </Row>

                  <Row style={styleCss.compose_subject_row}>
                    <TouchableOpacity style={styleCss.compose_subject_text}>
                      <TextInput
                        style={styleCss.compose_subject_input}
                        placeholder={t("Add Subject")}
                        placeholderTextColor={"#BAB9B9"}
                        value={Message_subject}
                        onChangeText={(Message_subject) =>
                          this.setState({ Message_subject })
                        }
                      />
                    </TouchableOpacity>
                  </Row>

                  <Row style={styleCss.compose_row}>
                    <Text style={styleCss.compose_text}>
                      {t("Message Comment")}:{" "}
                    </Text>
                  </Row>

                  <Row style={styleCss.compose_message_row}>
                    <TouchableOpacity style={styleCss.compose_message_text}>
                      <Textarea
                        style={styleCss.compose_message_input}
                        placeholder={t("Add Message")}
                        placeholderTextColor={"#BAB9B9"}
                        multiline={true}
                        numberOfLines={2}
                        value={Message_Comment}
                        onChangeText={(Message_Comment) =>
                          this.setState({ Message_Comment })
                        }
                      />
                    </TouchableOpacity>
                  </Row>

                  <TouchableOpacity
                    style={styleCss.compose_btn}
                    onPress={this.sendmessage.bind(this)}
                  >
                    <Row style={styleCss.compose_btn_container}>
                      <Text style={styleCss.compose_btn_text}>
                        {t("Send Message")}
                      </Text>
                    </Row>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          ) : (
            <KeyboardAvoidingView>
              <ScrollView>
                <Row style={styleCss.compose_row}>
                  <Text style={styleCss.compose_text}>{t("Message To")}: </Text>
                </Row>
                <View style={styleCss.compose_view}>
                  <DropDownPicker
                    style={styleCss.compose_dropdown}
                    listItemContainerStyle={{
                      backgroundColor: "#FCFBFB",
                      borderColor: "#EBEBEB",
                      borderWidth: 1,
                      fontFamily: "Poppins-Medium",
                    }}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    placeholder={t("Select Membership")}
                    dropDownContainerStyle={{
                      height: 120,
                      borderColor: "#EBEBEB",
                      borderWidth: 1,
                      position: "relative",
                      top: 0,
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    open={Membershipopen}
                    value={Name}
                    // onSelectItem={(items) => this.getClass(items)}
                    items={staffList}
                    setOpen={this.setMembershipOpen}
                    setValue={this.setMembershipValue}
                    setItems={this.setMembershipItems}
                    mode="BADGE"
                    placeholderStyle={{
                      color: "#777777",
                      fontFamily: "Poppins-Medium",
                      paddingLeft: 12,
                    }}
                  />
                </View>

                <Row style={styleCss.compose_row}>
                  <Text style={styleCss.compose_text}>{t("Subject")}: </Text>
                </Row>

                <Row style={styleCss.compose_subject_row}>
                  <TouchableOpacity style={styleCss.compose_subject_text}>
                    <TextInput
                      style={styleCss.compose_subject_input}
                      placeholder={t("Add Subject")}
                      placeholderTextColor={"#BAB9B9"}
                      value={Message_subject}
                      onChangeText={(Message_subject) =>
                        this.setState({ Message_subject })
                      }
                    />
                  </TouchableOpacity>
                </Row>

                <Row style={styleCss.compose_row}>
                  <Text style={styleCss.compose_text}>
                    {t("Message Comment")}:{" "}
                  </Text>
                </Row>

                <Row style={styleCss.compose_message_row}>
                  <TouchableOpacity style={styleCss.compose_message_text}>
                    <Textarea
                      style={styleCss.compose_message_input}
                      placeholder={t("Add Message")}
                      placeholderTextColor={"#BAB9B9"}
                      multiline={true}
                      numberOfLines={2}
                      value={Message_Comment}
                      onChangeText={(Message_Comment) =>
                        this.setState({ Message_Comment })
                      }
                    />
                  </TouchableOpacity>
                </Row>

                <TouchableOpacity
                  style={styleCss.compose_btn}
                  onPress={this.sendmessage.bind(this)}
                >
                  <Row style={styleCss.compose_btn_container}>
                    <Text style={styleCss.compose_btn_text}>
                      {t("Send Message")}
                    </Text>
                  </Row>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          )}

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

const mapStateToProps = (state) => {
  return {
    loading: state.message.loading,
    staffData: state.message.staffData,
  };
};

const mapDispatchToProps = {
  composeMessagesend,
  fetchMemberAndStaffAction,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(compose);
