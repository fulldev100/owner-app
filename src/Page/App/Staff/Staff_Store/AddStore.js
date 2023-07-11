import React, { Component } from "react";
import {
    BackHandler,
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { NavigationEvents } from 'react-navigation';
import { Col, Row } from 'react-native-easy-grid';
import { staffloginAction } from '../../../../util/action';
import { WebView } from 'react-native-webview';
import { t } from '../../../../../locals';
import styleCss from '../../../../style'
export default class AddStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
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
        this.setState({ loader: true })
        this.stafflogin();

        this.focusListener = navigation.addListener("didFocus", () => {
            this.stafflogin();
        });

        this.setState({ loader: false })
    }

    async stafflogin() {
        const StaffData = {
            "page_name": "store"
        };
        this.setState({ loader: true });
        staffloginAction(StaffData).then(responseJson => {
            if (responseJson.status == 1) {

                this.setState({
                    dataSource: responseJson.result,
                    loader: false,
                });
            } else {
                this.setState({ loader: false });
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
                            <Text style={styleCss.NaveText}>{t("Store")}</Text>
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
                            <Text style={styleCss.NaveText}>{t("Store")}</Text>
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
                </View>

               
            );
        }

    }

}