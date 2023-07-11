import React, { Component } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    RefreshControl,
    SafeAreaView,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Modal,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { t } from '../../../../locals';
import styleCss from '../../../style';
import { connect } from "react-redux";
import { fetchNoticelist, loadingStart } from "../../redux/actions/notice";
const { member, token } = "";
class Notice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            dataSource: [],
            noticedata: [],
            show: false,
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
        this.noticeList();
    }

    onRefresh() {
        this.noticeList();
    }


    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }
    showPopup = (data) => {
        this.setState({ noticedata: data});
        this.setState({show: true});
    }
    closePopup = () => {
        this.setState({ show: false });
    }
    _handleBackButtonClick = () => this.props.navigation.navigate('Dashboard')

    async noticeList() {
        const { fetchNoticelist, loadingStart } = this.props;
        loadingStart();
        const Member = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");
        const noticeData = {
            "current_user_id": Member,
            "access_token": Token,
        };
        fetchNoticelist(noticeData);
    }

    renderItem = ({ item }) => {
        return (
            <View style={styleCss.container}>

                <Row style={styleCss.notice_row}>
                    <Col style={styleCss.notice_image_col}>
                        <View style={styleCss.notice_image_view}>
                            <Image style={styleCss.notice_image}
                                source={require("../../../images/Logo.png")}
                            />
                        </View>
                    </Col>
                    <Col style={styleCss.notice_time_col}>
                        <View style={styleCss.notice_time_view}>
                            <Text numberOfLines={1} style={styleCss.notice_title_text}>{item.notice_title}</Text>
                            <Text style={styleCss.notice_date_text}>{item.start_date}  |  {item.notice_for} </Text>
                        </View>
                    </Col>
                    <Col style={styleCss.notice_view_button_col}>
                        <TouchableHighlight onPress={() => this.showPopup(item)}
                            underlayColor={'#F1C40E'}
                            style={styleCss.notice_view_button}>
                            <Text style={styleCss.notice_view_button_text}>{t("View")}</Text>
                        </TouchableHighlight>
                    </Col>
                </Row>
            </View>

        );
    }
    render() {

        const { navigate } = this.props.navigation;
        const { data, loading } = this.props;
        const { show, noticedata } = this.state;
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
                            <TouchableOpacity onPress={() => navigate('Dashboard')} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Notice List")}</Text>
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
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.notice_id.toString()}
                            renderItem={this.renderItem}
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
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={show} >
                            <View style={styleCss.notice_modal_main_view}>
                                <View style={styleCss.notice_modal_view}>
                                    <Row style={styleCss.notice_modal_row}>
                                        <Col style={styleCss.notice_modal_title_col}>
                                            <Text style={styleCss.notice_modal_title_text}>{noticedata.notice_title}</Text>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity style={styleCss.notice_modal_close} onPress={this.closePopup}>
                                                <Image
                                                    style={styleCss.notice_modal_close_image}
                                                    source={require('../../../images/Close-blue-512.png')} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Row>
                                    <Row style={styleCss.notice_modal_row_two}>

                                        <Col>
                                            <Text style={styleCss.notice_modal_text_label}>{t("Start Date")}</Text>
                                            <Text style={styleCss.notice_modal_text}>{noticedata.start_date}</Text>
                                        </Col>
                                        <Col>
                                            <Text style={styleCss.notice_modal_text_label}>{t("End Date")}</Text>
                                            <Text style={styleCss.notice_modal_text}>{noticedata.end_date}</Text>
                                        </Col>
                                    </Row>
                                    <Row style={styleCss.notice_modal_row_three}>

                                        <Image source={require("../../../images/Member_icon.png")} style={styleCss.notice_modal_member_image} />

                                        <Text style={styleCss.notice_modal_member_text}>{noticedata.notice_for}</Text>
                                    </Row>
                                    <Row style={styleCss.modal_container_row}>
                                        <ScrollView style={styleCss.notice_container_text}><Text style={{ color: '#777777', fontFamily: 'Poppins-Regular', fontSize: 15 }}>{noticedata.notice_content}</Text></ScrollView>
                                    </Row>
                                </View>
                            </View>
                        </Modal>
                    </SafeAreaView>
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
                            <TouchableOpacity onPress={() => navigate('Dashboard')} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Notice List")}</Text>
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
        data: state.notice.noticeData,
        loading: state.notice.loading,
    };
};

const mapDispatchToProps = {
    fetchNoticelist,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
