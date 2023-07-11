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
    StatusBar,
    SafeAreaView,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from "react-redux";
import { fetchMembershiplist, loadingStart } from "../../redux/actions/memberShipType";
import { NavigationEvents } from 'react-navigation';
import { t } from '../../../../locals';
import styleCss from '../../../style'
class MemberShipList extends Component {
    constructor(props) {
        super(props);
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
        this.memberShipList();
    }

    async memberShipList() {
        const { fetchMembershiplist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const MemberShipListData = {
            current_user_id: Id,
            access_token: Token,
        };
        // Redux action called for fetch booked class of logined user
        fetchMembershiplist(MemberShipListData);
    }
    onRefresh() {
        this.memberShipList();
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

    // render item for flatlist
    renderItem = ({ item }) => {
        return (
            <View style={styleCss.mainContainer}>

                <View>
                    <Row style={styleCss.membership_RowContainer}>
                        <Col style={styleCss.membership_ImageCol}>
                            <Col style={styleCss.membership_ImageContainer}>
                                <Image source={item.membership_image ? { uri: item.membership_image } : null} style={styleCss.MembershipImage} />
                            </Col>
                        </Col>
                        <Col style={styleCss.MembershipDetailContainer}>
                            <Col>
                                <Text style={styleCss.MemberShipName}>
                                    {item.membership_name}
                                </Text>
                            </Col>
                            <Col>
                                <Row style={styleCss.memberShipTime}>
                                    <Col style={styleCss.memberShipTime_col}>
                                        <Text style={styleCss.memberShipTime_text}>{item.membership_period} {t("Days")}</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                        <Col style={styleCss.membership_amount_col}>
                            <Text style={styleCss.membership_amount_text}>
                                {item.currency_symbol} {item.membership_amount}
                            </Text>
                        </Col>
                    </Row>
                </View>
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
                            <Text style={styleCss.NaveText}>{t("Membership List")}</Text>
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
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.membership_id.toString()}
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
                    </SafeAreaView>
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
                            <Text style={styleCss.NaveText}>{t("Membership List")}</Text>
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
        data: state.membershipType.MemberShipData,
        loading: state.membershipType.loading,
    };
};

const mapDispatchToProps = {
    fetchMembershiplist,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberShipList);