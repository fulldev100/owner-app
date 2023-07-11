import React, { Component } from 'react';
import { SafeAreaView, Modal, BackHandler, TouchableHighlight, ActivityIndicator, RefreshControl, Alert, Text, Button, TextInput, View, Image, FlatList, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import * as SecureStore from 'expo-secure-store';
import { connect } from "react-redux";
import { fetchProductlist, loadingStart, viewProduct } from "../../redux/actions/productList";
import { t } from '../../../../locals';
import styleCss from '../../../style';
//import Paypal from '../../../util/Paypal';
import { Logoutmember } from "../../redux/actions/auth";
import * as WebBrowser from 'expo-web-browser';

// import { PayPal} from 'react-native-paypal';
// import { WebView } from 'react-native-webview';

class productList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageLoading: false,
            modalVisible: false,
            Member_Data: '',
            ProductMember: '',
            Product_name: '',
            amount_number: '1',
        };

    }

    

    handleNumberChange = (inputNumber) => {
        const regex = /^[0-9]*$/;
        if (regex.test(inputNumber)) {
            if (inputNumber == '')
                this.setState({ amount_number: '1' });
            else this.setState({ amount_number: inputNumber });
        }
      };

    openBrowser = async (url) => {
        // Check if the device supports opening URLs
        await WebBrowser.openBrowserAsync(url);
      };
    
    handleBuyPress = async () => {
        // Handle button press event
        // if (this.state.amount_number === '') {
        //     Alert.alert('Error', 'Please enter a number');
        //   } else {
        //     // Perform your desired action with the validated number
        //     //Alert.alert('Success', `You entered the number: ${this.state.amount_number}`);
        //     Alert.alert('Success', `Please wait new version.`);
            
        //   }
        this.openBrowser('https://24hr-fitness.eu/products/');
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };

    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };

    onRefresh() {
        this.productListAction();
    }

    componentDidMount() {
        this.productListAction();
    }

    logout = async () => {
        Alert.alert(t("Gym App"), t("Are you sure you want to exit app?"), [
          {
            text: t("No"),
            onPress: () => this.productListAction(),
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

    async productListAction() {

        const { fetchProductlist, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");

        const groupData = {
            current_user_id: Id,
            access_token: Token,
        };
        // Redux action called for fetch booked class of logined user
        fetchProductlist(groupData);
    }

    Visible(modalVisible) {
        this.setState({ modalVisible: false });
    }

    async setModalVisible(memberData, name, totalMember) {
        this.setState({ Product_name: name, Member_Data: memberData, ProductMember: totalMember,modalVisible: true });
    }

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('myHome')


    // render item for flatlist
    renderItem = ({ item }) => {
        const { modalVisible } = this.state;
        return (
            <View>
                <Row style={styleCss.group_RowContainer}>
                    <Col style={styleCss.group_ImageCol}>
                        <Col style={styleCss.product_ImageContainer}>
                            <Image onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                                source={item.product_image ? { uri: item.product_image } : null} style={styleCss.ProductImage} />
                            <ActivityIndicator
                                style={styleCss.loading}
                                animating={this.state.ImageLoading}
                                // size="small"
                                color="#102b46"
                            />
                        </Col>
                    </Col>
                    <Col style={styleCss.group_col}>
                        <Col style={styleCss.group_details_col}>
                            <Text numberOfLines={1} style={styleCss.product_name}>
                                {item.product_name}, {item.product_price}
                            </Text>
                        </Col>
                        <Col style={styleCss.group_details_col}>
                            <Text style={styleCss.group_member_text}>{item.total_group_member} {t("member")}</Text>
                        </Col>
                    </Col>
                    <Col style={styleCss.group_modal_col}>
                        <TouchableHighlight onPress={() => this.setModalVisible(item, item.product_name, 1)}
                            underlayColor={'#F1C40E'}
                            style={styleCss.group_modal_button}>
                            <Text style={styleCss.group_modal_text}>{t("View")}</Text>
                        </TouchableHighlight>
                    </Col>
                </Row>
            </View>
        )
    }
    render() {
        const { modalVisible, Member_Data, Product_name, ProductMember } = this.state;
        const { navigate } = this.props.navigation;
        const { data, loading } = this.props;
        if (!loading) {
            return (

                <View style={styleCss.container}>
                    
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

                    <View style={styleCss.mainContainer}>
                        <SafeAreaView style={styleCss.mainContainer}>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.product_id}
                                renderItem={this.renderItem}
                                ListEmptyComponent={
                                    <>
                                    <EmptyComponent title={t("Data not available")} />
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
                            <Col>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}>

                                    <View style={styleCss.group_modal_main_view}>

                                        <View style={styleCss.product_modal_view}>
                                            <Row style={styleCss.group_modal_row}>
                                                <Col style={styleCss.group_name_col}>
                                                    <Text numberOfLines={1} style={styleCss.group_name_text}></Text>
                                                </Col>
                                                <Col style={styleCss.group_back_arrow_col}>
                                                    <TouchableOpacity onPress={() => { this.Visible(!modalVisible) }} style={styleCss.group_back_arrow_text}>
                                                        <Image
                                                            style={styleCss.group_close_image}
                                                            source={require('../../../images/Close-blue-512.png')} />
                                                    </TouchableOpacity>
                                                </Col>
                                            </Row>

                                            <View key={1} style={styleCss.SubImageContainer}>
                                                <Text numberOfLines={1} style={styleCss.group_name_text}>{Member_Data.product_name}</Text>
                                                
                                                <View style={styleCss.Product_amount_container}>
                                                    <Text numberOfLines={1} style={styleCss.group_name_text}>{Member_Data.product_price}</Text>
                                                   
                                                    {/* <TextInput
                                                        style={styleCss.Product_input}
                                                        onChangeText={this.handleNumberChange}
                                                        value={this.state.amount_number}
                                                        placeholder=""
                                                    >
                                                    </TextInput> */}

                                                    {/* <TouchableOpacity
                                                        style={styles.addFundsButton}
                                                        onPress={() => this.goToPaypal()}
                                                        >
                                                        <Text style={appStyles.textWhite}>Add Funds</Text>
                                                    </TouchableOpacity> */}
                                                    {/* <PayPalButton
                                                        amount="10.00"
                                                        currency="USD"
                                                        clientId="ASDk6tgF5vAZDJjRY4lauMVx4brniAM6dm7CWLv4F8X8M-rCz0yX0LSSmxMzIbw93gXsQ-bYBg1sBejo"
                                                        onPaymentSuccess={(payment) => console.log(payment)}
                                                        onPaymentError={(error) => console.log(error)}
                                                        onPaymentCancel={() => console.log("Payment cancelled")}
                                                        /> */}
                                                    <Button title="Open to buy page" color={'#f4ba16'} style={styleCss.Product_buy_button} onPress={() => this.handleBuyPress()} />
                                                </View>
                                                <Image onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                                    onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                                                    source={Member_Data.product_image ? { uri: Member_Data.product_image } : null}
                                                     style={styleCss.SubProductImage} />
                                                <ActivityIndicator
                                                    style={styleCss.loading}
                                                    animating={this.state.ImageLoading}
                                                    // size="small"
                                                    color="#102b46"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </Col>
                        </SafeAreaView>
                    </View>

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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('location')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_location.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Location</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_product.png')}
                                />
                                <Text style={styleCss.bottomViewColumnTextActive}>Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.productListAction() } style={styleCss.message_col}>
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('location')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_location.png')}
                                />
                                <Text style={styleCss.bottomViewColumnText}>Location</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styleCss.message_col}>
                                <Image style={styleCss.bottomViewColumnImg}
                                    source={require('../../../images/small_product.png')}
                                />
                                <Text style={styleCss.bottomViewColumnTextActive}>Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styleCss.bottomViewColumn}>
                            <TouchableOpacity onPress={() => this.productListAction() } style={styleCss.message_col}>
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
// empty component
const EmptyComponent = ({ title }) => (
    <View style={styleCss.emptyContainer}>
        <Text style={styleCss.emptyText}>{title}</Text>
    </View>
);

const mapStateToProps = (state) => {
    return {
        data: state.productList.ProductData,
        loading: state.productList.loading,
    };
};

const mapDispatchToProps = {
    fetchProductlist,
    // viewProduct,
    Logoutmember,
    loadingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(productList);