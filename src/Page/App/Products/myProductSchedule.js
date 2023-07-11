import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from '../../../style'

export default class myProductSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            data: [],
            loader: false,
        };

    }
    componentDidMount() {
        const historyID = this.props.navigation.getParam('paramKey1');
        //const enrollName = this.props.navigation.getParam('paramKey2');
        const HistoryData = this.props.navigation.getParam('historyData');

        const x = Object.entries(HistoryData).map((item) => item);
        for (var i = 0; i < x.length; i++) {
            if (x[i][1].id === historyID) {
                this.setState({ data: Object.entries(x[i][1].historyData).map((item1) => item1) });
                break;
            }
        }
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

    _handleBackButtonClick = () => this.props.navigation.navigate('Nutritionplan')

    showString(str) {
        var str1 = str.toString().replace("\"", "")
        str1 = str1.replace("\"", "")
        var str2 = str1.split(":")
        return str2
    }
    renderItem1 = ({ item }) => {
        return (

            <Row style={styleCss.historySchedule_details_row}>
                <Col style={styleCss.historySchedule_details_col}>
                    <Text style={styleCss.historySchedule_details_text}>{this.showString(item)[0]}</Text>
                </Col>
                <Col style={styleCss.historySchedule_details_col2}>
                    <Text style={styleCss.historySchedule_details_data}>:</Text>
                </Col>
                <Col style={styleCss.historySchedule_details_col}>
                    <Text style={styleCss.historySchedule_details_data}>{this.showString(item)[1].replace(" ", "")}</Text>
                </Col>
            </Row>

        )
    }
    renderItem = ({ item }) => {
        return (
            <ScrollView style={styleCss.container}>

                <Row style={styleCss.historySchedule_list_row}>
                    <Col>
                        <Row style={styleCss.historySchedule_row}>
                            <Text style={styleCss.historySchedule_list_text}>{item[0]}</Text>
                        </Row>
                        <FlatList
                            data={item[1]}
                            renderItem={this.renderItem1}
                            keyExtractor={(item1) => item1.toString()}
                        />
                    </Col>
                </Row>
            </ScrollView>
        )
    }
    render() {

        const { navigate } = this.props.navigation;
        const { dataSource, loader } = this.state;

        if (!loader) {
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
                            <TouchableOpacity onPress={() => navigate("Nutritionplan")} style={styleCss.back_arrow} >
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
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.toString()}
                        ListEmptyComponent={
                            <EmptyComponent title={t("Data not available")} />
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
                            <TouchableOpacity onPress={() => navigate("Nutritionplan")} style={styleCss.back_arrow} >
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
