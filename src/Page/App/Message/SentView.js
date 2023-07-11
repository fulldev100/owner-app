import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
    ScrollView
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { GiftedChat, Bubble, Time } from "react-native-gifted-chat";
import { Col, Row } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from "../../../style.js";
import { connect } from "react-redux";
import { fetchSentviewmessagelist, loadingStart, sentMessagesend } from "../../redux/actions/message";
class SentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: '',
            Title: '',
            dataSource: [],
            messages: [],
            user_id: '',
            User_Image: '',
        };
    }


    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };

    async UNSAFE_componentWillMount() {
        let userID = await SecureStore.getItemAsync("id");

        this.setState({
            user_id: userID,
        });
    }

    componentDidMount() {
        const { navigation } = this.props;
        const photo = this.props.navigation.getParam('userImage',);
        this.setState({ User_Image: photo })
        const title = this.props.navigation.getParam('messagetitle',);
        this.setState({ Title: title })
        const receiverid = this.props.navigation.getParam('receiverid',);
        this.setState({ ReceiverId: receiverid })
        const messageid = this.props.navigation.getParam('messagekey',);
        this.setState({ MessageId: messageid })
        this.replymessageList()
    }

    async replymessageList() {
        const { fetchSentviewmessagelist, loadingStart } = this.props;
        loadingStart();
        const viewMessageID = this.props.navigation.getParam('viewMessageID',);
        const messageID = this.props.navigation.getParam('messagekey',);
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const sentView = {
            "message_id": messageID,
            "from": "sendbox",
            "current_user_id": Id,
            "view_message_id": viewMessageID,
            "access_token": Token,
        };
        fetchSentviewmessagelist(sentView)
    };

    async onSend(messages = []) {

        const { sentMessagesend, loadingStart } = this.props;
        loadingStart();

        const userID = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const { MessageId, ReceiverId } = this.state;

        const sendmessage = {

            "message_id": MessageId,
            "reply_message_content": messages[0].text,
            "receiver_id": ReceiverId,
            "current_user_id": userID,
            "access_token": Token,
        };

        messages._id = MessageId;
        messages.user = {
            _id: userID,
        };
        sentMessagesend(sendmessage)
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: '#f1c40e',
                        fontFamily: 'Poppins-Medium'
                    },
                    left: {
                        color: '#f1c40e',
                        fontFamily: 'Poppins-Medium'
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#102b46',
                    },
                    left: {
                        backgroundColor: '#102b46',
                    },
                }}
            />


        );
    }

    renderTime = (props) => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: '#f1c40e',
                        fontFamily: 'Poppins-Medium'
                    },
                    right: {
                        color: '#f1c40e',
                        fontFamily: 'Poppins-Medium'
                    },
                }}
            />
        );
    };

    onRefresh() {
        this.replymessageList()
    }

    render() {

        const { user_id, User_Image } = this.state;
        const { ViewData, loading } = this.props;
        return (
            <View style={styleCss.container}>
                <View style={styleCss.inboxview_view}>
                    <Row>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Sent")} >
                            <Col style={styleCss.back_arrow}>
                                <Image style={styleCss.back_arrow_image}
                                    source={require('../../../images/view_msg_arrow.png')}
                                />
                            </Col>
                        </TouchableOpacity>
                        <Col style={styleCss.inboxview_title_col}>
                            <Text numberOfLines={1} style={styleCss.inboxview_text_col}>{this.state.Title}</Text>
                        </Col>
                    </Row>
                </View>
                <GiftedChat
                    textInputStyle={{
                        fontFamily: 'Poppins-Medium'
                    }}
                    placeholder={t("Type a message")}
                    inverted={false}
                    isAnimated={true}
                    renderBubble={this.renderBubble}
                    renderTime={this.renderTime}
                    messages={ViewData}
                    showUserAvatar
                    onSend={(messages) => this.onSend(messages)}
                    alwaysShowSend={true}
                    user={{
                        _id: parseInt(user_id),
                        avatar: User_Image,
                    }}
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

    }
}

const mapStateToProps = (state) => {
    return {
        ViewData: state.message.ViewData,
        loading: state.message.loading,
    };
};

const mapDispatchToProps = {
    fetchSentviewmessagelist,
    sentMessagesend,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(SentView);