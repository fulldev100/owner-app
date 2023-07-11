import React, { Component, } from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    BackHandler,
    ActivityIndicator,
    RefreshControl,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Platform,
    TextInput,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import validate from 'validate.js';
import QRCode from 'react-native-qrcode-svg';
import DropdownAlert from 'react-native-dropdownalert';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as ImagePicker from "expo-image-picker";
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
var today = new Date();
import * as ImageManipulator from 'expo-image-manipulator';
import { t } from '../../../../locals';
import styleCss from '../../../style'
//Redux
import { connect } from "react-redux";
import { loadingStart, updateUserdetails, fetchUserdetails } from "../../redux/actions/auth";
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageLoading: false,
            user_first_name: '',
            user_last_name: '',
            user_city: '',
            Email: '',
            PhoneNumber: '',
            Location: '',
            DateOfBirth: '',
            isVisible_DOB: false,
            password: '',
            ConfirmPassword: '',
            updatedProfile: '',
            updated_Profile_base64: '',
            memberId: ""
        };

    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };

    componentDidMount() {
        const { userData } = this.props;
        this.setState({
            user_first_name: userData.first_name,
            user_last_name: userData.last_name,
            user_city: userData.city,
            Email: userData.email,
            PhoneNumber: userData.mobile,
            DateOfBirth: userData.dob,
            Location: userData.address,
            DOB: userData.dob,
            memberId: userData.member_id,
        });
    }

    /* Date of Birth function */

    handler_DOB = (date) => {
        this.setState({
            isVisible_DOB: false,
            DateOfBirth: moment(date).format('YYYY-MM-DD')
        })
    }

    show_DOB = () => {
        this.setState({ isVisible_DOB: true });
        Keyboard.dismiss();
    }

    hide_DOB = () => {
        this.setState({
            isVisible_DOB: false,
        })
    }

    /* update proflie Image */

    async changeImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (result) {
            const manipResult = await ImageManipulator.manipulateAsync(result.uri,
                [{ resize: { height: 1024 } }],
                { compress: 0, format: ImageManipulator.SaveFormat.PNG, base64: true }
            );

            this.setState({
                updatedProfile: manipResult.uri,
                updated_Profile_base64: manipResult.base64,
                updated_Profile_name: result.uri.split('/').pop(),
            });
        }
        if (updatedProfile.length > 0) {
            this.setState({ loader: false })
        }
    }

    /* profile update function */

    async send() {

        var constraints = {

            ConfirmPassword: {
                // presence: {
                //     allowEmpty: false,
                //     message: "^ ConfirmPassword required"
                // },
                equality: {
                    attribute: "password",
                    message: "^" + t("not matched with password")
                }
            },
        };

        Keyboard.dismiss();

        const result = validate({
            user_first_name: this.state.user_first_name,
            user_last_name: this.state.user_last_name,
            user_city: this.state.user_city,
            PhoneNumber: this.state.PhoneNumber,
            Location: this.state.Location,
            DateOfBirth: this.state.DateOfBirth,
            password: this.state.password,
            ConfirmPassword: this.state.ConfirmPassword,
        }, constraints);

        if (result) {
            if (result.user_first_name) {
                this.dropdown.alertWithType('error', t('Error'), result.user_first_name);
                return false;
            }

            if (result.user_last_name) {
                this.dropdown.alertWithType('error', t('Error'), result.user_last_name);
                return false;
            }

            if (result.PhoneNumber) {
                this.dropdown.alertWithType('error', t('Error'), result.PhoneNumber);
                return false;
            }

            if (result.user_city) {
                this.dropdown.alertWithType('error', t('Error'), result.user_city);
                return false;
            }

            if (result.Location) {
                this.dropdown.alertWithType('error', t('Error'), result.Location);
                return false;
            }

            if (result.password) {
                this.dropdown.alertWithType('error', t('Error'), result.password);
                return false;
            }

            if (result.ConfirmPassword) {
                this.dropdown.alertWithType('error', t('Error'), result.ConfirmPassword);
                return false;
            }
        }


        if (!result) {
            const { updateUserdetails, loadingStart } = this.props;
            loadingStart();

            const Id = await SecureStore.getItemAsync("id");
            const Token = await SecureStore.getItemAsync("access_token");

            var updateProfileData = {
                current_user_id: Id,
                member_id: Id,
                access_token: Token,
                first_name: this.state.user_first_name,
                last_name: this.state.user_last_name,
                mobile: this.state.PhoneNumber,
                city_name: this.state.user_city,
                address: this.state.Location,
                birth_date: this.state.DateOfBirth,
                new_password: this.state.password,
                confirm_password: this.state.ConfirmPassword,
                profile_member_image: this.state.updated_Profile_base64,

            }
            updateUserdetails(updateProfileData)
        }
    };

    async singleMember() {
        const { fetchUserdetails, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");
        const memberData = {
          "member_id": Id,
          "access_token": Token,
        };
        fetchUserdetails(memberData)
      }
      
    async memberDataUpdate(){
        const { userData } = this.props;
        this.setState({
            user_first_name: userData.first_name,
            user_last_name: userData.last_name,
            user_city: userData.city,
            Email: userData.email,
            PhoneNumber: userData.mobile,
            DateOfBirth: userData.dob,
            Location: userData.address,
            DOB: userData.dob,
            memberId: userData.member_id,
        });
    }

    onRefresh() {
        this.singleMember();
        this.memberDataUpdate();
    }
    
    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('Dashboard')

    /* Body structure */
    render() {
        const { user_first_name, user_last_name, user_city, Email, PhoneNumber, Location } = this.state;
        const { navigate } = this.props.navigation;
        const { userData, loading } = this.props;

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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomSideBar")} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Menu-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => navigate("Dashboard")} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("View Profile")}</Text>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Workouts')} style={styleCss.workout_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Workout-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')} style={styleCss.message_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Message-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    {(Platform.OS == "ios") ? (
                        <KeyboardAvoidingView style={styleCss.account_keyboard} behavior="padding">
                            <ScrollView
                            refreshControl={
                                <RefreshControl
                                    colors={["#102b46"]}
                                    refreshing={loading}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }>
                                <Row style={styleCss.account_user_row}>
                                    <Col style={styleCss.account_user_col}>
                                        <TouchableOpacity onPress={() => this.changeImage()}>
                                            <Col style={styleCss.account_image_col}>
                                                {(this.state.updatedProfile) ? (<Image onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                                    onLoadEnd={(e) => this.setState({ ImageLoading: false })} style={styleCss.account_image}
                                                    source={{ uri: this.state.updatedProfile }}
                                                />
                                                ) : (<Image style={styleCss.account_image}
                                                    source={{ uri: userData.member_image }}
                                                />)}
                                                <ActivityIndicator
                                                    style={styleCss.loading}
                                                    animating={this.state.ImageLoading}
                                                    size="small"
                                                    color="#102b46"
                                                />
                                            </Col>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <Row style={styleCss.account_name_row}>
                                            <Text style={styleCss.account_name_text}>{userData.first_name} {userData.last_name}</Text>
                                        </Row>
                                        {userData.address || userData.city != 0 ? (
                                            <Row style={styleCss.account_address_row}>
                                                <Text numberOfLines={1} style={styleCss.account_address_text}>{userData.address} , {userData.city}</Text>
                                            </Row>
                                        ) : (
                                            <View></View>
                                        )}

                                        {userData.state != 0 ? (
                                            <Row style={styleCss.account_state_row}>
                                                <Col style={styleCss.account_state_image_col}>
                                                    <Image style={styleCss.account_state_image}
                                                        source={require('../../../images/Location2-Pin-Gray-512.png')}
                                                    />
                                                </Col>
                                                <Col style={styleCss.account_state_col}>
                                                    <Text numberOfLines={1} style={styleCss.account_state_text}>{userData.state}</Text>
                                                </Col>
                                            </Row>
                                        ) : (
                                            <View></View>
                                        )}
                                    </Col>
                                    <Col style={styleCss.account_qr_col}>
                                        <QRCode
                                            value={[{ data: this.state.memberId }]}
                                            size={60}
                                            bgColor='black'
                                            fgColor='white'
                                        />
                                    </Col>
                                </Row>


                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_user.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("First Name")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={user_first_name}
                                                ref={ref => this.firstName = ref}
                                                onChangeText={(user_first_name) => this.setState({ user_first_name })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.firstName.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_user.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Last Name")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={user_last_name}
                                                ref={ref => this.LastName = ref}
                                                onChangeText={(user_last_name) => this.setState({ user_last_name })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.LastName.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_envelope.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_Email_name_col}>
                                        <TextInput style={styleCss.account_Email_TextValue}
                                            editable={false}
                                            placeholder={t("Email")}
                                            placeholderTextColor="#102b46"
                                            maxLength={25}
                                            autoCorrect={false}
                                            value={Email}
                                            onChangeText={(Email) => this.setState({ Email })}>
                                        </TextInput>
                                    </Col>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Call.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Phone Number")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={PhoneNumber}
                                                keyboardType="numeric"
                                                ref={ref => this.PhoneNumber = ref}
                                                onChangeText={(PhoneNumber) => this.setState({ PhoneNumber })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.PhoneNumber.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Location.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("City")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={user_city}
                                                ref={ref => this.City = ref}
                                                onChangeText={(user_city) => this.setState({ user_city })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.City.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Location.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Location")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={Location}
                                                ref={ref => this.Location = ref}
                                                onChangeText={(Location) => this.setState({ Location })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.Location.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_DOB.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TextInput
                                            placeholder={t("Date Of Birth")}
                                            placeholderTextColor="#102b46"
                                            onTouchStart={this.show_DOB}
                                            showSoftInputOnFocus={false}
                                            onChangeText={(value) => this.setState({ DateOfBirth: value })}
                                            style={styleCss.account_TextValue}
                                            ref={ref => this.DateOfBirth = ref}>
                                            {this.state.DateOfBirth}
                                        </TextInput>
                                    </Col>
                                    <DateTimePicker
                                        isVisible={this.state.isVisible_DOB}
                                        onConfirm={this.handler_DOB}
                                        onCancel={this.hide_DOB}
                                        maximumDate={new Date()}
                                        mode='date'
                                    />
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.DateOfBirth.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Password.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("New Password")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                // value={password}
                                                ref={ref => this.NewPassword = ref}
                                                secureTextEntry
                                                onChangeText={(password) => this.setState({ password })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.NewPassword.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Password.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Confirm Password")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                secureTextEntry
                                                ref={ref => this.ConfirmPassword = ref}
                                                onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.ConfirmPassword.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <TouchableOpacity style={styleCss.account_btn} onPress={this.send.bind(this)}>
                                    <Row style={styleCss.account_btn_container} >
                                        <Text style={styleCss.account_btn_text}>{t("Save")}</Text>
                                    </Row>
                                </TouchableOpacity>
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
                            }>
                                <Row style={styleCss.account_user_row}>
                                    <Col style={styleCss.account_user_col}>
                                        <TouchableOpacity onPress={() => this.changeImage()}>
                                            <Col style={styleCss.account_image_col}>
                                                {(this.state.updatedProfile) ? (<Image onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                                    onLoadEnd={(e) => this.setState({ ImageLoading: false })} style={styleCss.account_image}
                                                    source={{ uri: this.state.updatedProfile }}
                                                />
                                                ) : (<Image style={styleCss.account_image}
                                                    source={{ uri: userData.member_image }}
                                                />)}
                                                <ActivityIndicator
                                                    style={styleCss.loading}
                                                    animating={this.state.ImageLoading}
                                                    size="small"
                                                    color="#102b46"
                                                />
                                            </Col>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <Row style={styleCss.account_name_row}>
                                            <Text style={styleCss.account_name_text}>{userData.first_name} {userData.last_name}</Text>
                                        </Row>
                                        {userData.address || userData.city != 0 ? (
                                            <Row style={styleCss.account_address_row}>
                                                <Text numberOfLines={1} style={styleCss.account_address_text}>{userData.address} , {userData.city}</Text>
                                            </Row>
                                        ) : (
                                            <View></View>
                                        )}

                                        {userData.state != 0 ? (
                                            <Row style={styleCss.account_state_row}>
                                                <Col style={styleCss.account_state_image_col}>
                                                    <Image style={styleCss.account_state_image}
                                                        source={require('../../../images/Location2-Pin-Gray-512.png')}
                                                    />
                                                </Col>
                                                <Col style={styleCss.account_state_col}>
                                                    <Text numberOfLines={1} style={styleCss.account_state_text}>{userData.state}</Text>
                                                </Col>
                                            </Row>
                                        ) : (
                                            <View></View>
                                        )}
                                    </Col>
                                    <Col style={styleCss.account_qr_col}>
                                        <QRCode
                                            value={[{ data: this.state.memberId }]}
                                            size={60}
                                            bgColor='black'
                                            fgColor='white'
                                        />
                                    </Col>
                                </Row>


                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_user.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("First Name")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={user_first_name}
                                                ref={ref => this.firstName = ref}
                                                onChangeText={(user_first_name) => this.setState({ user_first_name })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.firstName.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_user.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Last Name")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={user_last_name}
                                                ref={ref => this.LastName = ref}
                                                onChangeText={(user_last_name) => this.setState({ user_last_name })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.LastName.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_envelope.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_Email_name_col}>
                                        <TextInput style={styleCss.account_Email_TextValue}
                                            editable={false}
                                            placeholder={t("Email")}
                                            placeholderTextColor="#102b46"
                                            maxLength={25}
                                            autoCorrect={false}
                                            value={Email}
                                            onChangeText={(Email) => this.setState({ Email })}>
                                        </TextInput>
                                    </Col>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Call.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Phone Number")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={PhoneNumber}
                                                keyboardType="numeric"
                                                ref={ref => this.PhoneNumber = ref}
                                                onChangeText={(PhoneNumber) => this.setState({ PhoneNumber })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.PhoneNumber.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Location.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("City")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={user_city}
                                                ref={ref => this.City = ref}
                                                onChangeText={(user_city) => this.setState({ user_city })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.City.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Location.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Location")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                value={Location}
                                                ref={ref => this.Location = ref}
                                                onChangeText={(Location) => this.setState({ Location })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.Location.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_DOB.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TextInput
                                            placeholder={t("Date Of Birth")}
                                            placeholderTextColor="#102b46"
                                            onTouchStart={this.show_DOB}
                                            showSoftInputOnFocus={false}
                                            onChangeText={(value) => this.setState({ DateOfBirth: value })}
                                            style={styleCss.account_TextValue}
                                            ref={ref => this.DateOfBirth = ref}>
                                            {this.state.DateOfBirth}
                                        </TextInput>
                                    </Col>
                                    <DateTimePicker
                                        isVisible={this.state.isVisible_DOB}
                                        onConfirm={this.handler_DOB}
                                        onCancel={this.hide_DOB}
                                        maximumDate={new Date()}
                                        mode='date'
                                    />
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.DateOfBirth.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Password.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("New Password")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                // value={password}
                                                ref={ref => this.NewPassword = ref}
                                                secureTextEntry
                                                onChangeText={(password) => this.setState({ password })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.NewPassword.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={styleCss.account_profile_name_row}>
                                    <Col style={styleCss.account_profile_image_col}>
                                        <Image source={require('../../../images/Account_Password.png')} style={styleCss.account_profile_image} />
                                    </Col>
                                    <Col style={styleCss.account_profile_name_col}>
                                        <TouchableOpacity>
                                            <TextInput style={styleCss.account_TextValue}
                                                placeholder={t("Confirm Password")}
                                                placeholderTextColor="#102b46"
                                                maxLength={25}
                                                autoCorrect={false}
                                                secureTextEntry
                                                ref={ref => this.ConfirmPassword = ref}
                                                onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}>
                                            </TextInput>
                                        </TouchableOpacity>
                                    </Col>
                                    <TouchableOpacity style={styleCss.account_Textedit} onPress={() => this.ConfirmPassword.focus()}>
                                        <Col style={styleCss.account_Textedit_col}>
                                            <Image source={require('../../../images/Account_Edit.png')} style={styleCss.account_Textedit_image} />
                                        </Col>
                                    </TouchableOpacity>
                                </Row>

                                <TouchableOpacity style={styleCss.account_btn} onPress={this.send.bind(this)}>
                                    <Row style={styleCss.account_btn_container} >
                                        <Text style={styleCss.account_btn_text}>{t("Save")}</Text>
                                    </Row>
                                </TouchableOpacity>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    )}
                    <DropdownAlert ref={ref => this.dropdown = ref} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomSideBar")} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Menu-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => navigate("Dashboard")} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("View Profile")}</Text>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Workouts')} style={styleCss.workout_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Workout-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')} style={styleCss.message_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Message-white.png')}
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
        userData: state.auth.userData,
        loading: state.auth.loading,
    };
};

const mapDispatchToProps = {
    updateUserdetails,
    fetchUserdetails,
    loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);