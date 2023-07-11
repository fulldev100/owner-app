import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    SafeAreaView
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { t } from '../../../../../locals';
import { staffloginAction } from '../../../../util/action';
import { WebView } from 'react-native-webview';
import styleCss from '../../../../style'
export default class StaffMemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            ImageLoading: false,
            dataSource: '',
        };

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
        const { navigation } = this.props;
        this.setState({ loader: true });

        this.stafflogin();
        this.focusListener = navigation.addListener("didFocus", () => {
            this.stafflogin();
        });
        this.setState({ loader: false });

    }

    async stafflogin() {
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");
        const StaffData = {
            "current_user_id": Id,
            "page_name": "staff_member"
        };
        this.setState({ loader: true });
        staffloginAction(StaffData).then(responseJson => {
            if (responseJson.status == 1) {
                this.setState({
                    dataSource: responseJson.result,
                    loader: false,
                });
            } else {
            }
        });
    }

    onRefresh() {
        this.stafflogin();
    }

    LoadingIndicatorView() {
        return <ActivityIndicator style={styleCss.loading} size="large" color="#102b46" />
    }

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('staffDashboard')

    render() {
        const { loader, dataSource } = this.state;
        const { navigate } = this.props.navigation;
        if (!loader) {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    <Row style={styleCss.NaveBar}>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("StaffCustomSideBar")} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Menu-white.png')}
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

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Staff Member")}</Text>
                        </Col>

                        <Col>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Attendance_Scanner")}
                                style={styleCss.workout_col}
                            >
                                <Image
                                    style={styleCss.Naveicon}
                                    source={require("../../../../images/barcode-scanner.png")}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffMessage')} style={styleCss.message_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Message-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <WebView
                        source={{ uri: dataSource }}
                        renderLoading={this.LoadingIndicatorView}
                        // startInLoadingState={true}
                        // javaScriptEnabled={false}
                        // domStorageEnabled={true}
                    />
                </View>
            );
        } else {
            return (
                <SafeAreaView style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    <Row style={styleCss.NaveBar}>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("StaffCustomSideBar")} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Menu-white.png')}
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

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Staff Member")}</Text>
                        </Col>

                        <Col>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Attendance_Scanner")}
                                style={styleCss.workout_col}
                            >
                                <Image
                                    style={styleCss.Naveicon}
                                    source={require("../../../../images/barcode-scanner.png")}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffMessage')} style={styleCss.message_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Message-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                    </Row>

                    <ActivityIndicator
                        style={styleCss.loading}
                        size="large"
                        color="#102b46"
                    />
                </SafeAreaView>

            );
        }
    }

}