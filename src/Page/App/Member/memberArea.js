import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { t } from '../../../../locals';
import MemberTabs from './MemberTabs';
import styleCss from '../../../style';

export default class Notice extends React.Component {
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
                            <Text style={styleCss.NaveText}>{t("View Member")}</Text>
                        </Col>
                        
                        <Col>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Workouts')} style={styleCss.workout_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../images/Workout-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Message')} style={styleCss.message_col}>
                            <Image style={styleCss.Naveicon}
                                source={require('../../../images/Message-white.png')}
                            />
                            </TouchableOpacity>
                        </Col>
                    
                    
                    </Row>
                    <MemberTabs />
                </View>
            );
}
}