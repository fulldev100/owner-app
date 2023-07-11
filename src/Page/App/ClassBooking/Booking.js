import React, { Component } from 'react';
import {
    BackHandler,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import ClassBookingTabs from './ClassBookingTabs';
import { t } from '../../../../locals';
import styleCss from '../../../style';
export default class Booking extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };

    constructor(props) {
        super(props);
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

    _handleBackButtonClick = () => this.props.navigation.navigate('Dashboard')


    render() {
        const { navigate } = this.props.navigation;
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
                        <Text style={styleCss.NaveText}>{t("Class Booking")}</Text>
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
                <ClassBookingTabs />
            </View>
        );
    }
}