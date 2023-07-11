import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from "../../../style.js";
import { connect } from "react-redux";
import { fetchInboxmessagelist, loadingStart } from "../../redux/actions/inboxMessage";
class inbox extends Component {

    constructor(props) {
        super(props);
    }


    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };
    componentDidMount() {
        this.inboxmessagelist()
    }

    async inboxmessagelist() {
        const { fetchInboxmessagelist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const InboxData = {
            "current_user_id": Id,
            "access_token": Token,
        };
        fetchInboxmessagelist(InboxData);

    }
    onRefresh() {
        this.inboxmessagelist();
    }

    // render item for flatlist
    renderItem = ({ item }) => {
        const { navigate } = this.props.navigation;
        return (
            <View style={styleCss.mainContainer}>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InboxView', { messagekey: item.message_id, viewMessageID: item.view_message_id, messageimage: item.gmgt_user_avatar_image, messagetext: item.description, messagetitle: item.subject, replyid: item.replay_id, receiverid: item.receiver_id, userImage: item.current_user_image })}>
                        <Row style={styleCss.inbox_row}>
                            <Col style={styleCss.inbox_col}>
                                <Col style={styleCss.inbox_image_col}>
                                    <Image style={styleCss.inbox_image}
                                        source={{ uri: item.gmgt_user_avatar_image }}
                                    />
                                </Col>
                            </Col>
                            <Col style={styleCss.inbox_container_col}>
                                <Row style={styleCss.inbox_container_row}>
                                    <Col>
                                        <Text numberOfLines={1} style={styleCss.inbox_message_for}>{item.message_for}</Text>
                                    </Col>
                                    <Col style={styleCss.inbox_container_col2}>
                                        <Text style={styleCss.inbox_container_data}>{item.date}</Text>
                                    </Col>
                                </Row>
                                <Row style={styleCss.inbox_container_row}>
                                    <Col>
                                        <Text numberOfLines={1} style={styleCss.inbox_container_data}>{item.subject}</Text>
                                    </Col>
                                </Row>
                                <Row style={styleCss.inbox_container_row}>
                                    <Col>
                                        <Text numberOfLines={2} style={styleCss.inbox_container_data}>{item.description}</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        const { data, loading } = this.props;
        if (!loading) {
            return (
                <View style={styleCss.container}>
                    <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.message_id.toString()}
                        ListEmptyComponent={
                            <EmptyComponent title={t("Inbox Message not available")} />
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
                <ActivityIndicator
                    style={styleCss.loading}
                    size="large"
                    color="#102b46"
                />
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
        data: state.inboxMessage.inboxData,
        loading: state.inboxMessage.loading,
    };
};

const mapDispatchToProps = {
    fetchInboxmessagelist,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(inbox);