import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import PDFReader from 'rn-pdf-reader-js';
import { Col, Row } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
import { connect } from "react-redux";
import { fetchInvoice, sendInvoice, loadingStart } from "../../redux/actions/feesPayment";
import WebView from 'react-native-webview';


class viewinvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageLoading: true,
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

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }
    componentDidMount() {
        this.viewInvoice();
    }

    onRefresh() {
        this.viewInvoice();
    }
  
    LoadingIndicatorView() {
        return <ActivityIndicator style={styleCss.loading} size="large" color="#102b46" />
    }

    async viewInvoice() {
        const { fetchInvoice, loadingStart } = this.props;
        loadingStart();
        const invoice_key = this.props.navigation.getParam('memberinvoicekey',);
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const Invoice = {
            "current_user_id": Id,
            "access_token": Token,
            "invoice_type": "membership_invoice",
            "invoice_id": invoice_key,
        };
        fetchInvoice(Invoice);
    }
    async sendMail() {
        const { sendInvoice, loadingStart } = this.props;
        loadingStart();
        const data = this.props.navigation.getParam('memberinvoicekey',);
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const send_Invoice = {
            "current_user_id": Id,
            "access_token": Token,
            "invoice_id": data,
        };
        sendInvoice(send_Invoice)
    }
    
    LoadingIndicatorView() {
        return <ActivityIndicator style={styleCss.loading} size="large" color="#102b46" />
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('Feespayment')
    render() {
        
        const { paymentInvoice, loading } = this.props;
        var googlepdf = "https://docs.google.com/gview?embedded=true&url=" + paymentInvoice
        const { navigate } = this.props.navigation;

        if (!loading && paymentInvoice !== '') {
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
                            <Text style={styleCss.NaveText}>{t("Invoice")}</Text>
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
                        contentContainerStyle={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                colors={["#102b46"]}
                                refreshing={this.state.loader}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >
                        <WebView
                            source={{ uri: googlepdf }}
                            renderLoading={this.LoadingIndicatorView}
                            startInLoadingState={true}

                        />
                    </ScrollView>

                    <View>
                        <Row style={styleCss.viewinvoice_row}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.sendMail();
                                }}
                                underlayColor={'#102B46'}
                                style={styleCss.viewinvoice_button}>
                                <Text style={styleCss.viewinvoice_text}>{t("Send Mail")}</Text>
                            </TouchableHighlight>
                        </Row>
                    </View>
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
                            <Text style={styleCss.NaveText}>{t("Invoice")}</Text>
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
        paymentInvoice: state.feesPayment.Invoice,
        loading: state.feesPayment.loading,
    };
};

const mapDispatchToProps = {
    fetchInvoice,
    sendInvoice,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(viewinvoice);