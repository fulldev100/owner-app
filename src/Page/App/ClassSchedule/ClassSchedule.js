import React, { Component } from "react";
import {
    BackHandler,
    View,
    Text,
    ActivityIndicator,
    Image,
    RefreshControl,
    StatusBar,
    FlatList,
    SafeAreaView
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { t } from '../../../../locals';
import styleCss from "../../../style.js";
import i18n from "i18n-js";
import * as Localization from "expo-localization";
const lang = (i18n.locale = Localization.locale.substr(0, 2));

//Redux
import { connect } from "react-redux";
import { fetchClassSchedule, loadingStart } from "../../redux/actions/classSchedule";

if (lang == "ar") {
    import('moment/locale/ar')
} else if (lang == "ca") {
    import('moment/locale/ca')

} else if (lang == "cs") {
    import('moment/locale/cs')

} else if (lang == "da") {
    import('moment/locale/da')

} else if (lang == "de") {
    import('moment/locale/de')

} else if (lang == "el") {
    import('moment/locale/el')

} else if (lang == "en") {
    import('moment/locale/en-in')

} else if (lang == "es") {
    import('moment/locale/es')

} else if (lang == "et") {
    import('moment/locale/et')

} else if (lang == "fa") {
    import('moment/locale/fa')

} else if (lang == "fi") {
    import('moment/locale/fi')

} else if (lang == "fr") {
    import('moment/locale/fr')

} else if (lang == "hi") {
    import('moment/locale/hi')

} else if (lang == "hr") {
    import('moment/locale/hr')

} else if (lang == "hu") {
    import('moment/locale/hu')

} else if (lang == "id") {
    import('moment/locale/id')

} else if (lang == "it") {
    import('moment/locale/it')

} else if (lang == "ja") {
    import('moment/locale/ja')

} else if (lang == "lt") {
    import('moment/locale/lt')

} else if (lang == "nl") {
    import('moment/locale/nl')

} else if (lang == "pl") {
    import('moment/locale/pl')

} else if (lang == "pt") {
    import('moment/locale/pt')

} else if (lang == "ro") {
    import('moment/locale/ro')

} else if (lang == "ru") {
    import('moment/locale/ru')

} else if (lang == "sv") {
    import('moment/locale/sv')

} else if (lang == "tr") {
    import('moment/locale/tr')

} else if (lang == "vi") {
    import('moment/locale/vi')

} else if (lang == "zh") {
    import('moment/locale/zh-cn')

}

class Configuration extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            days: { "0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday" },
            selectedDate: moment(),
            dataSource: [],
            data: [],
        };
    }

    onRefresh() {
        this.setState({ data: [] });
        this.classSchedultList();
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
    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };

    componentDidMount() {
        this.classSchedultList();
    }

    async classSchedultList() {
        const { fetchClassSchedule, loadingStart } = this.props;

        loadingStart();

        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");
        const params = {
            "current_user_id": Id,
            "access_token": Token,
        };

        // Redux function call for fetch class schedule list
        fetchClassSchedule(params).then(() => {
            this.rendershow();
        });
    }

    renderItem = ({ item }) => {
        return (
            <View style={styleCss.container}>

                <Row style={styleCss.classSchedult_row}>
                    <Col style={styleCss.classSchedult_col}>
                        <Row style={styleCss.classSchedult_class_row}>
                            <Text style={styleCss.classSchedult_class_row_text}>{item[1].class_name}</Text>
                        </Row>
                        <Row style={styleCss.classSchedult_classdata_row}>
                            <Col style={styleCss.classSchedult_classimage_col}>
                                <Image style={styleCss.classSchedult_classdata_image}
                                    source={require('../../../images/Time-512.png')}
                                />
                            </Col>
                            <Col style={styleCss.classSchedult_classtext_col}>
                                <Text style={styleCss.classSchedult_classdata_text}>{item[1].start_time} - {item[1].end_time}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </View>
        )
    }

    rendershow() {
        const { classScheduleData } = this.props;
        if (classScheduleData) {

            const x = Object.entries(classScheduleData).map((item) => item)
            var date = moment(this.state.selectedDate).weekday()
            if(date !== 0){
                var DateNum = date - 1
                this.setState({ data: Object.entries(x[DateNum][1]).map((item1) => item1) })
            }else{
                var DateNum = date + 6
                this.setState({ data: Object.entries(x[DateNum][1]).map((item1) => item1) })
            }
        }
    }
    render() {
        const { loading } = this.props;

        if (!loading) {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    <CalendarStrip
                        highlightDateNameStyle={{ color: '#f1c40e', borderBottomColor: '#f1c40e', borderBottomWidth: 2, fontFamily: 'Poppins-Bold', fontSize: 15 }}
                        selectedDate={this.state.selectedDate}
                        onDateSelected={selectedDate => this.setState({ selectedDate }, () => this.rendershow())}
                        numDaysInWeek={7}
                        showDayNumber={false}
                        markedDatesStyle={{ color: 'yellow', fontFamily: 'Poppins-Bold' }}
                        style={{ height: 100, paddingTop: 20, backgroundColor: '', borderBottomWidth: 0.15, borderBottomColor: 'black', }}
                        calendarHeaderStyle={{ color: '#102b46', fontSize: 15, fontFamily: 'Poppins-Bold' }}
                        dateNameStyle={{ color: '#102b46', fontSize: 15, fontFamily: 'Poppins-Bold' }}
                        iconContainer={{ flex: 0.1, }}
                    />
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            // keyExtractor={(item) => item.toString()}
                            ListEmptyComponent={
                                <EmptyComponent title={t("Data not available")} />
                            }
                            refreshControl={
                                <RefreshControl
                                    colors={["#102b46"]}
                                    refreshing={this.state.loading}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                        />
                    </SafeAreaView>
                </View>
            )
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
const EmptyComponent = ({ title }) => (
    <View style={styleCss.emptyContainer}>
        <Text style={styleCss.emptyText}>{title}</Text>
    </View>
);

const mapStateToProps = (state) => {
    return {
        classScheduleData: state.classSchedule.classScheduleData,
        loading: state.classSchedule.loading,
    };
};

const mapDispatchToProps = {
    fetchClassSchedule,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);