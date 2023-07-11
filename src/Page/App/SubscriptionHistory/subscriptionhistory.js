import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    RefreshControl,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { singleMemberAction } from '../../../util/action.js';
import { connect } from "react-redux";
import { fetchSubscriptionlist, loadingStart } from "../../redux/actions/subscription";
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
class SubscriptionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historySource: [],
            collapsed: false,
            ImageLoading: false,
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
        this.subscriptionHistory();
    }

    async subscriptionHistory() {
        const { fetchSubscriptionlist, loadingStart } = this.props
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");
        const historyData = {
            "current_user_id": Id,
            "access_token": Token,
        };
        fetchSubscriptionlist(historyData);
    }


    onRefresh() {
        this.subscriptionHistory();
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

    render() {
        const { loading, data, userData } = this.props;
        const { navigate } = this.props.navigation;
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
                            <Text style={styleCss.NaveText}>{t("Subscription History")}</Text>
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
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                colors={["#102b46"]}
                                refreshing={loading}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >

                        <Row style={styleCss.subscription_details_row}>
                            <Col style={styleCss.subscription_image_col}>
                                <Col style={styleCss.subscription_image_two_col}>
                                    <Image
                                        onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                        onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                                        style={styleCss.subscription_image_css}
                                        source={{ uri: userData.member_image }} />
                                    <ActivityIndicator
                                        style={styleCss.loading}
                                        animating={this.state.ImageLoading}
                                        size="small"
                                        color="#102b46"
                                    />
                                </Col>
                            </Col>
                            <Col style={styleCss.subscription_text_col}>
                                <Row style={styleCss.subscription_name_row}>
                                    <Text style={styleCss.subscription_name_text}>{userData.first_name} {userData.last_name}</Text>
                                </Row>
                                <Row style={styleCss.subscription_address_row}>
                                    <Text numberOfLines={1} style={styleCss.subscription_address_text}>{userData.address}, {userData.city}</Text>
                                </Row>
                                {userData.state !== "" ? (
                                    <Row style={styleCss.subscription_location_row}>
                                        <Col style={styleCss.subscription_location_col}>
                                            <Image style={styleCss.subscription_location_image}
                                                source={require('../../../images/Location2-Pin-Gray-512.png')}
                                            />

                                        </Col>
                                        <Col style={styleCss.subscription_state_col}>
                                            <Text style={styleCss.subscription_state_text}>{userData.state}</Text>
                                        </Col>
                                    </Row>
                                ) : (<View></View>)}
                            </Col>
                        </Row>

                        {(data.length !== 0) ? (
                            <View>
                                {data.map((Data, index) => (

                                    <Col style={styleCss.subscription_collaps_col} key={index}>
                                        <Collapse>
                                            <CollapseHeader>
                                                <Row style={styleCss.subscription_header_row}>
                                                    <Col style={styleCss.subscription_header_col}>
                                                        <Text style={styleCss.subscription_header_text}>{Data.membership_name}</Text>
                                                    </Col>
                                                    <Col style={styleCss.subscription_header_two_col}>
                                                        <Image style={styleCss.subscription_header_image}
                                                            source={require('../../../images/right-arrow.png')} />
                                                    </Col>
                                                </Row>
                                            </CollapseHeader>

                                            <CollapseBody>
                                                <Row style={styleCss.subscription_body_top_row}>
                                                    <Col style={styleCss.subscription_body_image_col}>
                                                        <Image style={styleCss.subscription_body_image}
                                                            source={require('../../../images/subscription_menu.png')} />
                                                    </Col>
                                                    <Col style={styleCss.subscription_body_text_col}>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text}>{t("MemberShip Title")}</Text>
                                                        </Row>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text_two}>{Data.membership_name}</Text>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row style={styleCss.subscription_body_row}>
                                                    <Col style={styleCss.subscription_body_image_col}>
                                                        <Image style={styleCss.subscription_body_image}
                                                            source={require('../../../images/subscription_payment.png')} />
                                                    </Col>
                                                    <Col style={styleCss.subscription_body_text_col}>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text}>{t("Amount")}</Text>
                                                        </Row>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text_two}>{Data.currency_symbol} {Data.membership_amount}</Text>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row style={styleCss.subscription_body_row}>
                                                    <Col style={styleCss.subscription_body_image_col}>
                                                        <Image style={styleCss.subscription_body_image}
                                                            source={require('../../../images/date-yellow-512.png')} />
                                                    </Col>
                                                    <Col style={styleCss.subscription_body_text_col}>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text}>{t("Membership Start Date")}</Text>
                                                        </Row>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text_two}>{Data.start_date}</Text>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row style={styleCss.subscription_body_row}>
                                                    <Col style={styleCss.subscription_body_image_col}>
                                                        <Image style={styleCss.subscription_body_image}
                                                            source={require('../../../images/date-yellow-512.png')} />
                                                    </Col>
                                                    <Col style={styleCss.subscription_body_text_col}>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text}>{t("Membership End Date")}</Text>
                                                        </Row>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text_two}>{Data.end_date}</Text>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row style={styleCss.subscription_body_row}>
                                                    <Col style={styleCss.subscription_body_image_col}>
                                                        <Image style={styleCss.subscription_body_image}
                                                            source={require('../../../images/Status-Yellow-512.png')} />
                                                    </Col>
                                                    <Col style={styleCss.subscription_body_text_col}>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text}>{t("Membership Status")}</Text>
                                                        </Row>
                                                        <Row style={styleCss.subscription_body_text_row}>
                                                            <Text style={styleCss.subscription_body_text_two}>{Data.membership_status}</Text>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                            </CollapseBody>

                                        </Collapse>
                                    </Col>
                                ))}
                            </View>
                        ) : (
                            <View style={styleCss.subscription_nodata_container}>
                                <Text style={styleCss.subscription_nodata_text}>{t("Subscription History")}</Text>
                                <Text style={styleCss.subscription_nodata_text}>{t("Data is")}</Text>
                                <Text style={styleCss.subscription_nodata_text}>{t("Not available")}</Text>
                            </View>)}
                    </ScrollView>
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
                            <Text style={styleCss.NaveText}>{t("Subscription History")}</Text>
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
        data: state.subscription.subscriptionData,
        loading: state.subscription.loading,
        userData: state.auth.userData,
    };
};

const mapDispatchToProps = {
    fetchSubscriptionlist,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionHistory);