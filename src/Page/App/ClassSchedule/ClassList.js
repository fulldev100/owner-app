import React, { Component } from "react";
import {
    BackHandler,
    View,
    Text,
    Image,
    ActivityIndicator,
    RefreshControl,
    StatusBar,
    FlatList,
    SafeAreaView
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { NavigationEvents } from 'react-navigation';
import { Col, Row } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from "../../../style.js";


//Redux
import { connect } from "react-redux";
import { fetchClass, loadingStart } from "../../redux/actions/classSchedule";

class ClassList extends Component {

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
        this.ClassList();
    }

    async ClassList() {
        const { fetchClass, loadingStart } = this.props;

        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const paramas = {
            "current_user_id": Id,
            "access_token": Token,

        };

        // Redux action call for fetch class list
        fetchClass(paramas);
    }

    onRefresh() {
        this.setState({ dataSource: [] });
        this.ClassList();
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
            <View style={styleCss.container} >
                <Row style={styleCss.classlist_row}>
                    <Col style={styleCss.classlist_col}>
                        <Row style={styleCss.classlist_dataname_row}>
                            <Text numberOfLines={1} style={styleCss.classlist_dataname_text}>{item.class_name}</Text>
                        </Row>
                        <Row style={styleCss.classlist_image_row}>
                            <Col style={styleCss.classlist_image_col}>
                                <Image style={styleCss.classlist_image}
                                    source={require('../../../images/Time-512.png')}
                                />
                            </Col>
                            <Col style={styleCss.classlist_time_col}>
                                <Text style={styleCss.classlist_dataname_time}>{item.start_time} - {item.end_time}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={styleCss.classlist_dataname_row}>
                            <Text style={styleCss.classlist_dataname_time}>{item.staff_member}</Text>
                        </Row>
                        <Row style={styleCss.classlist_dataname_text_row}>
                        </Row>
                    </Col>
                </Row>
            </View>
        );
    };

    render() {
        const { classData, loading } = this.props;

        if (!loading) {
            return (
                <View style={{ flex: 1 }}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            data={classData}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.class_id.toString()}
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
      classData: state.classSchedule.classData,
      loading: state.classSchedule.loading,
    };
  };
  
  const mapDispatchToProps = {
    fetchClass,
    loadingStart
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ClassList);