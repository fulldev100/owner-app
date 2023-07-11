import React, { Component } from 'react';
import { SafeAreaView, Modal, BackHandler, TouchableHighlight, ActivityIndicator, RefreshControl, Text, View, Image, FlatList, TouchableOpacity, StatusBar, ScrollView, } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import * as SecureStore from 'expo-secure-store';
import { NavigationEvents } from 'react-navigation';
import { connect } from "react-redux";
import { fetchGrouplist, loadingStart, viewGroup } from "../../redux/actions/groupList";
import { t } from '../../../../locals';
import styleCss from '../../../style'
class groupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageLoading: false,
            modalVisible: false,
            Member_Data: '',
            GroupMember: '',
            Group_name: '',
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

    onRefresh() {
        this.groupListAction();
    }

    componentDidMount() {
        this.groupListAction();
    }

    async groupListAction() {

        const { fetchGrouplist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const groupData = {
            current_user_id: Id,
            access_token: Token,
        };
        // Redux action called for fetch booked class of logined user
        fetchGrouplist(groupData);
    }

    Visible(modalVisible) {
        this.setState({ modalVisible: false });
    }

    async setModalVisible(memberData, name, totalMember) {
        this.setState({ Group_name: name, Member_Data: memberData, GroupMember: totalMember,modalVisible: true });
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
        const { modalVisible } = this.state;
        return (
            <View>
                <Row style={styleCss.group_RowContainer}>
                    <Col style={styleCss.group_ImageCol}>
                        <Col style={styleCss.group_ImageContainer}>
                            <Image onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                                source={item.group_image ? { uri: item.group_image } : null} style={styleCss.GroupImage} />
                            <ActivityIndicator
                                style={styleCss.loading}
                                animating={this.state.ImageLoading}
                                // size="small"
                                color="#102b46"
                            />
                        </Col>
                    </Col>
                    <Col style={styleCss.group_col}>
                        <Col style={styleCss.group_details_col}>
                            <Text numberOfLines={1} style={styleCss.group_Name}>
                                {item.group_name}
                            </Text>
                        </Col>
                        <Col style={styleCss.group_details_col}>
                            <Text style={styleCss.group_member_text}>{item.total_group_member} {t("member")}</Text>
                        </Col>
                    </Col>
                    <Col style={styleCss.group_modal_col}>
                        <TouchableHighlight onPress={() => this.setModalVisible(item.group_member_data, item.group_name, item.total_group_member)}
                            underlayColor={'#F1C40E'}
                            style={styleCss.group_modal_button}>
                            <Text style={styleCss.group_modal_text}>{t("View")}</Text>
                        </TouchableHighlight>
                    </Col>
                </Row>
            </View>
        )
    }
    render() {
        const { modalVisible, Member_Data, Group_name, GroupMember } = this.state;
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
                            <Text style={styleCss.NaveText}>{t("Group List")}</Text>
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
                    <View style={styleCss.mainContainer}>
                        <SafeAreaView style={styleCss.mainContainer}>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.group_id.toString()}
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
                            <Col>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}>

                                    <View style={styleCss.group_modal_main_view}>

                                        <View style={styleCss.group_modal_view}>
                                            <Row style={styleCss.group_modal_row}>
                                                <Col style={styleCss.group_name_col}>
                                                    <Text numberOfLines={1} style={styleCss.group_name_text}>{Group_name}</Text>
                                                </Col>
                                                <Col style={styleCss.group_back_arrow_col}>
                                                    <TouchableOpacity onPress={() => { this.Visible(!modalVisible) }} style={styleCss.group_back_arrow_text}>
                                                        <Image
                                                            style={styleCss.group_close_image}
                                                            source={require('../../../images/Close-blue-512.png')} />
                                                    </TouchableOpacity>
                                                </Col>
                                            </Row>

                                            <View>
                                                <ScrollView>
                                                    {GroupMember == 0 ? (
                                                        <View>
                                                            <Row style={styleCss.group_nodata_row}>
                                                                <Text style={styleCss.group_nodata_text}>{Member_Data}</Text>
                                                            </Row>
                                                        </View>
                                                    ) : (
                                                        <View>
                                                            {Member_Data.map((Member, index) => (
                                                                <View key={index}>
                                                                    <Row style={styleCss.group_member_image_row}>
                                                                        <Col style={styleCss.group_main_ImageCol}>
                                                                            <Col style={styleCss.group_member_image_col}>
                                                                                <Image onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                                                                    onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                                                                                    source={Member.member_image ? { uri: Member.member_image } : null} style={styleCss.SubGroupImage} />
                                                                                <ActivityIndicator
                                                                                    style={styleCss.loading}
                                                                                    animating={this.state.ImageLoading}
                                                                                    // size="small"
                                                                                    color="#102b46"
                                                                                />
                                                                            </Col>
                                                                        </Col>
                                                                        <Col style={styleCss.group_member_name_col}>
                                                                            <Text style={styleCss.group_member_text}>{Member.member_name}</Text>
                                                                        </Col>
                                                                    </Row>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    )}

                                                </ScrollView>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </Col>
                        </SafeAreaView>
                    </View>
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
                            <Text style={styleCss.NaveText}>{t("Group List")}</Text>
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
        data: state.groupList.GroupData,
        loading: state.groupList.loading,
    };
};

const mapDispatchToProps = {
    fetchGrouplist,
    // viewGroup,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(groupList);