import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import normalize from 'react-native-normalize';
import { Col, Row } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from '../../../style.js';

export default class WorkoutsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };

    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };


    componentDidMount() {
        const workoutData = this.props.navigation.getParam('workoutData',);
        this.setState({
            dataSource: workoutData,
        });
    }

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

    _handleBackButtonClick = () => this.props.navigation.navigate('AssignWorkoutsList')

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
                            <TouchableOpacity onPress={() => navigate("AssignWorkoutsList")} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.assignworkouts_list_name_col}>
                            <Text style={styleCss.NaveText}>{t("Assigned Workout List")}</Text>
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
                    <ScrollView>
                        {dataSource.map((Workout, index) =>
                            <Row style={styleCss.assignworkouts_list_row} key={index}>
                                <Col>
                                    <Row style={styleCss.assignworkouts_list_day_row}>
                                        <Text style={styleCss.assignworkouts_list_day_text}>{Workout.day} - </Text><Text numberOfLines={1} style={{ fontSize: 19, fontFamily: 'Poppins-Bold', color: '#777777', width: normalize(150) }}>{Workout.workout_name}</Text>
                                    </Row>
                                    <Row style={styleCss.assignworkouts_list_data_one_row}>
                                        <Col style={styleCss.assignworkouts_list_data_one_col}>
                                            <Text style={styleCss.assignworkouts_list_data_one_text}>{t("Sets")} :</Text>
                                        </Col>
                                        <Col style={styleCss.assignworkouts_list_data_one_col}>
                                            <Text style={styleCss.assignworkouts_list_data_two_text}>{Workout.sets}</Text>
                                        </Col>
                                        <Col style={styleCss.assignworkouts_list_data_two_col}>
                                            <Text style={styleCss.assignworkouts_list_data_one_text}>{t("Kg")} :</Text>
                                        </Col>
                                        <Col >
                                            <Text style={styleCss.assignworkouts_list_data_two_text}>{Workout.kg}</Text>
                                        </Col>
                                    </Row>
                                    <Row style={styleCss.assignworkouts_list_data_two_row}>
                                        <Col style={styleCss.assignworkouts_list_data_one_col}>
                                            <Text style={styleCss.assignworkouts_list_data_one_text}>{t("Reps")} :</Text>
                                        </Col>
                                        <Col style={styleCss.assignworkouts_list_data_one_col}>
                                            <Text style={styleCss.assignworkouts_list_data_two_text}>{Workout.reps}</Text>
                                        </Col>
                                        <Col style={styleCss.assignworkouts_list_data_two_col}>
                                            <Text style={styleCss.assignworkouts_list_data_one_text}>{t("Rest Time")} :</Text>
                                        </Col>
                                        <Col>
                                            <Text style={styleCss.assignworkouts_list_data_two_text}>{Workout.rest_time}</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                    </ScrollView>
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
                            <TouchableOpacity onPress={() => navigate("AssignWorkoutsList")} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.assignworkouts_list_name_col}>
                            <Text style={styleCss.NaveText}>{t("Assigned Workout List")}</Text>
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