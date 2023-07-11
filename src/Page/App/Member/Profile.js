import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ActivityIndicator,
} from "react-native";
import { Col, Row } from 'react-native-easy-grid';
import Detalis from './DetailsTab';
import styleCss from "../../../style";

//Redux
import { connect } from "react-redux";
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ImageLoading: false,
        };
    }

    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };

    navigatetoacc() {
        const { navigate } = this.props.navigation;
        navigate('Acc');
    }

    render() {
        const { userData } = this.props;

            return (
                <View style={styleCss.container}>
                    <Row style={styleCss.profile_row}>
                        <Col style={styleCss.profile_col}>
                            <Col style={styleCss.profile_Image_col}>
                                <Image
                                    onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                    onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                                    style={styleCss.profile_Image_css}
                                    source={{ uri: userData.member_image }} />
                                <ActivityIndicator
                                    style={styleCss.loading}
                                    animating={this.state.ImageLoading}
                                    size="small"
                                    color="#102b46"
                                />
                            </Col>
                        </Col>
                        <Col>
                            <Row style={styleCss.profile_name_row}>
                                <Text style={styleCss.profile_name_text}>{userData.first_name} {userData.last_name}</Text>
                            </Row>

                            <Row style={styleCss.profile_address_row}>
                                <Col style={styleCss.profile_address_col}>
                                    <Text numberOfLines={1} style={styleCss.profile_address_text}>{userData.address} , {userData.city}</Text>
                                </Col>
                            </Row>
                            {userData.state != 0 ? (
                                <Row style={styleCss.profile_state_row}>
                                    <Col style={styleCss.profile_state_image_col}>
                                        <Image style={styleCss.profile_state_image}
                                            source={require('../../../images/Location2-Pin-Gray-512.png')}
                                        />
                                    </Col>
                                    <Col style={styleCss.profile_state_col}>
                                        <Text numberOfLines={1} style={styleCss.profile_state_text}>{userData.state}</Text>
                                    </Col>
                                </Row>
                            ) : (
                                <View></View>
                            )}
                        </Col>
                    </Row>
                    <Detalis />
                </View>
            )
    }
}

const mapStateToProps = (state) => {
    return {
      userData: state.auth.userData,
    };
  };
    
  export default connect(mapStateToProps)(Profile);