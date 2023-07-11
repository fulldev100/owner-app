import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    RefreshControl,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
import { connect } from "react-redux";
import { loadingStart } from "../../redux/actions/feesPayment";
class viewpayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Membership_Data: '',
        }
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

    componentDidMount() {
        const data = this.props.navigation.getParam('membershipData',);
        this.setState({ Membership_Data: data })
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('Feespayment')

    render() {

        const { navigate } = this.props.navigation;
        const { loading } = this.props;
        const { Membership_Data } = this.state;
        if (!loading) {
            return (
                <View style={styleCss.container}>
                    <Row style={styleCss.NaveBar}>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomSideBar")} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Menu-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => navigate('Feespayment')} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Fees Payment")}</Text>
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
                    >
                        <Row style={styleCss.viewpayment_row}>
                            <Text style={styleCss.viewpayment_row_text}>{t("Payment Details")}: </Text>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/subscription_menu.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Title")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.membership_title}</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/Account-Yellow-512.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Member Name")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.member_name}</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/subscription_payment.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Amount")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.currency_symbol} {Membership_Data.amount}</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/subscription_payment.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Paid Amount")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.currency_symbol} {Membership_Data.paid_amount}</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/subscription_payment.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Due Amount")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.currency_symbol} {Membership_Data.due_amount}</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/subscription_Date.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Membership Start Date")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.membership_valid_from}</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/subscription_Date.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Membership End Date")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.membership_valid_to}</Text>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={styleCss.viewpayment_details_row}>
                            <Col style={styleCss.viewpayment_image_col}>
                                <Image style={styleCss.viewpayment_image}
                                    source={require('../../../images/sand-clock-Yellow-512.png')}
                                />
                            </Col>
                            <Col style={styleCss.viewpayment_details_col}>
                                <Row style={styleCss.viewpayment_details_text_row}>
                                    <Text style={styleCss.viewpayment_details_label}>{t("Payment Status")}</Text>
                                </Row>
                                <Row style={styleCss.viewpayment_details_text_row_two}>
                                    <Text style={styleCss.viewpayment_details_text}>{Membership_Data.payment_status}</Text>
                                </Row>
                            </Col>
                        </Row>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styleCss.container}>
                    <Row style={styleCss.NaveBar}>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("CustomSideBar")} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Menu-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => navigate('Feespayment')} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Fees Payment")}</Text>
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
        loading: state.feesPayment.loading,
    };
};

const mapDispatchToProps = {
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(viewpayment);