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
    Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from "react-redux";
import { fetchHomelist, loadingStart } from "../../redux/actions/home";
import { Logoutmember } from "../../redux/actions/auth";
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
import { WebView } from 'react-native-webview';

const buggyHtml = `
<style>/*! elementor - v3.9.2 - 21-12-2022 */<br />
.elementor-widget-google_maps .elementor-widget-container{overflow:hidden}.elementor-widget-google_maps iframe{height:300px}
</style>
<iframe title="Bidovce 316" style="width: 100%; height: 100% !important" src="https://maps.google.com/maps?q=Bidovce%20316&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" aria-label="Bidovce 316"></iframe>
`;

class MyLocation extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };
    logout = async () => {
        Alert.alert(t("Gym App"), t("Are you sure you want to exit app?"), [
          {
            text: t("No"),
            onPress: () => this.myhomedata(),
            style: "cancel",
          },
          { text: t("Yes"), onPress: () => this.memberLogout()},
        ]);
        // await SecureStore.deleteItemAsync("userid");
        // await SecureStore.deleteItemAsync("access_token");
      };
    
    async memberLogout() {
        const { Logoutmember, loadingStart } = this.props;
        const { navigate } = this.props.navigation;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");
        const userData = {
            "current_user_id": Id,
            "access_token": Token,
        };
        Logoutmember(userData, navigate);
    }
    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };

    componentDidMount() {
        this.myhomedata();
    }

    async myhomedata() {
        const { fetchHomelist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const home_data = {
            "current_user_id": Id,
            "access_token": Token,
        };
        fetchHomelist(home_data);
    }

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    onRefresh() {
        this.myhomedata();
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('myHome')
    renderItem = ({ item }) => {
        return (
            <View style={styleCss.MembershipView}>
                <Row style={styleCss.NaveBar}>
                    <Col>
                        <TouchableOpacity style={styleCss.logout_image} onPress={() => this.logout() }>
                            <Image style={styleCss.logout_image}
                                source={require('../../../images/Logout-white.png')}
                            />
                        </TouchableOpacity>
                    </Col>

                    <Col style={styleCss.nutrition_list_name_col}>
                        <Text style={styleCss.NaveText}></Text>
                    </Col>
                    <Col style={styleCss.nutrition_list_name_col_1}>
                    </Col>

                    <Col style={styleCss.AlignRightNavbar}>
                        <Text style={styleCss.NaveText}>en</Text>
                    </Col>
                </Row>
                <TouchableOpacity key={item} style={styleCss.TouchScreenCSS}>

                    <View style={styleCss.ImageLogoContainer}>
                        <WebView
                            style={styleCss.HTMLViewContainer}
                            originWhitelist={['*']}
                            source={{ html: buggyHtml }}
                            />
                    </View>
                    
                    <Text style={styleCss.MembershipMemberName}>24Hr Fitness s.r.o.</Text>
                    <Text style={styleCss.MembershipMemberName}>
                        Bidovce 316
                        04445 Bidovce
                        Slovakia
                    </Text>

                    <Text style={styleCss.MembershipMemberEmail}>info@24hr-fitness.eu</Text>
                    <Text style={styleCss.MembershipMemberEmail}>+421 915 841 077</Text>

                </TouchableOpacity>
            </View>
        )
    }
    render() {

        const { navigate } = this.props.navigation;
        const { Data, loading } = this.props;

        if (!loading) {
            return (
                <View style={styleCss.containerMain}>
                    <FlatList
                        data={Data}
                        renderItem={this.renderItem}
                        style={styleCss.FlatListCss}
                        keyExtractor={(item) => {item.invoice_id}}
                        ListEmptyComponent={
                            <>
                            <View style={styleCss.MembershipView}>
                                <Row style={styleCss.NaveBar}>
                                    <Col>
                                        <TouchableOpacity style={styleCss.logout_image} onPress={() => this.logout() }>
                                            <Image style={styleCss.logout_image}
                                                source={require('../../../images/Logout-white.png')}
                                            />
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={styleCss.nutrition_list_name_col}>
                                        <Text style={styleCss.NaveText}></Text>
                                    </Col>
                                    <Col style={styleCss.nutrition_list_name_col_1}>
                                    </Col>

                                    <Col style={styleCss.AlignRightNavbar}>
                                        <Text style={styleCss.NaveText}>en</Text>
                                    </Col>
                                </Row>
                                <TouchableOpacity key={1} style={styleCss.TouchScreenCSS}>

                                    <View style={styleCss.ImageLogoContainer}>
                                        <WebView
                                            style={styleCss.HTMLViewContainer}
                                            originWhitelist={['*']}
                                            source={{ html: buggyHtml }}
                                            />
                                    </View>
                                    
                                    <Text style={styleCss.MembershipMemberName}>24Hr Fitness s.r.o.</Text>
                                    <Text style={styleCss.MembershipMemberName}>
                                        Bidovce 316
                                        04445 Bidovce
                                        Slovakia
                                    </Text>

                                    <Text style={styleCss.MembershipMemberEmail}>info@24hr-fitness.eu</Text>
                                    <Text style={styleCss.MembershipMemberEmail}>+421 915 841 077</Text>

                                </TouchableOpacity>
                            </View>
                            </>
                        }
                        refreshControl={
                            <RefreshControl
                                colors={["#102b46"]}
                                refreshing={loading}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                    <View style={styleCss.bottomView}>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('myHome')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_gym.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Home</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_location.png')}
                                />
                                <Text style={styleCss.bottomViewColumnTextActive}>Location</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_product.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.myhomedata()} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_refresh.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styleCss.containerMain}>
                    <Text></Text>
                    <ActivityIndicator
                        style={styleCss.loading}
                        size="large"
                        color="#102b46"
                    />
                    <View style={styleCss.bottomView}>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('myHome')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_gym.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Home</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_location.png')}
                                />
                                <Text style={styleCss.bottomViewColumnTextActive}>Location</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_product.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.myhomedata() } style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_refresh.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        Data: state.home.homeData,
        loading: state.home.loading,
    };
};

const mapDispatchToProps = {
    fetchHomelist,
    Logoutmember,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLocation);