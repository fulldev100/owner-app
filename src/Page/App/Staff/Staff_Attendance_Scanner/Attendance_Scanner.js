import React, { Component } from "react";
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image,
    BackHandler,
    Button,
    KeyboardAvoidingView
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import { NavigationEvents, StackActions, NavigationActions } from 'react-navigation';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { t } from '../../../../../locals';
import DropdownAlert from 'react-native-dropdownalert';
import styleCss from '../../../../style'

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Attendancedetails' })],
});
export default class attendance extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            memberid: '',
            scanned: false,
            loader: false,
            QrPress: false,
            hasCameraPermission: null,
        };
    }

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

    _handleBackButtonClick = () => this.props.navigation.navigate('staffDashboard')

    componentDidMount() {
        this.scannerPermission();
    }

    async scannerPermission() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === "granted" });
    }

    _onPress_QrScan = () => {
        this.setState({
            QrPress: true
        });
    }

    handleBarCodeScanned = ({ type, data }) => {
        if (isNaN(data)) {
            this.setState({ QrPress: false, scanned: true, lastScannedUrl: data });
            this.dropdown.alertWithType('error', t('Error'), t('This is a wrong QR code Please scan members QR code'));
        } else {
            this.setState({ QrPress: false, scanned: true, lastScannedUrl: data });
            this.props.navigation.navigate('Attendancedetails', { memberidkey: data, })
        };
    };

    renderBarcodeReader = () => {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styleCss.attendance_scanner_view}>
                <NavigationEvents
                    onWillFocus={this._onFocus}
                    onWillBlur={this._onBlurr}
                />
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}>
                    <BarcodeMask edgeColor="#62B1F6" showAnimatedLine lineAnimationDuration={2000} />
                </BarCodeScanner>
                {scanned && (
                    <Button
                        title={t("Tap to Scan Again")}
                        onPress={() => this.setState({ scanned: false })}
                    />
                )}
            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        const { QrPress } = this.state;
        return (
            <View style={styleCss.container}>
                <NavigationEvents
                    onWillFocus={this._onFocus}
                    onWillBlur={this._onBlurr}
                />
                <Row style={styleCss.NaveBar}>
                    <Col>
                        <TouchableOpacity style={styleCss.menu_col} onPress={() => this.props.navigation.navigate("StaffCustomSideBar")}>
                            <Image
                                style={styleCss.Naveicon}
                                source={require("../../../../images/Menu-white.png")}
                            />
                        </TouchableOpacity>
                    </Col>

                    <Col>
                        <TouchableOpacity onPress={() => navigate("staffDashboard")} style={styleCss.back_arrow}>
                            <Image style={styleCss.Naveicon}
                                source={require('../../../../images/Back-Arrow-White.png')}
                            />
                        </TouchableOpacity>
                    </Col>

                    <Col
                        style={styleCss.attendance_scanner_nav_col}
                    >
                        <Text style={styleCss.NaveText}>{t("Attendance")}</Text>
                    </Col>

                    <Col>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Addworkout")}
                            style={styleCss.attendance_scanner_nav_second_col}
                        >
                            <Image
                                style={styleCss.Naveicon}
                                source={require("../../../../images/Workout-White.png")}
                            />
                        </TouchableOpacity>
                    </Col>

                    <Col>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Message")}
                            style={styleCss.attendance_scanner_nav_thired_col}
                        >
                            <Image
                                style={styleCss.Naveicon}
                                source={require("../../../../images/Message-white.png")}
                            />
                        </TouchableOpacity>
                    </Col>
                </Row>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                        {QrPress ? (
                            <View style={{ flex: 1 }}>
                                {this.renderBarcodeReader()}
                            </View>
                        ) : (
                            <View style={styleCss.attendance_scanner_second_view}>
                                <TouchableOpacity
                                    onPress={this._onPress_QrScan}
                                    activeOpacity={3}
                                    style={styleCss.attendance_scanner_button}
                                >
                                    <Text style={styleCss.attendance_scanner_button_text}>{t("Scan QR")}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
                <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
        );
    }
}