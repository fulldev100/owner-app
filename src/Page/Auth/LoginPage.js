import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import { ActivityIndicator } from "react-native-paper";
import validate from "validate.js";
import { t } from "../../../locals";
import styleCss from "../../style";
import { AlertHelper } from '../App/AlertHelper';
// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';
// import * as Permissions from 'expo-permissions';

//Redux
import { connect } from "react-redux";
import { login, loadingStart } from "../redux/actions/auth";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class LoginPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  /* state function */

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      Password: "",
      visible: false,
      validationError: "",
      passwordshow: true,
      token: '',
      notification: ''
    };
  }

  /* hide and show password */
  getPasswordshow = () => {
    if (this.state.passwordshow == true) {
      this.setState({ passwordshow: false })
    } else {
      this.setState({ passwordshow: true })
    }
  }

  /*data load before screen using this function */

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    this.registerForPushNotifications();
    this.requestPermissionsAsync();
    Notifications.addNotificationReceivedListener(this._handleNotification);
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);

  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  _handleNotificationResponse = response => {
    if (response.notification.request.content.data.type == "Notice") {
      this.props.navigation.navigate("Notice");
    } else if (response.notification.request.content.data.type == "Workouts") {
      this.props.navigation.navigate("Workouts");
    } else if (response.notification.request.content.data.type == "Nutritionplan") {
      this.props.navigation.navigate("Nutritionplan");
    } else if (response.notification.request.content.data.type == "viewinvoice") {
      this.props.navigation.navigate("viewinvoice");
    } else if (response.notification.request.content.data.type == "Message") {
      this.props.navigation.navigate("Message");
    } else if (response.notification.request.content.data.type == "") {
      this.props.navigation.navigate("myHome");
    }
  };

  requestPermissionsAsync = async () => {
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }


  /* for get device token */

  registerForPushNotifications = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      this.setState({ token: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }


  // registerForPushNotifications = async () => {
  //   const { status: existingStatus } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;
  //   console.log('permission status' + existingStatus);

  //   if (existingStatus !== 'granted') {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }

  //   console.log('second permission status' + existingStatus);

  //   if (finalStatus !== 'granted') {
  //     return;
  //   }

  //   let token = await Notifications.getExpoPushTokenAsync();

  //   this.setState({ token: token.data });
  //   console.log(this.state.token);
  // }

  /* login function */
  async login() {
    const { login, loadingStart } = this.props;
    const { navigate } = this.props.navigation;

    var constraints = {
      email: {
        presence: {
          allowEmpty: false,
          message: "^" + t("UserID or Email is required"),
        },
      },
      Password: {
        presence: {
          allowEmpty: false,
          message: "^" + t("password is required"),
        },
      },
    };

    const result = validate(
      { email: this.state.email, Password: this.state.Password },
      constraints
    );

    if (result) {a
      if (result.email) {
        AlertHelper.show("error", t("Error"), result.email);
        return false;
      }
      if (result.Password) {
        AlertHelper.show("error", t("Error"), result.Password);
        return false;
      }
    }

    const loginData = {
      username: this.state.email,
      password: this.state.Password,
      device_token: this.state.token
    };
    if (!result) {
      loadingStart();

      // Redux action call to login
      login(loginData, navigate);
    }
  }
  handleBackPress() {
    Alert.alert(t("Hold on!"), t("Are you sure you want to exit app?"), [
      {
        text: t("No"),
        onPress: () => null,
        style: "cancel",
      },
      { text: t("Yes"), onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }

  handleLogout() {
    this.props.navigation.navigate("Login");
  }

  /* Design section */
  render() {
    const { loading } = this.props;
    const { email, Password, token } = this.state;

    if (!loading) {
      return (
        <View style={styleCss.loign_container}>
          <ImageBackground
            source={require("../../images/Login-BG-Image.png")}
            style={styleCss.login_bg_image}
          >
            <StatusBar />
            <KeyboardAvoidingView
              behavior={Platform.select({ android: "height", ios: "padding" })}
              style={styleCss.loign_container}
            >
              <ScrollView style={styleCss.loign_page}>
                <Col style={styleCss.login_email_col}>
                  <Col style={styleCss.login_image_col}>
                    <Image
                      style={styleCss.login_image}
                      source={require("../../images/Logo.png")}
                    />
                  </Col>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Name.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_email}
                        value={email}
                        onChangeText={(email) =>
                          this.setState({ email: email })
                        }
                        maxLength={30}
                        placeholderTextColor="#ffffff"
                        placeholder={"UserID or Email"}
                      />
                    </Col>
                  </Row>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Password.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_password}
                        value={Password}
                        onChangeText={(Password) =>
                          this.setState({ Password: Password })
                        }
                        placeholderTextColor="#ffffff"
                        placeholder={t("Password")}
                        secureTextEntry={this.state.passwordshow}
                      />
                    </Col>
                    <Col style={styleCss.login_input_password_show}>
                      {this.state.passwordshow ? (<TouchableOpacity
                        onPress={this.getPasswordshow}>
                        <Image source={require('../../images/Eye_White.png')}
                          style={styleCss.password_eye_image}></Image>
                      </TouchableOpacity>) : (<TouchableOpacity
                        onPress={this.getPasswordshow}>
                        <Image source={require('../../images/EyeClose_White.png')}
                          style={styleCss.password_eye_image}></Image>
                      </TouchableOpacity>)}
                    </Col>
                  </Row>

                  <TouchableOpacity
                    style={styleCss.login_btn}
                    onPress={this.login.bind(this)}
                  >
                    <Row style={styleCss.login_btn_container}>
                      <Text style={styleCss.login_btn_text}>{t("Login")}</Text>
                    </Row>
                  </TouchableOpacity>
                  <Row style={styleCss.login_signup_container}>
                    <TouchableOpacity
                      style={styleCss.login_signup_button}
                      onPress={() =>
                        this.props.navigation.navigate("RegistrationPage")
                      }
                    >
                      <Text style={styleCss.login_signup_text}>
                        {"Signup in 24hr-fitness.eu"}
                      </Text>
                    </TouchableOpacity>
                  </Row>
                </Col>
              </ScrollView>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styleCss.login_loding_container}>
          <ImageBackground
            source={require("../../images/Login-BG-Image.png")}
            style={styleCss.login_bg_image}
          >
            <StatusBar />
            <KeyboardAvoidingView
              behavior={Platform.select({ android: "height", ios: "padding" })}
              style={styleCss.loign_container}
            >
              <ScrollView style={styleCss.loign_page}>
                <Col style={styleCss.login_email_col}>
                  <Col style={styleCss.login_image_col}>
                    <Image
                      style={styleCss.login_image}
                      source={require("../../images/Logo.png")}
                    />
                  </Col>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Email-white-512.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_email}
                        value={email}
                        onChangeText={(email) =>
                          this.setState({ email: email })
                        }
                        maxLength={30}
                        placeholderTextColor="#ffffff"
                        placeholder={t("Email")}
                      />
                    </Col>
                  </Row>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Password.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_password}
                        value={Password}
                        onChangeText={(Password) =>
                          this.setState({ Password: Password })
                        }
                        placeholderTextColor="#ffffff"
                        placeholder={t("Password")}
                        secureTextEntry
                      />
                    </Col>
                  </Row>

                  <TouchableOpacity
                    style={styleCss.login_btn}
                    onPress={this.login.bind(this)}
                  >
                    <Row style={styleCss.login_btn_container}>
                      <Text style={styleCss.login_btn_text}>{t("Login")}</Text>
                    </Row>
                  </TouchableOpacity>
                  <Row style={styleCss.login_signup_container}>
                    <TouchableOpacity
                      style={styleCss.login_signup_button}
                      onPress={() =>
                        this.props.navigation.navigate("RegistrationPage")
                      }
                    >
                      <Text style={styleCss.login_signup_text}>
                        {t("Signup with Email")}
                      </Text>
                    </TouchableOpacity>
                  </Row>
                </Col>
              </ScrollView>
            </KeyboardAvoidingView>
          </ImageBackground>
          <ActivityIndicator
            style={styleCss.login_loader}
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
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = {
  login,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
