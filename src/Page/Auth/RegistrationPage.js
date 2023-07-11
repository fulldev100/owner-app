import React, { Component } from "react";
import {
  Platform,
  Keyboard,
  ActivityIndicator,
  View,
  ScrollView,
  ImageBackground,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Col, Row } from "react-native-easy-grid";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import validate from "validate.js";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { ListItem } from "native-base";

import { RadioButton } from "react-native-paper";
import * as ImageManipulator from "expo-image-manipulator";
import DropDownPicker from "react-native-dropdown-picker";
import { t } from "../../../locals";
var date = moment().format("YYYY-MM-DD");
import styleCss from "../../style";
import { AlertHelper } from "../App/AlertHelper";

var today = new Date();

//Redux
import { connect } from "react-redux";
import {
  fetchMembershipList,
  fetchMembershipClassList,
  signUp,
  loadingStart,
} from "../redux/actions/auth";

class RegistrationPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Membershipopen: false,
      value: [],
      country: "uk",
      modalVisible: false,
      collapsed: true,
      two_collapsed: false,
      three_collapsed: false,
      four_collapsed: false,
      Firstname: "",
      Middlename: "",
      Lastname: "",
      gender: "male",
      DateOfBirth: "",
      Address: "",
      City: "",
      State: "",
      Zipcode: "",
      mobile: "",
      email: "",
      Password: "",
      passwordshow: true,
      SelectStaffMember: "",
      staffData: "",
      Membership: "",
      SelectClass: "2",
      MembershipValidFromDate: date,
      MembershipValidToDate: "",
      updatedProfile: "",
      updated_Profile_name: "",
      updatedProfileForDatabase: "",
      isVisible: false,
      isVisible_valid: false,
      isVisible_TO: false,
      validationError: "",
      imageSource: require("../../images/Camera.png"),
      Class: ["2"],
    };
  }

  async componentDidMount() {
    this.membershipList();
  }

  getPasswordshow = () => {
    if (this.state.passwordshow == true) {
      this.setState({ passwordshow: false });
    } else {
      this.setState({ passwordshow: true });
    }
  };

  async membershipList() {
    const { fetchMembershipList, loadingStart } = this.props;

    loadingStart();

    //Redux action called to fetch membership list
    fetchMembershipList();
    fetchMembershipClassList();
  }

  async signup() {
    const { navigate } = this.props.navigation;

    const { signUp, loadingStart } = this.props;

    var constraints = {
      Firstname: {
        presence: {
          allowEmpty: false,
          message: "^" + t("First name is required"),
        },
        format: {
          pattern: "[A-Za-z ]+",
          message: t("First name is not Valid"),
        },
      },
      Lastname: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Last name is required"),
        },
        format: {
          pattern: "[A-Za-z ]+",
          flags: "i",
          message: "^" + t("Last name is not Valid"),
        },
      },
      gender: {
        presence: {
          allowEmpty: false,
          message: t("must be select either male or female"),
        },
      },
      email: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Email is required"),
        },
        email: {
          message: "^" + t("The email is doesn't look like a valid"),
        },
      },
      Password: {
        presence: {
          allowEmpty: false,
          message: "^" + t("password is required"),
        },
        length: {
          minimum: 6,
          tooShort: "^" + t("Password should be at least 6 character long"),
        },
      },
      Membership: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Please select membership"),
        },
      },
      Class: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Please select class"),
        },
      },
      MembershipValidFromDate: {
        presence: {
          allowEmpty: false,
          message: "",
        },
      },
    };

    const result = validate(
      {
        Firstname: this.state.Firstname,
        Middlename: this.state.Middlename,
        Lastname: this.state.Lastname,
        gender: this.state.gender,
        DateOfBirth: this.state.DateOfBirth,
        Address: this.state.Address,
        City: this.state.City,
        State: this.state.State,
        Zipcode: this.state.Zipcode,
        mobile: this.state.mobile,
        email: this.state.email,
        Password: this.state.Password,
        SelectStaffMember: this.state.SelectStaffMember,
        Membership: this.state.Membership,
        Class: this.state.Class,
        MembershipValidFromDate: this.state.MembershipValidFromDate,
        MembershipValidToDate: this.state.MembershipValidToDate,
      },
      constraints
    );

    if (result) {
      if (result.Firstname) {
        AlertHelper.show("error", t("Error"), result.Firstname);
        this.setState({ visible: true });
        return false;
      }
      if (result.Middlename) {
        AlertHelper.show("error", t("Error"), result.Middlename);
        this.setState({ visible: true });
        return false;
      }
      if (result.Lastname) {
        AlertHelper.show("error", t("Error"), result.Lastname);
        this.setState({ visible: true });
        return false;
      }
      if (result.gender) {
        AlertHelper.show("error", t("Error"), result.gender);
        this.setState({ visible: true });
        return false;
      }
      if (result.DateOfBirth) {
        AlertHelper.show("error", t("Error"), result.DateOfBirth);
        this.setState({ visible: true });
        return false;
      }
      if (result.Address) {
        AlertHelper.show("error", t("Error"), result.Address);
        this.setState({ visible: true });
        return false;
      }
      if (result.City) {
        AlertHelper.show("error", t("Error"), result.City);
        this.setState({ visible: true });
        return false;
      }
      if (result.State) {
        AlertHelper.show("error", t("Error"), result.State);
        this.setState({ visible: true });
        return false;
      }
      if (result.Zipcode) {
        AlertHelper.show("error", t("Error"), result.Zipcode);
        this.setState({ visible: true });
        return false;
      }
      if (result.mobile) {
        AlertHelper.show("error", t("Error"), result.mobile);
        this.setState({ visible: true });
        return false;
      }
      if (result.email) {
        AlertHelper.show("error", t("Error"), result.email);
        this.setState({ visible: true });
        return false;
      }
      if (result.Password) {
        AlertHelper.show("error", t("Error"), result.Password);
        this.setState({ visible: true });
        return false;
      }
      if (result.SelectStaffMember) {
        AlertHelper.show("error", t("Error"), result.SelectStaffMember);
        this.setState({ visible: true });
        return false;
      }
      if (result.Membership) {
        AlertHelper.show("error", t("Error"), result.Membership);
        this.setState({ visible: true });
        return false;
      }
      if (result.Class) {
        AlertHelper.show("error", t("Error"), result.Class);
        this.setState({ visible: true });
        return false;
      }
      if (result.MembershipValidFromDate) {
        AlertHelper.show("error", t("Error"), result.MembershipValidFromDate);
        this.setState({ visible: true });
        return false;
      }
      if (result.MembershipValidToDate) {
        AlertHelper.show("error", t("Error"), result.MembershipValidToDate);
        this.setState({ visible: true });
        return false;
      }
    }

    loadingStart();
    const signupData = {
      first_name: this.state.Firstname,
      middle_name: this.state.Middlename,
      last_name: this.state.Lastname,
      gender: this.state.gender,
      dob: this.state.DateOfBirth,
      address: this.state.Address,
      city: this.state.City,
      state: this.state.State,
      zip: this.state.Zipcode,
      mobile: this.state.mobile,
      email: this.state.email,
      password: this.state.Password,
      staff_member: this.state.SelectStaffMember,
      membership: this.state.Membership,
      class: this.state.Class,
      membership_valid_from: this.state.MembershipValidFromDate,
      hidden_member_image: this.state.updatedProfileForDatabase,
      role: "member",
    };

    if (!result) {
      signUp(signupData, navigate);
    }
  }

  /* date picker DOB */

  handlerDOB = (date) => {
    this.setState({
      isVisible: false,
      DateOfBirth: moment(date).format("YYYY-MM-DD"),
    });
    Keyboard.dismiss();
  };

  showDOB = () => {
    this.setState({ isVisible: true });
    Keyboard.dismiss();
  };

  hideDOB = () => {
    this.setState({
      isVisible: false,
    });
  };

  /* MemberShip From date */

  handler_valid = (date) => {
    var membershipdays = this.props.membershipdays;
    this.setState({
      isVisible_valid: false,
      MembershipValidFromDate: moment(date).format("YYYY-MM-DD"),
    });

    if (membershipdays > 0) {
      var fromDate = moment(date).format("YYYY-MM-DD");
      var toDate = moment(fromDate)
        .add(parseFloat(membershipdays), "days")
        .format("YYYY-MM-DD");
      this.setState({
        MembershipValidToDate: moment(toDate).format("YYYY-MM-DD"),
      });
    }
  };

  show_valid = () => {
    this.setState({ isVisible_valid: true });
    Keyboard.dismiss();
  };

  hide_valid = () => {
    this.setState({
      isVisible_valid: false,
    });
  };

  /* MemberShip From To date */

  handler_To = (date) => {
    this.setState({
      isVisible_TO: false,
      MembershipValidToDate: moment(date).format("D/MM/YYYY"),
    });
  };

  show_To = () => {
    this.setState({ isVisible_TO: true });
    Keyboard.dismiss();
  };

  hide_To = () => {
    this.setState({
      isVisible_TO: false,
    });
  };

  /* proflie Image */

  async changeImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result.cancelled != true) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { height: 1024 } }],
        { compress: 0, format: ImageManipulator.SaveFormat.PNG, base64: true }
      );

      this.setState({
        updatedProfile: manipResult.uri,
        updatedProfileForDatabase: manipResult.base64,
        updated_Profile_name: result.uri.split("/").pop(),
      });
    }

    if (this.state.updatedProfile.length > 0) {
    }
  }

  setMembershipOpen = (Membershipopen) => {
    this.setState({
      Membershipopen,
    });
  };

  setMembershipValue = (callback) => {
    this.setState((state) => ({
      Membership: callback(state.Membership),
    }));
  };

  setMembershipItems = (callback) => {
    this.setState((state) => ({
      items: callback(state.items),
    }));
  };

  async getClass(membershipID) {
    {
      membershipID !== undefined
        ? this.setState({
            Membership: membershipID.value,
          })
        : "";
    }

    const { fetchMembershipClassList } = this.props;

    const Data = {
      membership_id: membershipID.value,
    };

    // Redux action called to get selected membership class list
    fetchMembershipClassList(Data);
  }

  setOpen = (open) => {
    this.setState({
      open,
    });
  };

  setValue = (callback) => {
    
    this.setState((state) => ({
      Class: callback(state.Class),
    }));
  };

  setItems = (callback) => {
    this.setState((state) => ({
      items: callback(state.items),
    }));
  };

  render() {
    const { membershipData, membershipClassData, membershipDays, loading } =
      this.props;

    const {
      Membershipopen,
      open,
      staffData,
      gender,
      Class,
      Firstname,
      Middlename,
      Lastname,
      Address,
      City,
      State,
      Zipcode,
      mobile,
      email,
      Password,
      collapsed,
      two_collapsed,
      three_collapsed,
      four_collapsed,
      Membership,
    } = this.state;
    let staffList = [];
    for (let userObject of staffData) {
      staffList.push({
        label: userObject.staff_name,
        value: userObject.staff_id,
      });
    }
    const membershipList = [];
    for (let userObject of membershipData) {
      membershipList.push({
        label: userObject.membership_label,
        value: userObject.membership_id,
      });
    }
    const classList = [];
    for (let userObject of membershipClassData) {
      classList.push({ label: userObject.name, value: userObject.id });
    }
    const DaysList = [];
    for (let userObject of membershipDays) {
      DaysList.push({
        label: userObject.membership_id,
        date: userObject.membership_days,
      });
    }

    if (!loading) {
      return (
        <View style={styleCss.container}>
          <StatusBar />
          <ImageBackground
            source={require("../../images/Login-BG-Image.png")}
            style={styleCss.signup_bg_image}
          >
            <KeyboardAvoidingView
              behavior={Platform.select({ android: "height", ios: "padding" })}
            >
              <ScrollView style={styleCss.signup_page}>
                <Row style={styleCss.signup_back_arrow}>
                  <TouchableOpacity
                    style={styleCss.signup_back_arrow}
                    onPress={() => this.props.navigation.navigate("LoginPage")}
                  >
                    <Image
                      style={styleCss.signup_icon_image}
                      source={require("../../images/Back.png")}
                    />
                  </TouchableOpacity>
                </Row>

                <Col style={styleCss.signup_image_col}>
                  <Row style={styleCss.signup_image_row}>
                    <Col style={styleCss.signup_image_row_col}>
                      <Col style={styleCss.signup_image_default_logo_col}>
                        {this.state.updatedProfile ? (
                          <Image
                            style={styleCss.signup_image_css}
                            source={{ uri: this.state.updatedProfile }}
                          />
                        ) : (
                          <Image
                            style={styleCss.signup_image}
                            source={require("../../images/Logo.png")}
                          />
                        )}
                      </Col>
                      <TouchableOpacity
                        onPress={() => this.changeImage()}
                        style={styleCss.signup_camera_button}
                      >
                        <Col style={styleCss.signup_camera_button_col}>
                          <Image
                            style={styleCss.signup_camera_button_image}
                            source={this.state.imageSource}
                          />
                        </Col>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </Col>

                <Col style={styleCss.signup_details_container}>
                  <Col style={styleCss.signup_personal_col}>
                    <Collapse
                      isCollapsed={this.state.collapsed}
                      onToggle={(isCollapsed) =>
                        this.setState({ collapsed: !this.state.collapsed })
                      }
                    >
                      {collapsed == true ? (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("Personal Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/up-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      ) : (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("Personal Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/down-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      )}

                      <CollapseBody>
                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Name.png")}
                              />
                            </Col>
                            <Col style={styleCss.signup_required_col}>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                value={Firstname}
                                onChangeText={(Firstname) =>
                                  this.setState({ Firstname })
                                }
                                placeholderTextColor="#ffffff"
                                placeholder={t("First Name")}
                                maxLength={10}
                              ></TextInput>
                            </Col>
                            <Col style={styleCss.signup_required_second_col}>
                              {this.state.Firstname == 0 ? (
                                <View>
                                  <Text style={styleCss.signup_required_text}>
                                    *
                                  </Text>
                                </View>
                              ) : (
                                <View></View>
                              )}
                            </Col>
                          </Row>
                        </ListItem>

                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Name.png")}
                              />
                            </Col>
                            <Col>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                value={Middlename}
                                onChangeText={(Middlename) =>
                                  this.setState({ Middlename })
                                }
                                placeholderTextColor="#ffffff"
                                placeholder={t("Middle Name")}
                                maxLength={10}
                              ></TextInput>
                            </Col>
                          </Row>
                        </ListItem>

                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Name.png")}
                              />
                            </Col>
                            <Col style={styleCss.signup_required_col}>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                value={Lastname}
                                onChangeText={(Lastname) =>
                                  this.setState({ Lastname })
                                }
                                placeholderTextColor="#ffffff"
                                placeholder={t("Last Name")}
                                maxLength={10}
                              ></TextInput>
                            </Col>
                            <Col style={styleCss.signup_required_second_col}>
                              {this.state.Lastname == 0 ? (
                                <View>
                                  <Text style={styleCss.signup_required_text}>
                                    *
                                  </Text>
                                </View>
                              ) : (
                                <View></View>
                              )}
                            </Col>
                          </Row>
                        </ListItem>

                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Gender.png")}
                              />
                            </Col>
                            <Col style={styleCss.signup_radio_col}>
                              <View style={styleCss.signup_radio}>
                                <RadioButton
                                  style={{
                                    borderWidth:
                                      Platform.OS === "ios"
                                        ? "#fffff"
                                        : "#fffff",
                                    uncheckedColor:
                                      Platform.OS === "ios"
                                        ? "#fffff"
                                        : "#fffff",
                                  }}
                                  value="male"
                                  color="#ffffff"
                                  uncheckedColor="#ffffff"
                                  status={
                                    gender === "male" ? "checked" : "unchecked"
                                  }
                                  onPress={() =>
                                    this.setState({ gender: "male" })
                                  }
                                />
                              </View>
                              <Text style={styleCss.signup_radio_text}>
                                {t("Male")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_radio_two_col}>
                              <View style={styleCss.signup_radio}>
                                <RadioButton
                                  style={{
                                    borderWidth:
                                      Platform.OS === "ios"
                                        ? "#fffff"
                                        : "#fffff",
                                    uncheckedColor:
                                      Platform.OS === "ios"
                                        ? "#fffff"
                                        : "#fffff",
                                  }}
                                  value="female"
                                  color="#ffffff"
                                  uncheckedColor="#ffffff"
                                  status={
                                    gender === "female"
                                      ? "checked"
                                      : "unchecked"
                                  }
                                  onPress={() =>
                                    this.setState({ gender: "female" })
                                  }
                                />
                              </View>
                              <Text style={styleCss.signup_radio_text}>
                                {t("Female")}
                              </Text>
                            </Col>
                          </Row>
                        </ListItem>
                      </CollapseBody>
                    </Collapse>
                  </Col>

                  <Col style={styleCss.signup_personal_col}>
                    <Collapse
                      isCollapsed={this.state.three_collapsed}
                      onToggle={(isCollapsed) =>
                        this.setState({
                          three_collapsed: !this.state.three_collapsed,
                        })
                      }
                    >
                      {three_collapsed == true ? (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("Login Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/up-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      ) : (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("Login Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/down-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      )}

                      <CollapseBody>
                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Email-white-512.png")}
                              />
                            </Col>
                            <Col style={styleCss.signup_required_col}>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                placeholderTextColor="#ffffff"
                                onChangeText={(email) =>
                                  this.setState({ email })
                                }
                                value={email}
                                placeholder={t("Email")}
                                maxLength={30}
                              ></TextInput>
                            </Col>
                            <Col style={styleCss.signup_required_second_col}>
                              {this.state.email == 0 ? (
                                <View>
                                  <Text style={styleCss.signup_required_text}>
                                    *
                                  </Text>
                                </View>
                              ) : (
                                <View></View>
                              )}
                            </Col>
                          </Row>
                        </ListItem>

                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Password.png")}
                              />
                            </Col>
                            <Col style={styleCss.signup_eye_col}>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                placeholderTextColor="#ffffff"
                                value={Password}
                                onChangeText={(Password) =>
                                  this.setState({ Password })
                                }
                                placeholder={t("Password")}
                                maxLength={10}
                                secureTextEntry={this.state.passwordshow}
                              ></TextInput>
                            </Col>
                            {/* <Col style={styleCss.signup_required_second_col}>
                              {this.state.Password == 0 ? (
                                <View>
                                  <Text style={styleCss.signup_required_text}>
                                    *
                                  </Text>
                                </View>
                              ) : (
                                <View></View>
                              )}
                            </Col> */}
                            <Col style={styleCss.signup_password_eye_col}>
                              {this.state.passwordshow ? (
                                <TouchableOpacity
                                  onPress={this.getPasswordshow}
                                >
                                  <Image
                                    source={require("../../images/Eye_White.png")}
                                    style={styleCss.password_eye_image}
                                  ></Image>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={this.getPasswordshow}
                                >
                                  <Image
                                    source={require("../../images/EyeClose_White.png")}
                                    style={styleCss.password_eye_image}
                                  ></Image>
                                </TouchableOpacity>
                              )}
                            </Col>
                          </Row>
                        </ListItem>
                      </CollapseBody>
                    </Collapse>
                  </Col>

                  <Col style={styleCss.signup_personal_col}>
                    <Collapse
                      isCollapsed={this.state.two_collapsed}
                      onToggle={(isCollapsed) =>
                        this.setState({
                          two_collapsed: !this.state.two_collapsed,
                        })
                      }
                    >
                      {two_collapsed == true ? (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("Contact Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/up-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      ) : (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("Contact Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/down-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      )}

                      <CollapseBody>
                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Location.png")}
                              />
                            </Col>
                            <Col>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                placeholderTextColor="#ffffff"
                                value={Address}
                                onChangeText={(Address) =>
                                  this.setState({ Address })
                                }
                                placeholder={t("Address")}
                                maxLength={30}
                              ></TextInput>
                            </Col>
                          </Row>
                        </ListItem>
                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Location.png")}
                              />
                            </Col>
                            <Col>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                placeholderTextColor="#ffffff"
                                value={City}
                                onChangeText={(City) => this.setState({ City })}
                                placeholder={t("City")}
                                maxLength={10}
                              ></TextInput>
                            </Col>
                          </Row>
                        </ListItem>
                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Location.png")}
                              />
                            </Col>
                            <Col>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                placeholderTextColor="#ffffff"
                                value={State}
                                onChangeText={(State) =>
                                  this.setState({ State })
                                }
                                placeholder={t("State")}
                                maxLength={10}
                              ></TextInput>
                            </Col>
                          </Row>
                        </ListItem>
                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/Location.png")}
                              />
                            </Col>
                            <Col>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                placeholderTextColor="#ffffff"
                                value={Zipcode}
                                onChangeText={(Zipcode) =>
                                  this.setState({ Zipcode })
                                }
                                placeholder={t("Zip Code")}
                                keyboardType="numeric"
                                maxLength={6}
                              ></TextInput>
                            </Col>
                          </Row>
                        </ListItem>
                        <ListItem style={styleCss.signup_personal_list_item}>
                          <Row>
                            <Col style={styleCss.signup_personal_list_item_col}>
                              <Image
                                style={styleCss.signup_personal_list_item_image}
                                source={require("../../images/call.png")}
                              />
                            </Col>
                            <Col>
                              <TextInput
                                style={styleCss.signup_personal_input_text}
                                placeholderTextColor="#ffffff"
                                placeholder={t("Mobile Number")}
                                value={mobile}
                                onChangeText={(mobile) =>
                                  this.setState({ mobile })
                                }
                                keyboardType="numeric"
                                maxLength={10}
                              ></TextInput>
                            </Col>
                          </Row>
                        </ListItem>
                      </CollapseBody>
                    </Collapse>
                  </Col>

                  <Col style={styleCss.signup_personal_col}>
                    <Collapse
                      isCollapsed={this.state.four_collapsed}
                      onToggle={(isCollapsed) =>
                        this.setState({
                          four_collapsed: !this.state.four_collapsed,
                        })
                      }
                    >
                      {four_collapsed == true ? (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("More Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/up-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      ) : (
                        <CollapseHeader>
                          <Row style={styleCss.signup_personal_collapse_row}>
                            <Col style={styleCss.signup_personal_name_col}>
                              <Text style={styleCss.signup_personal_name_text}>
                                {t("More Information")}
                              </Text>
                            </Col>
                            <Col style={styleCss.signup_personal_image_col}>
                              <Image
                                style={styleCss.signup_personal_image_css}
                                source={require("../../images/down-arrow.png")}
                              />
                            </Col>
                          </Row>
                        </CollapseHeader>
                      )}
                      <CollapseBody>
                        {Platform.OS == "android" ? (
                          <View>
                            <Row
                              style={styleCss.signup_membership_dropdown_row}
                            >
                              <Col
                                style={styleCss.signup_membership_dropdown_col}
                              >
                                <DropDownPicker
                                  listMode="SCROLLVIEW"
                                  scrollViewProps={{
                                    nestedScrollEnabled: true,
                                  }}
                                  placeholder={t("Select Membership")}
                                  dropDownContainerStyle={{
                                    position: 'relative',
                                    top: 0,
                                    height: 130,
                                  }}
                                  open={Membershipopen}
                                  value={Membership}
                                  onSelectItem={(items) => this.getClass(items)}
                                  items={membershipList}
                                  setOpen={this.setMembershipOpen}
                                  setValue={this.setMembershipValue}
                                  setItems={this.setMembershipItems}
                                  theme="DARK"
                                  mode="BADGE"
                                />
                              </Col>
                            </Row>

                            <Row style={styleCss.signup_class_dropdown_row}>
                              <Col style={styleCss.signup_class_dropdown_col}>
                                <DropDownPicker
                                  listMode="SCROLLVIEW"
                                  scrollViewProps={{
                                    nestedScrollEnabled: true,
                                  }}
                                  placeholder={t("Select Class")}
                                  dropDownContainerStyle={{
                                    height: open ? 200 : 0,
                                    zIndex: 50000
                                  }}
                                  dropDownDirection="BOTTOM"
                                  style={{ marginBottom: open ? 250 : 20 }}
                                  open={open}
                                  value={Class}
                                  items={classList}
                                  setOpen={this.setOpen}
                                  setValue={this.setValue}
                                  setItems={this.setItems}
                                  // searchable={true}
                                  theme="DARK"
                                  multiple={true}
                                  mode="BADGE"
                                  badgeDotColors={[
                                    "#e76f51",
                                    "#00b4d8",
                                    "#e9c46a",
                                    "#e76f51",
                                    "#8ac926",
                                    "#00b4d8",
                                    "#e9c46a",
                                  ]}
                                />
                              </Col>
                            </Row>
                          </View>
                        ) : (
                          <View style={styleCss.signup_membership_view_ios}>
                            <View
                              style={styleCss.signup_membership_dropdown_ios}
                            >
                              <DropDownPicker
                                listMode="SCROLLVIEW"
                                scrollViewProps={{
                                  nestedScrollEnabled: true,
                                }}
                                placeholder={t("Membership")}
                                dropDownContainerStyle={{
                                  zIndex: 50000,
                                  height: 120,
                                }}
                                open={Membershipopen}
                                value={Membership}
                                onSelectItem={(items) => this.getClass(items)}
                                items={membershipList}
                                setOpen={this.setMembershipOpen}
                                setValue={this.setMembershipValue}
                                setItems={this.setMembershipItems}
                                theme="DARK"
                                mode="BADGE"
                              />
                            </View>
                            <View style={styleCss.signup_class_dropdown_ios}>
                              <DropDownPicker
                                listMode="SCROLLVIEW"
                                scrollViewProps={{
                                  nestedScrollEnabled: true,
                                }}
                                placeholder={t("Select Class")}
                                dropDownContainerStyle={{
                                  height: open ? 110 : 0,
                                  position: "relative",
                                  top: 0,
                                }}
                                dropDownDirection="BOTTOM"
                                style={{ marginBottom: open ? 20 : 0 }}
                                open={open}
                                value={Class}
                                items={classList}
                                setOpen={this.setOpen}
                                setValue={this.setValue}
                                setItems={this.setItems}
                                theme="DARK"
                                multiple={true}
                                mode="BADGE"
                                badgeDotColors={[
                                  "#e76f51",
                                  "#00b4d8",
                                  "#e9c46a",
                                  "#e76f51",
                                  "#8ac926",
                                  "#00b4d8",
                                  "#e9c46a",
                                ]}
                              />
                            </View>
                          </View>
                        )}

                        <Row style={styleCss.signup_membership_date_row}>
                          <Col style={styleCss.signup_membership_date_col}>
                            <Text style={styleCss.signup_membership_text}>
                              {t("Membership Valid From")} :
                            </Text>
                          </Col>
                          <Col style={styleCss.signup_date_col}>
                            {Platform.OS == "ios" ? (
                              <TextInput
                                style={styleCss.signup_date_input}
                                placeholderTextColor="#ffffff"
                                placeholder={t("Select Date")}
                                editable={false}
                                onTouchStart={this.show_valid}
                                showSoftInputOnFocus={false}
                                onChangeText={(value) =>
                                  this.setState({
                                    MembershipValidFromDate: value,
                                  })
                                }
                                data={DaysList}
                              >
                                {this.state.MembershipValidFromDate}
                              </TextInput>
                            ) : (
                              <TextInput
                                style={styleCss.signup_date_input}
                                placeholderTextColor="#ffffff"
                                placeholder={t("Select Date")}
                                onFocus={this.show_valid}
                                showSoftInputOnFocus={false}
                                onChangeText={(value) =>
                                  this.setState({
                                    MembershipValidFromDate: value,
                                  })
                                }
                                data={DaysList}
                              >
                                {this.state.MembershipValidFromDate}
                              </TextInput>
                            )}
                          </Col>
                          <DateTimePicker
                            isVisible={this.state.isVisible_valid}
                            onConfirm={this.handler_valid}
                            onCancel={this.hide_valid}
                            mode="date"
                            minimumDate={today}
                          />
                        </Row>
                      </CollapseBody>
                    </Collapse>
                  </Col>

                  <TouchableOpacity
                    style={styleCss.signup_signup_btn}
                    onPress={this.signup.bind(this)}
                  >
                    <Row style={styleCss.signup_btn_container}>
                      <Text style={styleCss.signup_signup_text}>
                        {t("Submit")}
                      </Text>
                    </Row>
                  </TouchableOpacity>
                  <Row style={styleCss.signup_account_created_row}>
                    <Col style={styleCss.signup_account_created_col}>
                      <Text style={styleCss.signup_account_created_text}>
                        {t("Already have an Account?")}
                      </Text>
                    </Col>
                    <Col style={styleCss.signup_login_col}>
                      <TouchableOpacity
                        style={styleCss.signup_login_button}
                        onPress={() =>
                          this.props.navigation.navigate("LoginPage")
                        }
                      >
                        <Text style={styleCss.signup_login_button_text}>
                          {t("Login")}
                        </Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </Col>
              </ScrollView>
            </KeyboardAvoidingView>
          </ImageBackground>
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
    membershipData: state.auth.membershipData,
    membershipClassData: state.auth.membershipClassData,
    membershipDays: state.auth.membershipDays,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = {
  fetchMembershipList,
  fetchMembershipClassList,
  signUp,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
