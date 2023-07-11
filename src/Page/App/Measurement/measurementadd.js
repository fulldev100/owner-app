import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    BackHandler,
    ActivityIndicator,
    RefreshControl,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Platform,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import validate from 'validate.js';
import { Col, Row } from 'react-native-easy-grid';
import { Calendar } from 'react-native-calendars';
import { NavigationEvents } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from "react-redux";
import { add_measurement, view_measurement, loadingStart } from "../../redux/actions/measurement";
import moment from 'moment';
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
const today = moment().format('YYYY-MM-DD');

class addmeasurement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: '',
            date: '',
            dataSource: [],
            Height: '',
            Weight: '',
            Chest: '',
            Waist: '',
            Thigh: '',
            Arms: '',
            Fat: '',
        };
        this.onDayPress = this.onDayPress.bind(this);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };

    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('Dashboard')

    async onDayPress(date) {
        this.setState({
            selectedDate: date.dateString,
        });
    }

    async addMeasurement() {


        var constraints = {
            Date: {
                presence: {
                    allowEmpty: false,
                    message: "^" + t("Date") + " " + t("is required")
                },
            },
            // Height: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^" + t("Height is required")
            //     },
            // },
            // Weight: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^" + t("Weight is required")
            //     },
            // },
            // Chest: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^" + t("Chest is required")
            //     },
            // },
            // Waist: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^" + t("Waist is required")
            //     },
            // },
            // Thigh: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^" + t("Thigh is required")
            //     },
            // },
            // Arms: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^" + t("Arms is required")
            //     },
            // },
            // Fat: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^" + t("Fat is required")
            //     },
            // },
        };

        const result = validate({
            Date: this.state.selectedDate,
            Height: this.state.Height,
            Weight: this.state.Weight,
            Chest: this.state.Chest,
            Waist: this.state.Waist,
            Thigh: this.state.Thigh,
            Arms: this.state.Arms,
            Fat: this.state.Fat,
        }, constraints);

        if (result) {

            if (result.Date) {
                this.dropdown.alertWithType('warn', 'warning', result.Date);
                return false;
            }

            if (result.Height) {
                this.dropdown.alertWithType('error', 'Error', result.Height);
                return false;
            }

            if (result.Weight) {
                this.dropdown.alertWithType('error', 'Error', result.Weight);
                return false;
            }
            if (result.Chest) {
                this.dropdown.alertWithType('error', 'Error', result.Chest);
                return false;
            }
            if (result.Waist) {
                this.dropdown.alertWithType('error', 'Error', result.Waist);
                return false;
            }
            if (result.Thigh) {
                this.dropdown.alertWithType('error', 'Error', result.Thigh);
                return false;
            }

            if (result.Arms) {
                this.dropdown.alertWithType('error', 'Error', result.Arms);
                return false;
            }
            if (result.Fat) {
                this.dropdown.alertWithType('error', 'Error', result.Fat);
                return false;
            }
        }

        if (!result) {

            const { add_measurement, loadingStart } = this.props;
            loadingStart();
            const Id = await SecureStore.getItemAsync("id");
            const Token = await SecureStore.getItemAsync("access_token");
            var measurementData = {
                current_user_id: Id,
                member_id: Id,
                access_token: Token,
                Height: this.state.Height,
                Weight: this.state.Weight,
                Chest: this.state.Chest,
                Waist: this.state.Waist,
                Thigh: this.state.Thigh,
                Arms: this.state.Arms,
                Fat: this.state.Fat,
                result_date: this.state.selectedDate,

            }
            add_measurement(measurementData);
            this.setState({ selectedDate: '',Height: '',Weight: '',Chest: '',Waist: '',Thigh: '',Arms: '', Fat: '', });
        }
    }

    onRefresh() {
        this.setState({ selectedDate: '', });
        this.onDayPress();
    }


    render() {
        const { Height, Weight, Chest, Thigh, Arms, Waist, Fat } = this.state;
        const { loading } = this.props;
        const mark = {
            [this.state.selectedDate]: {
                customStyles: {
                    container: {
                        backgroundColor: '#C40404',
                        borderWidth: 2,
                        borderColor: '#102B46'
                    },
                    text: {
                        color: '#fff',
                    }
                }
            },
        };
        if (!loading) {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    {(Platform.OS == "ios") ? (
                        <KeyboardAvoidingView style={styleCss.measurement_keyboard} behavior="padding" enabled keyboardVerticalOffset={100}>
                            <ScrollView
                            >
                                <Row style={styleCss.measurement_header_text_row}>
                                    <Text style={styleCss.measurement_header_text}>{t("Select Date")}:</Text>
                                </Row>
                                <Col>
                                    <Calendar
                                        monthFormat={'MMMM, yyyy'}
                                        markingType={'custom'}
                                        minDate={today}
                                        date={this.state.date}
                                        onDayPress={(date) => { this.onDayPress(date) }}
                                        markedDates={mark}
                                        theme={{
                                            textSectionTitleColor: '#b6c1cd',
                                            textSectionTitleDisabledColor: '#102b46',
                                            selectedDayTextColor: '#ffffff',
                                            todayTextColor: '#00adf5',
                                            dayTextColor: '#2d4150',
                                            textDisabledColor: '#d9e1e8',
                                            dotColor: '#00adf5',
                                            selectedDotColor: '#ffffff',
                                            arrowColor: '#102b46',
                                            disabledArrowColor: '#d9e1e8',
                                            monthTextColor: '#102b46',
                                            indicatorColor: '#102b46',
                                            textDayFontFamily: 'Poppins-Medium',
                                            textMonthFontFamily: 'Poppins-SemiBold',
                                            textDayHeaderFontFamily: 'Poppins-Medium',
                                            textDayFontSize: 16,
                                            textMonthFontSize: 16,
                                            textDayHeaderFontSize: 16
                                        }}

                                    />
                                    <Col style={styleCss.measurement_field_col}>
                                        <Row style={styleCss.measurement}>
                                            <Col>
                                                <Text style={styleCss.measurement_header_text}>{t("Add Measurement")}</Text>
                                            </Col>

                                        </Row>
                                        <Row style={styleCss.measurement_container}>
                                            <Col>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Height")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Height}
                                                            placeholder={t('Centimeter')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input}
                                                            maxLength={3}
                                                            onChangeText={(Height) => this.setState({ Height })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={styleCss.measurement_container_col}>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Weight")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Weight}
                                                            placeholder={t('Kg')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Weight) => this.setState({ Weight })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>
                                        <Row style={styleCss.measurement_container}>
                                            <Col>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Chest")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Chest}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Chest) => this.setState({ Chest })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={styleCss.measurement_container_col}>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Waist")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Waist}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Waist) => this.setState({ Waist })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>

                                        <Row style={styleCss.measurement_container}>
                                            <Col>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Thigh")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Thigh}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Thigh) => this.setState({ Thigh })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={styleCss.measurement_container_col}>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Arms")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Arms}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Arms) => this.setState({ Arms })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>

                                        <Row style={{ height: 40, marginBottom: '8%', }}>
                                            <Col>
                                                <Row style={{ borderWidth: 1, borderRadius: 30, width: "45%", backgroundColor: '#fcfbfb', borderColor: '#ecebeb' }}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Fat")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Fat}
                                                            placeholder={t('Percentage')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Fat) => this.setState({ Fat })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <TouchableOpacity style={styleCss.measurement_btn} onPress={this.addMeasurement.bind(this)}>
                                            <Row style={styleCss.measurement_btn_container} >
                                                <Text style={styleCss.measurement_btn_text}>{t("Save")}</Text>
                                            </Row>
                                        </TouchableOpacity>
                                    </Col>
                                </Col>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    ) : (
                        <KeyboardAvoidingView>
                            <ScrollView
                            >
                                <Row style={styleCss.measurement_header_text_row}>
                                    <Text style={styleCss.measurement_header_text}>{t("Select Date")}:</Text>
                                </Row>
                                <Col>
                                    <Calendar
                                        monthFormat={'MMMM, yyyy'}
                                        markingType={'custom'}
                                        minDate={today}
                                        date={this.state.date}
                                        onDayPress={(date) => { this.onDayPress(date) }}
                                        markedDates={mark}
                                        theme={{
                                            textSectionTitleColor: '#b6c1cd',
                                            textSectionTitleDisabledColor: '#102b46',
                                            selectedDayTextColor: '#ffffff',
                                            todayTextColor: '#00adf5',
                                            dayTextColor: '#2d4150',
                                            textDisabledColor: '#d9e1e8',
                                            dotColor: '#00adf5',
                                            selectedDotColor: '#ffffff',
                                            arrowColor: '#102b46',
                                            disabledArrowColor: '#d9e1e8',
                                            monthTextColor: '#102b46',
                                            indicatorColor: '#102b46',
                                            textDayFontFamily: 'Poppins-Medium',
                                            textMonthFontFamily: 'Poppins-SemiBold',
                                            textDayHeaderFontFamily: 'Poppins-Medium',
                                            textDayFontSize: 16,
                                            textMonthFontSize: 16,
                                            textDayHeaderFontSize: 16
                                        }}

                                    />
                                    <Col style={styleCss.measurement_field_col}>
                                        <Row style={styleCss.measurement}>
                                            <Col>
                                                <Text style={styleCss.measurement_header_text}>{t("Add Measurement")}</Text>
                                            </Col>

                                        </Row>
                                        <Row style={styleCss.measurement_container}>
                                            <Col>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Height")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Height}
                                                            placeholder={t('Centimeter')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input}
                                                            maxLength={3}
                                                            onChangeText={(Height) => this.setState({ Height })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={styleCss.measurement_container_col}>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Weight")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Weight}
                                                            placeholder={t('Kg')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Weight) => this.setState({ Weight })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>
                                        <Row style={styleCss.measurement_container}>
                                            <Col>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Chest")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Chest}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Chest) => this.setState({ Chest })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={styleCss.measurement_container_col}>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Waist")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Waist}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Waist) => this.setState({ Waist })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>

                                        <Row style={styleCss.measurement_container}>
                                            <Col>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Thigh")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Thigh}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Thigh) => this.setState({ Thigh })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={styleCss.measurement_container_col}>
                                                <Row style={styleCss.measurement_field_container}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Arms")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Arms}
                                                            placeholder={t('Inches')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Arms) => this.setState({ Arms })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>

                                        <Row style={{ height: 40, marginBottom: '8%', }}>
                                            <Col>
                                                <Row style={{ borderWidth: 1, borderRadius: 30, width: "45%", backgroundColor: '#fcfbfb', borderColor: '#ecebeb' }}>
                                                    <Col style={styleCss.measurement_sub_field_container}>
                                                        <Text style={styleCss.measurement_field_text}>{t("Fat")}</Text>
                                                    </Col>
                                                    <Col style={styleCss.measurement_sub_field_container_two}>
                                                        <TextInput
                                                            value={Fat}
                                                            placeholder={t('Percentage')}
                                                            keyboardType="numeric"
                                                            style={styleCss.measurement_field_input} maxLength={3} onChangeText={(Fat) => this.setState({ Fat })}>

                                                        </TextInput>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <TouchableOpacity style={styleCss.measurement_btn} onPress={this.addMeasurement.bind(this)}>
                                            <Row style={styleCss.measurement_btn_container} >
                                                <Text style={styleCss.measurement_btn_text}>{t("Save")}</Text>
                                            </Row>
                                        </TouchableOpacity>
                                    </Col>
                                </Col>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    )}
                    <DropdownAlert ref={ref => this.dropdown = ref} />
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
        loading: state.measurement.loading,
    };
};

const mapDispatchToProps = {
    add_measurement,
    view_measurement,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(addmeasurement);