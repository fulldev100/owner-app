import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    RefreshControl,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
import { connect } from "react-redux";
import { fetchfeespaymentlist, loadingStart } from "../../redux/actions/feesPayment";
class feespayment extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            paymentSource: [],
            loader: false,
        };

    }

    componentDidMount() {
        this.paymentList();
    }

    onRefresh() {
        this.paymentList();
    }
    async paymentList() {

        const { fetchfeespaymentlist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const payment = {
            current_user_id: Id,
            access_token: Token,
        };
        // Redux action called for fetch booked class of logined user
        fetchfeespaymentlist(payment);
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

    _handleBackButtonClick = () => this.props.navigation.navigate('Dashboard')


    // render item for flatlist
    renderItem = ({ item }) => {
        const { navigate } = this.props.navigation;
        return (
            <View style={styleCss.loign_container}>
                <Row style={styleCss.feespayment_data_row}>
                    <Col style={styleCss.feespayment_data_col}>
                        <Col>
                            <Text numberOfLines={1} style={styleCss.feespayment_data_col_text}>{item.membership_title}</Text>
                        </Col>
                        <Row>
                            <Col style={styleCss.feespayment_details_col}>
                                <Text style={styleCss.feespayment_details_text}>{t("Amount")}</Text>
                            </Col>
                            <Col style={styleCss.feespayment_details_col_two}>
                                <Text style={styleCss.feespayment_details_text}>:</Text>
                            </Col>
                            <Col style={styleCss.feespayment_details_col_three}>
                                <Text style={styleCss.feespayment_details_text}>{item.currency_symbol} {item.amount}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styleCss.feespayment_details_col}>
                                <Text style={styleCss.feespayment_details_text}>{t("Due Amount")}</Text>
                            </Col>
                            <Col style={styleCss.feespayment_details_col_two}>
                                <Text style={styleCss.feespayment_details_text}>:</Text>
                            </Col>
                            <Col style={styleCss.feespayment_details_col_three}>
                                <Text style={styleCss.feespayment_details_text}>{item.currency_symbol} {item.due_amount}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styleCss.feespayment_details_col}>
                                <Text style={styleCss.feespayment_details_text}>{t("Status")}</Text>
                            </Col>
                            <Col style={styleCss.feespayment_details_col_two}>
                                <Text style={styleCss.feespayment_details_text}>:</Text>
                            </Col>
                            <Col style={styleCss.feespayment_details_col_three}>
                                <Text numberOfLines={1} style={styleCss.feespayment_details_text}>{item.payment_status}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={styleCss.feespayment_data_col_two}>
                        <Row>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('viewpayment', { membershipData: item })}
                                underlayColor={'#F1C40E'}
                                style={styleCss.feespayment_button}>
                                <Text style={styleCss.feespayment_button_text}>{t("View Details")}</Text>
                            </TouchableHighlight>
                        </Row>
                        <Row>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('viewinvoice', { memberinvoicekey: item.invoice_id, membership_name: item.membership_title })}
                                underlayColor={'#F1C40E'}
                                style={styleCss.feespayment_button}>
                                <Text style={styleCss.feespayment_button_text}>{t("View Invoice")}</Text>
                            </TouchableHighlight>
                        </Row>
                    </Col>
                </Row>
            </View>
        );
    };

    render() {

        const { navigate } = this.props.navigation;
        const { data, loading } = this.props;

        if (!loading) {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
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
                    <Row>
                        <FlatList
                            data={data}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.invoice_id.toString()}
                            ListEmptyComponent={
                                <EmptyComponent title={t("Data not available")} />
                            }
                            refreshControl={
                                <RefreshControl
                                    colors={["#102b46"]}
                                    refreshing={loading}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                        />
                    </Row>
                </View>
            );
        } else {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
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
// empty component
const EmptyComponent = ({ title }) => (
    <View style={styleCss.emptyContainer}>
        <Text style={styleCss.emptyText}>{title}</Text>
    </View>
);

const mapStateToProps = (state) => {
    return {
        data: state.feesPayment.feesPaymentData,
        loading: state.feesPayment.loading,
    };
};

const mapDispatchToProps = {
    fetchfeespaymentlist,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(feespayment);