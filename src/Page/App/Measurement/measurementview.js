import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    RefreshControl,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { connect } from "react-redux";
import { view_measurement, loadingStart } from "../../redux/actions/measurement";
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
class viewmeasurement extends Component {
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

    async componentDidMount() {
        this.viewmeasurement();
    }
    async viewmeasurement() {
        const { view_measurement, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const viewData = {
            "current_user_id": Id,
            "access_token": Token,
        };
        view_measurement(viewData);
    }
    onRefresh() {
        this.viewmeasurement();
    }

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('addmeasurement')

    render() {
        const { loading, measurementData } = this.props;
        if (!loading) {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                colors={["#102b46"]}
                                refreshing={loading}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >
                        {(measurementData.length !== 0) ? (
                            <View>
                                {measurementData.map((View, index) => (
                                    <Row style={styleCss.viewmeasurement_data_row} key={index}>
                                        <Col style={styleCss.viewmeasurement_image_col}>
                                            <Image style={styleCss.viewmeasurement_image}
                                                source={{ uri: View.photo }}
                                            />
                                        </Col>
                                        <Col style={styleCss.viewmeasurement_data_col}>
                                            <Text style={styleCss.viewmeasurement_data_text}>{View.measurement}</Text>
                                            <Text style={styleCss.viewmeasurement_data_text_two}>{View.record_date}</Text>
                                        </Col>
                                        <Col style={styleCss.viewmeasurement_data_col_two}>
                                            <Text style={styleCss.viewmeasurement_data_text_three}>{View.result}</Text>
                                        </Col>
                                    </Row>
                                ))}
                            </View>
                        ) : (
                            <View style={styleCss.emptyContainer}>
                                <Text style={styleCss.viewmeasurement_nodata_text}>{t("Measurement Data are Not Available")}</Text>
                            </View>
                        )}
                    </ScrollView>


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

const mapStateToProps = (state) => {
    return {
        loading: state.measurement.loading,
        measurementData: state.measurement.measurementList,
    };
};

const mapDispatchToProps = {
    view_measurement,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(viewmeasurement);