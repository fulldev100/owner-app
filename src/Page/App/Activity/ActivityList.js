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
    TouchableHighlight
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
import { connect } from "react-redux";
import { fetchActivitylist, loadingStart } from "../../redux/actions/activity";

class activitylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            dataSource: [],
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
        this.ActivityList();
    }
    async ActivityList() {
        const { fetchActivitylist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const activityData = {
            current_user_id: Id,
            access_token: Token,
        };
        // Redux action called for fetch booked class of logined user
        fetchActivitylist(activityData);
    }
    onRefresh() {
        this.ActivityList();
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
            <View style={styleCss.activity_mainContainer}>

                <View style={styleCss.activity_RowContainer}>
                    <Col>
                        <Row style={styleCss.activity_video_button_row}>
                            <Col>
                                <Text style={styleCss.activity_title}>{item.activity_title}</Text>
                            </Col>
                            <Col style={styleCss.activity_video_button_col}>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('activityvideo', { ActivityVideo: item.activity_video_data })}
                                    underlayColor={'#F1C40E'}
                                    style={styleCss.activity_video}>
                                    <Text style={styleCss.activity_video_button_text}>{t("Videos")}</Text>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                        <Row style={styleCss.activity_category_row}>
                            <Col style={styleCss.activity_category_image_col}>
                                <Image style={styleCss.activity_category_image}
                                    source={require('../../../images/Category.png')}
                                />
                            </Col>
                            <Col style={styleCss.activity_category_text_col}>
                                <Text style={styleCss.activity_category_name}>{item.activity_category}</Text>
                            </Col>
                        </Row>
                        <Row style={styleCss.activity_trainer_row}>
                            <Col style={styleCss.activity_trainer_col}>
                                <Image style={styleCss.activity_trainer_image}
                                    source={require('../../../images/General-Training.png')}
                                />
                            </Col>
                            <Col style={styleCss.activity_trainer_text_col}>
                                <Text style={styleCss.activity_trainer_text}>{item.activity_trainer}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styleCss.activity_membership_list_col}>
                                <Image style={styleCss.activity_membership_list_image}
                                    source={require('../../../images/Membership-Type-gray-512.png')}
                                />
                            </Col>
                            <Col>
                                <Text style={styleCss.activity_membership_list_text}>{item.membership_list}</Text>
                            </Col>
                        </Row>
                        <View style={styleCss.activity_tranier_view_big_image}>
                            <Image
                                style={styleCss.activity_trainer_big_image}
                                source={require('../../../images/trainer.jpg')}
                            />
                        </View>
                    </Col>
                </View>
            </View>
        );
    };

    render() {
        const { data, loading } = this.props;
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
                            <Text style={styleCss.NaveText}>{t("Activity List")}</Text>
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
                    <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.activity_id.toString()}
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
                            <Text style={styleCss.NaveText}>{t("Activity List")}</Text>
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
        data: state.activity.activityData,
        loading: state.activity.loading,
    };
};

const mapDispatchToProps = {
    fetchActivitylist,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(activitylist);