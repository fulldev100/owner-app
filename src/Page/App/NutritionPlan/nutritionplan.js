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
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from "react-redux";
import { fetchNutritionlist, loadingStart } from "../../redux/actions/nutrition";
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
class Nutritionplan extends Component {
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
        this.nutritionlist();
    }

    async nutritionlist() {
        const { fetchNutritionlist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const nutrition_data = {
            "current_user_id": Id,
            "access_token": Token,
        };
        fetchNutritionlist(nutrition_data);
    }

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    onRefresh() {
        this.nutritionlist();
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('Dashboard')
    renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('nutritionschudule', { nurtitionData:[item], paramKey1: item.start_date, paramKey2: item.end_date })}>

                    <Row style={styleCss.nutrition_list_row}>
                        <Col style={styleCss.nutrition_list_col}>
                            <Col style={styleCss.nutrition_list_image_col}>
                                <Image style={styleCss.nutrition_list_image}
                                    source={require('../../../images/Date-blue-512.png')}
                                />
                            </Col>
                        </Col>
                        <Col style={styleCss.nutrition_list_details_col}>
                            <Row style={styleCss.nutrition_list_details_row}>
                                <Text style={styleCss.nutrition_list_details_label}>{t("Start From")} : </Text>
                                <Text style={styleCss.nutrition_list_details_text}>{item.start_date}</Text>
                            </Row>

                            <Row style={styleCss.nutrition_list_details_row}>
                                <Text style={styleCss.nutrition_list_details_label}>{t("To")} : </Text>
                                <Text style={styleCss.nutrition_list_details_text}>{item.end_date}</Text>
                            </Row>
                        </Col>
                    </Row>

                </TouchableOpacity>
            </View>
        )
    }
    render() {

        const { navigate } = this.props.navigation;
        const { Data, loading } = this.props;

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
                            <TouchableOpacity onPress={() => navigate("Dashboard")} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.nutrition_list_name_col}>
                            <Text style={styleCss.NaveText}>{t("Nutrition Schedule List")}</Text>
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
                        data={Data}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.start_date.toString()}
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

                        <Col style={styleCss.nutrition_list_name_col}>
                            <Text style={styleCss.NaveText}>{t("Nutrition Schedule List")}</Text>
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
        Data: state.nutrition.nutritionData,
        loading: state.nutrition.loading,
    };
};

const mapDispatchToProps = {
    fetchNutritionlist,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(Nutritionplan);