import { StyleSheet, Platform, Dimensions, } from 'react-native';
import normalize from 'react-native-normalize';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({

    // common css start
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: height - (height * 65) / 100,
    },
    emptyText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        color: "#000",
        fontFamily: 'Poppins-Regular',
    },
    NaveBar: {
        ...Platform.select({
            ios: {
                height: normalize(75),
                backgroundColor: '#E9E9E9',
                color: '#656565',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: normalize(25),
                justifyContent: 'space-between',
                width: '100%'
            },
            android: {
                height: normalize(60),
                backgroundColor: '#E9E9E9',
                color: '#656565',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }
        })
    },
    TouchScreenCSS: {
        padding: 25
    },
    googleMapView: {
        width: 200,
        height: 200,
        textColor: '#f0f'
    },
    NavBarCreditView: {
        backgroundColor: '#656565',
        color: '#fff',
        borderRadius: 8,
        padding: 10
    },
    NaveCreditText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        textAlign: 'right',
    },
    NaveCreditTitleText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
    },
    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    FlatListCss: {
        padding: 0,
        margin: 0
    },
    bottomView: {
        width: '100%',
        height: 75,
        backgroundColor: '#00A6F5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        flexDirection: 'row', 
        alignItems: 'center'
    },
    bottomViewColumn: {
        flex: 1,
        alignItems: 'center'
    },
    bottomViewColumnActive: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    bottomViewColumnText: {
        width: 70,
        textAlign: 'center',
        color: '#ff0',
    },
    bottomViewColumnTextActive: {
        width: 70,
        textAlign: 'center',
        color: '#fff',
    },
    bottomViewColumnImg:
    {
        height: normalize(30),
        width: normalize(30),
    },
    Naveicon:
    {
        height: normalize(25),
        width: normalize(25),
    },
    NaveText: {
        color: '#656565',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
    menu_col: {
        ...Platform.select({
            ios: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            },
            android: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            }
        })

    },
    back_arrow: {
        ...Platform.select({
            ios: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            },
            android: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            }
        })

    },
    workout_col: {
        ...Platform.select({
            ios: {
                width: normalize(40),
                height: normalize(40),
                justifyContent: 'center',
                alignItems: 'center',
            },
            android: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            }
        })

    },
    message_col: {
        ...Platform.select({
            ios: {
                width: normalize(40),
                height: normalize(40),
                justifyContent: 'center',
                alignItems: 'center',
            },
            android: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            }
        })

    },
    name_col: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(225)
            },
            android: {
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(210)
            }
        })

    },
    // common css end

    // <------------------------------------- Member side css ------------------------------------->

    // login screen page css start

    loign_container: {
        flex: 1
    },
    loign_page: {
        flexGrow: 1
    },
    login_loding_container: {
        shadowOffset: { width: 0, height: 1, },
        elevation: 300,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    login_email_col: {
        marginBottom: "10%",
        marginTop: "30%"
    },
    login_emailcontainer: {
        marginRight: "5%",
        marginLeft: "5%",
        backgroundColor: "red",
    },
    login_input: {
        borderBottomColor: "#848485",
        borderBottomWidth: 1,
        marginRight: "5%",
        marginLeft: "5%",
    },
    login_input_col: {
        width: "15%",
        justifyContent: "center"
    },
    login_input_email: {
        color: "#ffffff",
        width: normalize(310),
        height: normalize(50),
        paddingRight: "4%",
        paddingLeft: "2%",
        fontSize: 16,
        fontFamily: 'Poppins-Medium'
    },
    login_icon_image: {
        height: 22,
        left: 20,
        width: 22,
    },
    login_passwordcontainer: {
        alignItems: "center",
        opacity: 0.7,
        height: "6%",
    },
    login_input_password: {
        color: "#ffffff",
        height: normalize(50),
        paddingRight: "4%",
        paddingLeft: "2%",
        fontSize: 16,
        fontFamily: 'Poppins-Medium'
    },
    login_input_password_show: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    password_eye_image: {
        height: 25,
        width: 25
    },
    login_bg_image: {
        flex: 1,
        resizeMode: "stretch",
        left: 0,
        top: 0,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    login_image_col: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "4%",
    },
    login_image: {
        height: 140,
        width: 140,
        alignSelf: "center",
    },
    login_btn: {
        backgroundColor: "#F1C40E",
        alignItems: "center",
        borderRadius: 20,
        marginTop: "8%",
        alignItems: "center",
        marginRight: "5%",
        marginLeft: "5%",
    },
    login_btn_container: {
        alignItems: "center",
        height: 40,
    },
    login_btn_text: {
        color: "#102b46",
        fontSize: 18,
        justifyContent: "center",
        fontFamily: 'Poppins-SemiBold'
    },
    login_signup_container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
    },
    login_signup_button: {
        width: normalize(220),
        height: normalize(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_signup_text: {
        color: "#ffffff",
        fontSize: 17,
        fontFamily: 'Poppins-Medium'
    },
    login_container: {
        marginTop: "7%",
        justifyContent: "center",
        opacity: 0.7,
        height: "4%",
        justifyContent: "center",
    },
    login_text: {
        color: "#ffffff",
        opacity: 0.5,
        fontSize: 17,
    },
    login_logo_container: {
        opacity: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "30%",
    },
    login_loader: {
        shadowOffset: { width: 0, height: 1, },
        elevation: 300,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    login: {
        marginTop: 70,
        zIndex: 111111,
    },
    // login screen page css end

    //signup screen page css start

    signup_membership_dropdown_row: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '5%',
        zIndex: -5
    },
    signup_membership_view_ios: {
        zIndex: 1
    },
    signup_membership_dropdown_ios: {
        zIndex: 1,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '5%',
        marginRight: '3%',
        marginLeft: '3%'
    },
    signup_class_dropdown_ios: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '5%',
        marginRight: '3%',
        marginLeft: '3%'
    },
    signup_membership_dropdown_col: {
        marginRight: '3%',
        marginLeft: '3%'
    },
    signup_class_dropdown_row: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        zIndex: 9
    },
    signup_class_dropdown_col: {
        marginRight: '3%',
        marginLeft: '3%',
    },
    signup_membership_date_row: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        zIndex: -5
    },
    signup_membership_date_col: {
        width: '52%',
        marginLeft: '7%'
    },
    signup_membership_text: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    signup_date_col: {
        marginRight: '4%',
        marginLeft: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 15
    },
    signup_date_input: {
        color: '#ffffff',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        height: normalize(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup_image:
    {
        height: 120,
        width: 120,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    signup_TextareaContainer:
    {
        height: "100%",
        borderRadius: 10,
        backgroundColor: 'gray',
        opacity: 0.6,
        paddingLeft: 15,
        fontSize: 20,
    },
    signup_Textarea:
    {
        textAlignVertical: 'top',
        fontSize: 14,
        color: "#ffffff",
    },
    signup_page:
    {
        flexGrow: 1
    },
    signup_bg_image:
    {
        flex: 1,
        resizeMode: 'stretch',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    signup_headercontainer:
    {
        height: "11%",
        marginTop: "30%",
        marginBottom: "10%",
    },
    signup_header:
    {
        flex: 1,
        fontSize: 35,
        color: 'white',
        opacity: 0.5,
        textAlign: 'center',
        alignSelf: 'center',
    },
    signup_input:
    {
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: '2%',
        backgroundColor: 'gray',
        opacity: 0.6,
        borderRadius: 10,
    },
    signup_user_input:
    {
        justifyContent: 'center',
        width: '85%',
    },
    signup_text_input:
    {
        fontSize: 18,
        color: 'white',
        paddingLeft: 15,
        justifyContent: 'center',
    },
    signup_input_icon:
    {
        justifyContent: 'center',
        alignItems: "center",
        marginRight: "5%",
        width: '15%',
    },
    signup_back_arrow: {
        height: normalize(45),
        width: normalize(70),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup_icon_image:
    {
        height: normalize(20),
        width: normalize(20),
    },
    signup_image_col: {
        marginBottom: '3%'
    },
    signup_image_row: {
        height: '14%',
        marginBottom: '5%',
        justifyContent: 'center'
    },
    signup_image_row_col: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        width: 150,
        height: 150,
        borderRadius: 75
    },
    signup_image_default_logo_col: {
        justifyContent: 'center',
    },
    signup_image_css: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    signup_camera_button: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: '70%',
        marginTop: '70%',
        position: 'absolute'
    },
    signup_camera_button_col: {
        justifyContent: 'center',
        alignItems: "center"
    },
    signup_camera_button_image: {
        height: 30,
        width: 30
    },
    signup_details_container: {
        marginBottom: '10%'
    },
    signup_personal_col: {
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 5,
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '5%'
    },
    signup_personal_collapse_row: {
        height: 35,
        borderBottomWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signup_personal_name_col: {
        width: '90%',
        paddingLeft: '3%',
    },
    signup_personal_name_text: {
        fontSize: 17,
        fontFamily: 'Poppins-Medium',
        color: '#ffffff',
    },
    signup_personal_image_col: {
        width: '10%'
    },
    signup_personal_image_css: {
        height: 20,
        width: 20
    },
    signup_personal_list_item: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#848485',
        marginRight: '3%',
        marginLeft: '3%',
    },
    signup_personal_list_item_col: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signup_personal_list_item_image: {
        height: 22,
        width: 22
    },
    signup_required_col: {
        width: '85%'
    },
    signup_eye_col: {
        width: '82%'
    },
    signup_personal_input_text: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#ffffff',
        height: normalize(45),
        width: normalize(310)
    },
    signup_required_second_col: {
        width: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup_password_eye_col: {
        width: '8%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    signup_required_text: {
        color: 'red',
        fontSize: 28
    },
    signup_Textarea:
    {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
    signup_signup_btn:
    {
        backgroundColor: '#F1C40E',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: '3%',
        alignItems: 'center',
        marginRight: '5%',
        marginLeft: '5%',
    },
    signup_btn_container:
    {
        alignItems: 'center',
        height: 40,
    },
    signup_signup_text:
    {
        color: '#102b46',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-SemiBold'
    },
    signup_account_created_row: {
        marginRight: normalize(70),
        marginLeft: normalize(70),
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup_account_created_col: {
        width: '80%'
    },
    signup_account_created_text: {
        color: 'gray',
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    },
    signup_login_col: {
        width: '20%'
    },
    signup_login_button: {
        height: normalize(30),
        width: normalize(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup_login_button_text: {
        color: '#ffffff',
        fontSize: 16,
        textDecorationLine: 'underline',
        fontFamily: 'Poppins-Medium'
    },
    signup_back_arrow: {
        ...Platform.select({
            ios: {
                marginLeft: normalize(30),
                marginTop: normalize(25),
            },
            android: {
                marginLeft: normalize(25),
                marginTop: normalize(15),
            },
        })
    },
    signup_radio: {
        ...Platform.select({
            ios: {
                width: normalize(35),
                borderWidth: 1,
                marginRight: normalize(10),
                borderRadius: normalize(35),
                height: normalize(35),
                borderColor: '#ffffff',
            }
        })
    },
    signup_radio_text: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#ffffff',
    },
    signup_radio_col: {
        ...Platform.select({
            ios: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            android: {
                flexDirection: 'row',
                alignItems: 'center',
            },
        })
    },
    signup_radio_two_col: {
        ...Platform.select({
            ios: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            android: {
                flexDirection: 'row',
                alignItems: 'center',
            },
        })
    },
    signup_user_col: {
        ...Platform.select({
            ios: {
                width: (48),
                alignItems: 'center',
                justifyContent: 'center',
            },
            android: {
                width: (45),
                marginRight: '0.3%',
                alignItems: 'center',
                justifyContent: 'center',
            },
        })
    },

    //signup screen page css end

    //sidebar screen page css start

    sidebar_container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#102B46',
        // width: width - 75
    },
    sidebar_backgroundImage: {
        width: '100%',
        height: '100%',
    },
    sidebar_text: {
        ...Platform.select({
            ios: {
                marginTop: 3,
                color: '#4f603c',
                marginLeft: 20,
                height: 40,
                fontWeight: "bold",
                fontStyle: 'italic',
                fontSize: 18,

            },
            android: {
                color: '#4f603c',
                marginLeft: 20,
                height: 40,
                fontWeight: "bold",
                fontSize: 18,
                fontStyle: 'italic',

            }
        })
    },

    sidebar_Close: {
        width: normalize(23),
        height: normalize(23),
        justifyContent: 'center',
        alignItems: 'center',
    },
    sidebar_UserProfile: {
        borderRadius: 30,
        height: 60,
        width: 60,
    },
    sidebar_logo: {
        width: 300,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sidebar_Center: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    sidebar_Listlogo: {
        ...Platform.select({
            ios: {
                width: 30,
                height: 30,

            },
            android: {
                width: 30,
                height: 30,

            }
        })
    },
    sidebar_NavRow: {
        ...Platform.select({
            ios: {
                height: normalize(90),
                paddingTop: normalize(25),
            },
            android: {
                height: normalize(65),
            }
        })

    },
    sidebar_NavCol: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: "20%",
    },
    sidebar_NavColImg: {
        alignItems: 'flex-end',
    },
    sidebar_back_arrow: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center',
                height: normalize(65),
                width: normalize(60)
            },
            android: {
                justifyContent: 'center',
                alignItems: 'center',
                height: normalize(65),
                width: normalize(60)
            },
        })
    },
    sidebar_sideNavText: {
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
        color: '#fff'
    },
    sidebar_sideNavSubText: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#fff'
    },
    sidebar_ProductsText: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#fff'
    },
    sidebar_ProfileRow: {
        backgroundColor: '#1e4164',
        height: normalize(100),
    },
    sidebar_ProfileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: normalize(22),
        width: normalize(80),
    },
    sidebar_ProfileContainer_row: {
        borderWidth: 1,
        borderRadius: 30,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sidebar_address_text: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#fff'
    },
    sidebar_menu_col: {
        marginBottom: "2%"
    },

    sidebar_ProfileName: {
        marginTop: normalize(22),
        marginBottom: normalize(5),
        height: normalize(35),
        // marginBottom: "5%",
    },
    sidebar_DrawerRow: {
        marginLeft: '10%',
        marginTop: "7%",
        marginRight: '10%',
    },
    sidebar_DrawerIcons: {
        width: '15%',
        height: '8%'
    },

    //sidebar screen page css end

    //Dashboard screen page css start

    dashboard_bg_image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    dashboard_menu_row: {
        height: 115
    },
    dashboard_workout_menu: {
        width: "27%",
        backgroundColor: "#F1C40E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2%",
        marginBottom: "2%",
        marginRight: "5%",
        marginLeft: "5%"
    },
    dashboard_NaveBar_text_col: {
        justifyContent: "center",
        alignItems: "center",
        width: normalize(240),
        paddingLeft: normalize(50),
    },
    dashboard_back_arrow: {
        ...Platform.select({
            ios: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            },
            android: {
                width: normalize(50),
                height: normalize(50),
                justifyContent: 'center',
                alignItems: 'center',
            }
        })

    },
    dashboard_workout_image_col: {
        justifyContent: "center",
        alignItems: "center"
    },
    dashboard_workout_image_row: {
        height: 50,
        alignItems: "flex-end"
    },
    dashboard_workout_image: {
        height: 35,
        width: 35
    },
    dashboard_workout_text: {
        fontSize: 16,
        color: "#102B46",
        fontFamily: "Poppins-SemiBold",
    },
    dashboard_schedule_menu: {
        width: "27%",
        backgroundColor: "#F1C40E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2%",
        marginTop: "2%",
        marginRight: "5%"
    },
    dashboard_schedule_image_col: {
        justifyContent: "center",
        alignItems: "center"
    },
    dashboard_schedule_image_row: {
        height: 50,
        alignItems: "flex-end"
    },
    dashboard_schedule_image: {
        height: 35,
        width: 35
    },
    dashboard_schedule_text: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 16,
        color: "#102B46",
        fontFamily: "Poppins-SemiBold"
    },
    dashboard_booking_menu: {
        width: "28%",
        backgroundColor: "#F1C40E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2%",
        marginTop: "2%",
        marginRight: "5%"
    },
    dashboard_booking_col: {
        justifyContent: "center",
        alignItems: "center"
    },
    dashboard_booking_row: {
        height: 50,
        alignItems: "flex-end"
    },
    dashboard_booking_image: {
        height: 35,
        width: 35
    },
    dashboard_booking_text: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 16,
        color: "#102B46",
        fontFamily: "Poppins-SemiBold"
    },
    dashboard_collapse_col: {
        borderWidth: 1,
        borderColor: "#102b46",
        borderRadius: 5,
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%"
    },
    dashboard_collapse_header_row: {
        paddingLeft: "5%",
        height: 45,
        backgroundColor: "#102b46",
        justifyContent: "center",
        alignItems: "center"
    },
    dashboard_collapse_header_col: {
        width: "90%"
    },
    dashboard_collapse_header_text: {
        fontSize: 17,
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff"
    },
    dashboard_collapse_header_two_col: {
        width: "10%"
    },
    dashboard_collapse_header_image: {
        height: 18,
        width: 18
    },
    dashboard_collapse_body: {
        backgroundColor: "#102B46",
        borderTopWidth: 1,
        borderColor: "#fff"
    },
    dashboard_collapse_body_row: {
        height: normalize(20),
        marginLeft: normalize(30),
        marginTop: normalize(10),
        marginBottom: normalize(10)
    },
    dashboard_collapse_body_text: {
        fontSize: 15,
        color: "white",
        fontFamily: "Poppins-Medium",
    },
    dashboard_collapse_body_two_row: {
        height: normalize(25),
        marginLeft: normalize(80),
    },
    dashboard_collapse_body_two_text: {
        fontSize: 15,
        color: "white",
        fontFamily: "Poppins-Medium",
    },
    dashboard_collapse_body_view: {
        borderTopWidth: 1,
        borderColor: "#fff"
    },
    dashboard_collapse_body_three_row: {
        justifyContent: "center",
        alignItems: "center",
        height: 170,
        backgroundColor: "#102B46"
    },
    dashboard_collapse_body_three_text: {
        fontSize: 20,
        color: "#fff"
    },
    dashboard_line_chart: {
        paddingLeft: 10,
        paddingBottom: 10
    },
    dashboard_item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        height: 32,
    },
    dashboard_emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
    dashboard_image: {
        padding: 20,
        margin: 20,
    },
    dashboard_title: {
        fontWeight: 'bold',
    },

    //Dashboard screen page css end


    // staff member screen page css start

    staff_member_row: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginRight: '3%',
        marginLeft: '3%',
        height: 95
    },
    staff_member_col: {
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    staff_member_image_col: {
        borderWidth: 1,
        height: 70,
        width: 70,
        borderRadius: 50
    },
    staff_member_image: {
        height: 68,
        width: 68,
        borderRadius: 50
    },
    staff_details_col: {
        justifyContent: 'center'
    },
    staff_details_row: {
        height: '21%'
    },
    staff_member_text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: '#102b46',
        paddingLeft: '3%',
    },
    staff_member_text_two: {
        color: 'gray',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        paddingLeft: '3%',
    },
    // staff member screen page css end

    //membership type screen page css start

    membership_RowContainer: {
        borderBottomWidth: 1,
        marginLeft: "5%",
        marginRight: "5%",
        borderBottomColor: "#E1E1E1"
    },
    membership_ImageCol: {
        justifyContent: "center",
        width: "20%"
    },
    membership_ImageContainer: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#eabf0e',
        alignItems: "center",
        justifyContent: "center",
    },
    MembershipImage: {
        height: 32,
        width: 32,
    },
    MemberShipName: {
        marginTop: "11%",
        color: '#102B46',
        fontSize: 15,
        fontFamily: 'Poppins-Medium'
    },
    memberShipTime: {
        marginTop: 5
    },
    memberShipTime_col: {
        marginBottom: "13%"
    },
    memberShipTime_text: {
        color: '#777777',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    membership_amount_col: {
        width: "20%",
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    membership_amount_text: {
        color: '#777777',
        fontSize: 17,
        fontFamily: 'Poppins-Bold'
    },
    MembershipDetailContainer: {
        marginLeft: "0%"
    },
    //membership type screen page css end

    //Group screen page css start

    group_RowContainer: {
        borderBottomWidth: 1,
        marginLeft: "3%",
        marginRight: "3%",
        borderBottomColor: "#E9E8E8",
        height: normalize(90),
    },
    group_ImageCol: {
        justifyContent: "center",
        alignItems: 'center',
        width: "20%",
    },
    group_ImageContainer: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#eabf0e',
        alignItems: "center",
        justifyContent: "center",
    },
    GroupImage: {
        height: 32,
        width: 32,
    },
    product_ImageContainer: {
        height: 50,
        width: 50,
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center",
    },
    ProductImage: {
        height: 48,
        width: 48,
    },
    SubGroupImage: {
        height: 32,
        width: 32,
    },
    SubImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    SubProductImage: {
        height: '100%',
        maxHeight: 400,
        width: '100%'
    },
    ZoomProductImage: {
        height: '80%',
        width: '80%'
    },
    Product_amount_container:  {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 15
    },
    Product_input: {
        width: 40,
        fontWeight: '400',
        fontSize: 22,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
    },
    Product_buy_button: {
        marginLeft: 30,
        backgroundColor: 'yellow'
    },
    group_Name: {
        color: '#102b46',
        fontSize: 15,
        fontFamily: 'Poppins-Bold'
    },
    group_col: {
        marginTop: normalize(20),
        marginBottom: normalize(20)
    },
    group_details_col: {
        justifyContent: 'center'
    },
    group_member_text: {
        color: '#777777',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    },
    group_modal_col: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
    group_modal_button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#102B46',
        height: normalize(35),
        width: normalize(95),
        borderRadius: normalize(30)
    },
    group_modal_text: {
        fontSize: 18,
        color: '#102B46',
        fontFamily: 'Poppins-Medium'
    },
    group_modal_main_view: {
        shadowOffset: { width: 0, height: 1, },
        elevation: 300,
        height: Dimensions.get('window').height,
        backgroundColor: "rgba(100,100,100, 0.8)",
    },
    qr_modal_main_view: {
        shadowOffset: { width: 0, height: 1, },
        elevation: 300,
        height: Dimensions.get('window').height,
        backgroundColor: "rgba(100,100,100, 0.1)",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    zoomQRCode: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 550,
        height: 550,
    },
    group_modal_view: {
        height: normalize(300),
        backgroundColor: '#fff',
        borderRadius: 20,
        marginLeft: normalize(60),
        marginRight: normalize(60),
        marginTop: normalize(160),
        paddingBottom: normalize(50)
    },
    product_modal_view: {
        height: normalize(500),
        backgroundColor: '#fff',
        borderRadius: 10,
        marginLeft: normalize(60),
        marginRight: normalize(60),
        marginTop: normalize(160),
        paddingBottom: normalize(50)
    },
    group_modal_row: {
        height: '18%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#8A8B8B',
    },
    group_name_col: {
        paddingLeft: '10%',
        width: '81%',
        borderTopLeftRadius: 20,
        justifyContent: 'center',
    },
    group_name_text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: '#102B46',
        paddingRight: 20
    },
    group_back_arrow_col: {
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    group_back_arrow_text: {
        height: normalize(45),
        width: normalize(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    group_close_image: {
        height: 18,
        width: 18,
    },
    group_nodata_row: {
        height: normalize(55),
        marginHorizontal: "5%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(80)
    },
    group_nodata_text: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#102B46',
    },
    group_member_image_row: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#8A8B8B',
        height: normalize(55),
        alignItems: 'center',
        marginHorizontal: "5%"
    },
    group_member_image_col: {
        height: normalize(45),
        width: normalize(45),
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#eabf0e',
        alignItems: "center",
        justifyContent: "center",
    },
    group_main_ImageCol: {
        justifyContent: "center",
        alignItems: 'center',
        width: "20%",
    },
    group_member_name_col: {
        marginLeft: 10,
    },
    group_member_text: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#102B46',
    },

    //Group screen page css end

    //Member screen page css start

    //Attendance screen page css start

    attendance_container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    attendance_ClassText: {
        ...Platform.select({
            ios: {
                height: 25,
                fontSize: 18, fontFamily: 'Poppins-Bold',
                color: '#ffffff',
            },
            android: {
                fontSize: 18, fontFamily: 'Poppins-Bold',
                color: '#ffffff',
            }
        })
    },
    attendance_collapse_body: {
        backgroundColor: '#102b46',
    },
    attendance_body_list: {
        borderBottomWidth: 2,
        marginLeft: '5%',
        marginRight: '5%'
    },
    attendance_body_item: {
        width: "100%"
    },
    attendance_body_item_text: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#ffffff',
        paddingLeft: '5%',
    },
    attendance_name_col: {
        height: normalize(50),
        alignItems: 'center',
        marginRight: '5%',
        marginLeft: '5%',
    },
    attendance_name_text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#102b46'
    },
    attendance_collapse_row: {
        paddingLeft: '5%',
        height: 45,
        backgroundColor: '#102b46',
        justifyContent: 'center',
        alignItems: 'center',
    },
    attendance_collapse_text_col: {
        width: '90%',
    },
    attendance_collapse_text: {
        fontSize: 18, fontFamily: 'Poppins-Bold',
        color: '#ffffff',
    },
    attendance_collapse_image_col: {
        width: '10%',
    },
    attendance_collapse_image: {
        height: 20,
        width: 20,
    },
    attendance_row: {
        marginLeft: '5%',
        marginRight: '5%',
        height: normalize(70),
        paddingLeft: '5%',
        borderTopWidth: 1,
        borderTopColor: '#F4F4F4'
    },
    attendance_image_col: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '8%',
    },
    attendance_image_col_text: {
        fontFamily: 'Poppins-Regular',
    },
    attendance_col: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '26%',
    },
    attendance_image_css: {
        backgroundColor: 'green',
        borderRadius: 50,
        height: 16,
        width: 16,
        borderWidth: 1,
        borderColor: 'green',
    },
    attendance_image_two_css: {
        backgroundColor: 'red',
        borderRadius: 50,
        height: 16,
        width: 16,
        borderWidth: 1,
        borderColor: 'red',
    },
    //Attendance screen page css end

    //Membership Details screen page css start
    membershipdetails_row: {
        alignItems: 'center',
        paddingVertical: 20,
        marginLeft: '5%',
        marginRight: '5%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
    },
    membershipdetails_image_col: {
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    membershipdetails_details_image: {
        height: 35,
        width: 35,
    },
    membershipdetails_col: {
        justifyContent: 'center'
    },
    membership_details_row: {
        alignItems: 'center',
    },
    membershipdetails_text: {
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        color: '#102b46',
    },
    membershipdetails_data_row: {
        alignItems: 'center',
    },
    membershipdetails_data_text: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Poppins-Regular',
        opacity: 0.7
    },
    //Membership Details screen page css end

    //Personal Details screen page css end

    personaldetail_row: {
        alignItems: 'center',
        paddingVertical: 20,
        marginLeft: '5%',
        marginRight: '5%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgray',
    },
    personaldetail_image_col: {
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personaldetail_image: {
        height: 35,
        width: 35,
    },
    personaldetail_data_col: {
        justifyContent: 'center'
    },
    personaldetail_data_row: {
        alignItems: 'center',
    },
    personaldetail_text: {
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        color: '#102b46',
    },
    personaldetail_data_text: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        opacity: 0.7
    },

    //Personal Details screen page css end

    //Profile css start

    profile_row: {
        height: normalize(110),
        marginLeft: normalize(25)
    },
    profile_col: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    profile_Image_col: {
        height: normalize(80),
        width: normalize(80),
        borderRadius: normalize(15),
        borderColor: '#102b46',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_Image_css: {
        height: normalize(78),
        width: normalize(78),
        borderRadius: normalize(15),
    },
    profile_name_row: {
        height: normalize(25),
        marginLeft: 0,
        marginTop: normalize(20),
    },
    profile_name_text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#102b46'
    },
    profile_address_row: {
        height: normalize(20),
        flexDirection: 'row',
        marginLeft: 0,
        marginTop: normalize(4),
    },
    profile_address_col: {
        width: normalize(265),
        alignItems: 'flex-start'
    },
    profile_address_text: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Poppins-Regular',
        opacity: 0.7
    },
    profile_state_row: {
        height: normalize(20),
        marginLeft: 0,
        width: normalize(150),
        marginTop: normalize(4),
    },
    profile_state_image_col: {
        width: normalize(20),
        justifyContent: 'flex-start'
    },
    profile_state_image: {
        height: normalize(15),
        width: normalize(15),
    },
    profile_state_col: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    profile_state_text: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Poppins-Regular',
        opacity: 0.7
    },

    //Profile css end

    //Member screen page css end

    //activity screen page css start

    activity_mainContainer: {
        backgroundColor: '#ffffff',
        justifyContent: "center",
    },
    activity_RowContainer: {
        ...Platform.select({
            ios: {
                borderWidth: 1,
                marginLeft: normalize(20),
                marginRight: normalize(20),
                borderRadius: normalize(10),
                marginTop: normalize(10),
                borderColor: '#DFDFDF',
            },
            android: {
                borderWidth: 1,
                marginLeft: normalize(20),
                marginRight: normalize(20),
                borderRadius: normalize(10),
                marginTop: normalize(10),
                borderColor: '#DFDFDF',
            }
        })

    },

    activity_ImageCol: {
        justifyContent: "center",
        width: "20%"
    },
    activity_ImageContainer: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#eabf0e',
        alignItems: "center",
        justifyContent: "center",
    },
    activity_MembershipImage: {
        height: 30,
        width: 30,
        borderRadius: 20,
    },
    activity_title: {
        color: '#102b46',
        fontSize: 17,
        fontFamily: 'Poppins-Medium'
    },
    activity_video_button_row: {
        marginLeft: normalize(15),
        marginTop: normalize(10),
    },
    activity_video_button_col: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        marginRight: normalize(15)
    },
    activity_video: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#102B46',
        height: normalize(35),
        width: normalize(95),
        borderRadius: normalize(30)
    },
    activity_video_button_text: {
        fontSize: 18,
        color: '#102B46',
        fontFamily: 'Poppins-Medium'
    },
    activity_category_row: {
        marginBottom: normalize(2)
    },
    activity_category_image_col: {
        width: normalize(23),
        marginLeft: normalize(15),
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: normalize(3)
    },
    activity_category_image: {
        height: normalize(14),
        width: normalize(14),
    },
    activity_category_text_col: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    activity_category_name: {
        color: '#777777',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    activity_trainer_row: {
        marginBottom: normalize(4),
    },
    activity_trainer_col: {
        width: normalize(23),
        marginLeft: normalize(15),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    activity_trainer_image: {
        height: normalize(16),
        width: normalize(16),
    },
    activity_trainer_text_col: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    activity_trainer_text: {
        color: '#777777',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    activity_membership_list_col: {
        width: normalize(23),
        marginLeft: normalize(15),
    },
    activity_membership_list_image: {
        height: normalize(17),
        width: normalize(16),
    },
    activity_membership_list_text: {
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        color: '#777777'
    },
    activity_trainer_big_image: {
        flexGrow: 1,
        width: "100%",
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(10)
    },
    activity_tranier_view_big_image: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingRight: '3%',
        paddingLeft: '3%',
        paddingTop: '3%',
        paddingBottom: '3%',
    },

    activity_VideoTitleText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    activity_video_list_view: {
        height: 250,
        margin: 10
    },
    activity_nodata_view: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '75%'
    },
    activity_nodata_text: {
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        color: '#102b46'
    },
    //activity screen page css end

    //Class Schedule screen page css start

    classSchedult_row: {
        marginRight: normalize(30),
        marginLeft: normalize(30),
        marginTop: normalize(35),
        borderBottomWidth: 1,
        borderBottomColor: '#777777'
    },
    classSchedult_col: {
        width: '100%',
        paddingBottom: normalize(10)
    },
    classSchedult_class_row: {
        alignItems: 'flex-end'
    },
    classSchedult_class_row_text: {
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        color: '#102b46',
    },
    classSchedult_classdata_row: {
        justifyContent: 'center',
        alignItems: 'center',
        height: normalize(30)
    },
    classSchedult_classimage_col: {
        width: '7%',
        justifyContent: 'center',
    },
    classSchedult_classdata_image: {
        height: 17,
        width: 17,
    },
    classSchedult_classtext_col: {
        justifyContent: 'center',
        paddingTop: normalize(5)
    },
    classSchedult_classdata_text: {
        color: '#777777',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },

    classlist_row: {
        height: normalize(80),
        marginRight: normalize(25),
        marginLeft: normalize(25),
        borderBottomWidth: 1,
        borderBottomColor: '#EFEEEE'
    },
    classlist_col: {
        width: normalize(200),
    },
    classlist_dataname_row: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    classlist_dataname_text: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#102b46',
    },
    classlist_dataname_time: {
        color: 'gray',
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
    },
    classlist_dataname_text_row: {
        height: '50%',
    },
    classlist_image_row: {
        height: normalize(40),
        paddingBottom: normalize(15)
    },
    classlist_image_col: {
        width: normalize(25),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    classlist_image: {
        height: 16,
        width: 16,
    },
    classlist_time_col: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: normalize(5)
    },

    //Class Schedule screen page css end

    //Class Booking screen page css start

    bookclasslist_row: {
        height: normalize(100),
        marginRight: normalize(40),
        marginLeft: normalize(40),
        borderBottomWidth: 1,
        borderBottomColor: "#EFEEEE",
    },
    bookclasslist_name_row: {
        height: normalize(40),
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    bookclasslist_name_text: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        color: "#102b46",
    },
    bookclasslist_calendar_row: {
        height: normalize(30),
        paddingBottom: normalize(0),
    },
    bookclasslist_calendar_col: {
        width: normalize(25),
        justifyContent: "center",
        alignItems: "flex-start",
    },
    bookclasslist_calendar_image: {
        height: 16,
        width: 16,
    },
    bookclasslist_class_col: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: normalize(5),
    },
    bookclasslist_class_text: {
        color: "gray",
        fontFamily: "Poppins-Medium",
        fontSize: 13,
    },
    bookclasslist_time_row: {
        height: normalize(30),
        paddingBottom: normalize(0),
    },
    bookclasslist_time_col: {
        width: normalize(25),
        justifyContent: "center",
        alignItems: "flex-start",
    },
    bookclasslist_time_col2: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: normalize(5),
    },
    bookclasslist_time_image: {
        height: 16,
        width: 16,
    },
    bookclasslist_time_text: {
        color: "gray",
        fontFamily: "Poppins-Medium",
        fontSize: 13,
    },
    bookclasslist_cancel_button_col: {
        width: normalize(90),
        justifyContent: "center",
        alignItems: "center",
    },
    bookclasslist_cancel_button: {
        justifyContent: "center",
        alignItems: "center",
        height: normalize(35),
        width: normalize(95),
        borderWidth: 1,
        borderRadius: normalize(20),
        borderColor: "#102B46",
    },
    bookclasslist_cancel_button_text: {
        color: "#102B46",
        fontSize: 16,
        fontFamily: "Poppins-Medium",
    },
    classlimit_row: {
        height: normalize(40),
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    classlimit_row_text: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        color: "#102b46",
        marginLeft: normalize(20),
    },
    classbooking_item: {
        backgroundColor: "#102b46",
        flex: 1,
        flexDirection: "row",
        padding: normalize(10),
        marginRight: normalize(15),
        marginRight: normalize(15),
        marginTop: normalize(20),
        borderRadius: normalize(15),
        height: normalize(70),
    },
    classbooking_emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
    classbooking_image: {
        padding: 20,
        margin: 20,
    },
    classbooking_title: {
        fontWeight: "bold",
        color: "#fff",
    },
    class_title_css: {
        width: normalize(200)
    },
    classbooking_book_class_text: {
        color: "#fff",
        fontSize: 18,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins-SemiBold",
    },
    classbooking_agenda_down_arrow: {
        width: 25,
        height: 25
    },
    classbooking_main_modal_view: {
        shadowOffset: { width: 0, height: 1 },
        elevation: 300,
        height: Dimensions.get("window").height,
        backgroundColor: "rgba(100,100,100, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    classbooking_modal_view: {
        height: normalize(520),
        backgroundColor: "#fff",
        borderRadius: 20,
        marginLeft: normalize(10),
        marginRight: normalize(10),
    },
    classbooking_modal_row: {
        height: "10%",
        borderBottomWidth: 0.5,
        borderBottomColor: "#8A8B8B",
    },
    classbooking_modal_col: {
        paddingLeft: "8%",
        width: "85%",
        borderTopLeftRadius: 20,
        justifyContent: "center",
    },
    classbooking_modal_title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        color: "#102B46",
    },
    classbooking_modal_close_col: {
        borderTopRightRadius: 20,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    classbooking_modal_close_button: {
        height: normalize(45),
        width: normalize(50),
        justifyContent: "center",
        alignItems: "center",
    },
    classbooking_modal_close_image: {
        height: 18,
        width: 18
    },
    classbooking_modal_data_view: {
        flex: 1,
        marginLeft: normalize(15),
        marginRight: normalize(15),
    },
    classbooking_modal_data_row: {
        height: normalize(35),
        marginTop: normalize(18),
    },
    classbooking_modal_data_row2: {
        height: normalize(60),
        marginTop: normalize(10),
    },
    classbooking_modal_data_col: {
        width: normalize(155),
        alignItems: "flex-start",
        justifyContent: "center",
    },
    classbooking_modal_class_data_col: {
        alignItems: "flex-start",
        justifyContent: "center",
    },
    classbooking_modal_data_col2: {
        width: normalize(160)
    },
    classbooking_modal_data_col3: {
        paddingTop: normalize(30)
    },
    classbooking_modal_data_label: {
        fontFamily: "Poppins-Regular",
        fontSize: 18,
        color: "#102B46",
    },
    classbooking_modal_data: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        width: normalize(140),
        color: "#102B46",
    },
    classbooking_book_button: {
        height: normalize(40),
        marginTop: normalize(10),
        marginBottom: normalize(10),
    },
    classbooking_book_button_row: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#102B46",
        backgroundColor: "#102B46",
        height: normalize(40),
        width: normalize(120),
        borderRadius: normalize(10),
    },
    //Class Booking screen page css end

    //Assigned workout screen page css start

    assignworkouts_row: {
        borderBottomWidth: 0.4,
        borderBottomColor: 'black',
        height: 80,
        marginRight: '5%',
        marginLeft: '5%'
    },
    assignworkouts_image_col_one: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    assignworkouts_image_col_two: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eabf0e',
        borderRadius: 30,
        borderWidth: 1,
        height: 60,
        width: 60,
    },
    assignworkouts_image: {
        height: 35,
        width: 35,
    },
    assignworkouts_time_col: {
        justifyContent: 'center',
    },
    assignworkouts_time_text: {
        fontFamily: 'Poppins-Bold',
        color: '#102b46',
        fontSize: 16,
    },
    assignworkouts_time_data: {
        color: 'gray',
        fontFamily: 'Poppins-Regular',
    },
    assignworkouts_time_one_row: {
        alignItems: 'flex-end',
    },
    assignworkouts_time_two_row: {
        alignItems: 'center',
    },

    assignworkouts_list_name_col: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(225)
            },
            android: {
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(210),
            }
        })
    },
    assignworkouts_list_row: {
        height: normalize(120),
        marginLeft: normalize(20),
        marginTop: normalize(15),
        marginBottom: normalize(5),
        marginRight: normalize(20),
        backgroundColor: '#FCFBFB',
        borderRadius: normalize(20),
        borderWidth: 1,
        borderColor: '#D7D7D7',
    },
    assignworkouts_list_day_row: {
        height: normalize(35),
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        justifyContent: 'center',
        paddingLeft: normalize(45),
        marginLeft: normalize(18),
        marginRight: normalize(18)
    },
    assignworkouts_list_day_text: {
        fontSize: 19,
        color: '#102b46',
        fontFamily: 'Poppins-Bold',
    },
    assignworkouts_list_data_one_row: {
        height: normalize(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: normalize(5),
        marginRight: normalize(0),
        marginTop: normalize(7)
    },
    assignworkouts_list_data_two_row: {
        height: normalize(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: normalize(5),
        marginRight: normalize(5),
    },
    assignworkouts_list_data_one_col: {
        width: normalize(80)
    },
    assignworkouts_list_data_two_col: {
        width: normalize(110)
    },
    assignworkouts_list_data_one_text: {
        fontSize: 18,
        color: '#333333',
        fontFamily: 'Poppins-Bold'
    },
    assignworkouts_list_data_two_text: {
        fontSize: 18,
        color: '#777777',
        fontFamily: 'Poppins-Medium'
    },
    //Assigned workout screen page css end

    //workout screen page css start
    viewworkout_date_row: {
        marginTop: "5%",
        marginRight: "5%",
        marginLeft: "5%",
        alignItems: 'center',
    },
    viewworkout_calendar_col: {
        borderBottomWidth: 1,
        borderColor: '#d4d4d4',
        marginRight: "5%",
        marginLeft: "5%",
    },
    viewworkout_HeaderText: {
        ...Platform.select({
            ios: {
                fontSize: 17,
                fontFamily: 'Poppins-Bold',
                color: "#102b46",

            },
            android: {

                fontSize: 17,
                fontFamily: 'Poppins-Bold',
                color: "#102b46",
            }
        })
    },
    viewworkout_Col: {
        backgroundColor: '#102b46',
        borderRadius: normalize(10),
        marginTop: normalize(5),
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        marginBottom: normalize(20),
        marginLeft: normalize(10),
        marginRight: normalize(10)
    },
    viewworkout_title: {
        marginBottom: 8,
        marginLeft: normalize(10),
        height: 25,
        alignItems: 'center'
    },
    viewworkout_contanier: {
        height: normalize(30),
        marginTop: normalize(10),
        marginBottom: normalize(10),
    },
    viewworkout_row: {
        marginLeft: normalize(5),
        marginRight: normalize(5),
    },
    viewworkout_data_one_Col: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: normalize(70),
        height: normalize(35),
    },
    viewworkout_data_one_Col2: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    viewworkout_data_two_Col: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(75)
    },
    viewworkout_data_text: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    addworkout_HeaderText: {
        ...Platform.select({
            ios: {
                fontSize: 17,
                // padding: 10,
                fontFamily: 'Poppins-Bold',
                color: "#102b46",
                // alignItems: 'center',
                // height: 15,

            },
            android: {
                fontSize: 17,
                // padding: 10,
                fontFamily: 'Poppins-Bold',
                color: "#102b46",
                // alignItems: 'center',
            }
        })
    },
    addworkout_notes_Input: {
        ...Platform.select({
            ios: {
                height: normalize(40),
                width: '100%',
                paddingLeft: 20,
                paddingLeft: 20,
                paddingTop: "3%",
                fontFamily: 'Poppins-Medium'
            },
            android: {
                // marginTop: 10,
                height: normalize(40),
                width: '100%',
                paddingLeft: 20,
                paddingRight: 20,
                fontFamily: 'Poppins-Medium'
            }
        })
    },
    addworkout_Col: {
        backgroundColor: '#102b46',
        borderRadius: normalize(10),
        marginTop: normalize(5),
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        marginBottom: normalize(20),
        marginLeft: normalize(10),
        marginRight: normalize(10)
    },
    addworkout_Title: {
        marginBottom: 8,
        marginLeft: normalize(10),
        height: 25,
        alignItems: 'center'
    },
    addworkout_Container: {
        height: normalize(30),
        marginTop: normalize(10),
        marginBottom: normalize(10),
    },
    addworkout_TextInputRow: {
        borderWidth: 1,
        borderRadius: 40,
        height: normalize(45),
        marginLeft: normalize(22),
        marginRight: normalize(22),
        backgroundColor: '#FCFBFB',
        borderColor: '#ecebeb',
        justifyContent: 'center',
    },
    addworkout_btn:
    {
        backgroundColor: '#F1C40E',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: normalize(22),
        marginLeft: normalize(22),
        marginTop: normalize(20),
        marginBottom: normalize(25),
    },
    addworkout_btn_container:
    {
        alignItems: 'center',
        height: 40,
    },
    addworkout_btn_text:
    {
        color: '#233842',
        fontSize: 18,
        justifyContent: 'center',
        fontFamily: 'Poppins-Bold'
    },
    addworkout_keyboard: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    addworkout_input_Col: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(75)
    },
    addworkout_input_row: {
    },
    addworkout_input: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        alignItems: 'center',
    },
    addworkout_kg_col: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: normalize(35)
    },
    addworkout_kg_input_col: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(75)
    },
    addworkout_rest_time_row: {
        justifyContent: 'center',
        alignItems: 'center',
        height: normalize(35)
    },
    addworkout_rest_time_col: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(75)
    },
    //workout screen page css end

    //Measurement screen page css start

    measurement_container: {
        height: 40,
        marginBottom: "4%"
    },
    measurement_field_container: {
        borderWidth: 1,
        borderRadius: 30,
        width: "90%",
        backgroundColor: '#fcfbfb',
        borderColor: '#ecebeb'
    },
    measurement_sub_field_container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#ecebeb'
    },
    measurement_sub_field_container_two: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    measurement_header_text: {
        ...Platform.select({
            ios: {
                fontSize: 18,
                fontFamily: 'Poppins-SemiBold',
                color: "#102b46",
            },
            android: {

                fontSize: 18,
                fontFamily: 'Poppins-SemiBold',
                color: "#102b46",
            }
        })
    },
    measurement_btn:
    {
        backgroundColor: '#F1C40E',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: '5%',
        marginLeft: '5%',
        marginBottom: normalize(40)
    },
    measurement_btn_container:
    {
        alignItems: 'center',
        height: 40,
    },
    measurement_btn_text:
    {
        color: '#233842',
        fontSize: 18,
        justifyContent: 'center',
        fontFamily: 'Poppins-Bold'
    },
    measurement_header_text_row: {
        marginRight: "5%",
        marginLeft: "5%",
        marginTop: normalize(10)
    },
    measurement_field_col: {
        marginRight: '5%',
        marginLeft: '5%',
        borderTopWidth: 1,
        borderColor: "#d4d4d4",
    },
    measurement: {
        marginBottom: 8,
        marginTop: 8,
        height: 25,
    },
    measurement_container_col: {
        alignItems: 'flex-end'
    },
    measurement_field_text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15
    },
    measurement_field_input: {
        color: "#a4a4a4",
        paddingLeft: normalize(5),
        width: normalize(85),
    },
    measurement_keyboard: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    viewmeasurement_nodata_text: {
        fontSize: 19,
        color: '#102b46',
    },
    viewmeasurement_data_row: {
        backgroundColor: '#FCFBFB',
        borderColor: '#EBEBEB',
        borderWidth: 1,
        height: normalize(75),
        marginLeft: normalize(20),
        marginRight: normalize(20),
        borderRadius: normalize(10),
        marginBottom: normalize(6),
        marginTop: normalize(10)
    },
    viewmeasurement_image_col: {
        width: normalize(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewmeasurement_image: {
        height: normalize(50),
        width: normalize(50),
        borderRadius: normalize(15),
    },
    viewmeasurement_data_col: {
        justifyContent: 'center'
    },
    viewmeasurement_data_text: {
        color: '#102b46',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17,
    },
    viewmeasurement_data_text_two: {
        color: '#102b46',
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    viewmeasurement_data_col_two: {
        width: normalize(120),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    viewmeasurement_data_text_three: {
        color: 'gray',
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    //Measurement screen page css end

    //Fees payment screen page css start

    viewinvoice_row: {
        height: normalize(80),
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: normalize(20),
        backgroundColor: '#525659'
    },
    viewinvoice_button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#102B46',
        height: normalize(45),
        width: normalize(150),
        borderRadius: 10
    },
    viewinvoice_text: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#F1C40E',
    },
    feespayment_data_row: {
        height: normalize(130),
        marginLeft: normalize(25),
        marginRight: normalize(25),
        paddingTop: normalize(10),
        paddingBottom: normalize(15),
        borderBottomWidth: 1.5,
        borderBottomColor: '#EFEFEF'
    },
    feespayment_data_col: {
        width: '68%',
    },
    feespayment_data_col_two: {
        paddingTop: '5%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    feespayment_data_col_text: {
        color: '#102b46',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    },
    feespayment_details_col: {
        justifyContent: 'center',
        width: '50%'
    },
    feespayment_details_text: {
        color: 'gray',
        fontSize: 14,
        fontFamily: 'Poppins-Medium'
    },
    feespayment_details_col_two: {
        justifyContent: 'center',
        width: '10%'
    },
    feespayment_details_col_three: {
        justifyContent: 'center',
        width: '40%'
    },
    feespayment_button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#102B46',
        height: 35,
        width: 100,
        borderRadius: 20
    },
    feespayment_button_text: {
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        color: '#102B46',
    },
    viewpayment_row: {
        height: normalize(35),
        alignItems: 'flex-end',
        marginLeft: normalize(20)
    },
    viewpayment_row_text: {
        color: '#102b46',
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    viewpayment_details_row: {
        height: normalize(55),
        marginTop: normalize(10),
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        marginLeft: normalize(20),
        marginRight: normalize(20)
    },
    viewpayment_image_col: {
        width: normalize(45),
        justifyContent: 'center',
        marginLeft: normalize(20),
        marginBottom: normalize(5)
    },
    viewpayment_image: {
        height: 28,
        width: 28,
    },
    viewpayment_details_col: {
        marginBottom: normalize(5)
    },
    viewpayment_details_text_row: {
        alignItems: 'flex-start',
        marginTop: normalize(7)
    },
    viewpayment_details_text_row_two: {
        alignItems: 'flex-end',
        marginBottom: normalize(7)
    },
    viewpayment_details_label: {
        color: '#102b46',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14
    },
    viewpayment_details_text: {
        color: 'gray',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    //Fees payment screen page css end

    //Notice screen page css start
    notice_row: {
        height: normalize(75),
        paddingBottom: normalize(20),
        paddingTop: normalize(20),
        marginRight: normalize(25),
        marginLeft: normalize(25),
        borderBottomWidth: 0.7,
        borderBottomColor: '#777777',
    },
    notice_image_col: {
        width: '13%'
    },
    notice_image_view: {
        height: normalize(46),
        width: normalize(46),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#102B46',
        padding: normalize(5),
        borderRadius: 23
    },
    notice_image: {
        alignSelf: 'center',
        height: normalize(25),
        width: normalize(25)
    },
    notice_time_col: {
        width: '55%',
        justifyContent: 'center'
    },
    notice_time_view: {
        marginLeft: normalize(20)
    },
    notice_title_text: {
        color: '#102B46',
        fontFamily: 'Poppins-Medium',
        fontSize: 15
    },
    notice_date_text: {
        fontSize: 12,
        color: '#777777',
        fontFamily: 'Poppins-Regular'
    },
    notice_view_button_col: {
        width: '32%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    notice_view_button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: normalize(10),
        height: normalize(35),
        width: normalize(95),
        borderWidth: 1,
        borderRadius: normalize(20),
        borderColor: '#102B46'
    },
    notice_view_button_text: {
        color: '#102B46',
        fontSize: 16,
        fontFamily: 'Poppins-Medium'
    },
    notice_modal_main_view: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notice_modal_view: {
        height: "55%",
        width: "85%",
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: '10%'
    },
    notice_modal_row: {
        height: "20%",
        position: 'relative',
        borderBottomWidth: 0.5,
        borderBottomColor: '#8A8B8B',
    },
    notice_modal_title_col: {
        paddingLeft: "10%",
        width: "83%",
        borderTopLeftRadius: 20,
        justifyContent: 'center',
    },
    notice_modal_title_text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17,
        color: '#102B46'
    },
    notice_modal_close: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notice_modal_close_image: {
        height: 20,
        width: 20,
    },
    notice_modal_row_two: {
        height: "15%",
        alignItems: 'center',
        marginTop: '1%',
        paddingLeft: "10%",
    },
    notice_modal_text_label: {
        color: '#102B46',
        fontFamily: 'Poppins-Medium',
        fontSize: 15
    },
    notice_modal_text: {
        color: '#777777',
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    notice_modal_row_three: {
        height: '15%',
        alignItems: 'center',
        paddingLeft: '10%',
    },
    notice_modal_member_image: {
        height: normalize(20),
        width: normalize(20),
        borderRadius: 30,
        borderWidth: 1
    },
    notice_modal_member_text: {
        color: '#777777',
        marginLeft: '3%',
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    modal_container_row: {
        height: '40%',
        marginLeft: '10%',
        marginTop: '2%',
        marginRight: '10%',
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: '#777777'
    },
    notice_container_text: {
        paddingTop: '2%',
        paddingLeft: '3%',
    },
    modal_container_text: {
        marginHorizontal: 7,
        marginVertical: 7
    },
    //Notice screen page css end

    //Nutrition screen page css start
    nutrition_list_name_col: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(130)
            },
            android: {
                justifyContent: 'center',
                alignItems: 'center',
                color: '#656565',
                width: normalize(120),
            }
        })
    },
    nutrition_list_name_col_1: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'center',
                width: normalize(50)
            },
            android: {
                justifyContent: 'center',
                alignItems: 'center',
                color: '#656565',
                width: normalize(50),
            }
        })
    },
    AlignRightNavbar: {
    },
    containterProductList: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    product_list_row: {
        flex: 1,
        borderBottomWidth: 0.4,
        borderBottomColor: 'black',
        height: 80,
        minWidth: 400,
        marginRight: '5%',
        marginLeft: '5%'
    },
    nutrition_list_row: {
        borderBottomWidth: 0.4,
        borderBottomColor: 'black',
        height: 80,
        marginRight: '5%',
        marginLeft: '5%'
    },
    nutrition_list_col: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nutrition_list_image_col: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eabf0e',
        borderRadius: 30,
        borderWidth: 1,
        height: 60,
        width: 60,
    },
    logout_image: {
        height: 35,
        width: 35,
        paddingLeft: 10
    },
    product_list_image: {
        height: 60,
        width: 60,
    },
    nutrition_list_image: {
        height: 120,
        width: 120,
        padding: 30
    },
    Membership_card_image: {
        height: 210,
        width: 210
    },
    ProductsListTitleContainer: {
        ...Platform.select({
            ios: {
                height: normalize(75),
                color: '#656565',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: normalize(25),
                justifyContent: 'space-between',
                width: '100%',
                paddingLeft: 20
                
            },
            android: {
                height: normalize(60),
                color: '#656565',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingLeft: 20
            }
        })
    },
    MembershipTitle: {
        color: '#656565',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 15
    },
    MembershipValidDate: {
        color: '#656565',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15
    },
    HTMLViewContainer: {
        flex: 1,
        marginTop: 30,
        color: '#f0f',
        width: 350,
        height: 300
    },
    MembershipMemberName: {
        marginTop: 15,
        color: '#00A6F5',
        fontWeight: 'bold',
        fontSize: 22,
    },
    MembershipMemberEmail: {
        color: '#00A6F5',
        fontSize: 20,
    },
    MembershipCardNumber: {
        color: '#00A6F5',
        fontSize: 20,
        textAlign: 'right'
    },
    MembershipCardView: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    MembershipView: {
        padding: 0
    },
    ImageLogoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    product_list_image_col: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        height: 60,
        width: 60,
    },
    containerButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: 'lightgray',
        width: '80%',
        textAlign: 'right',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8
    },
    buttonText: {
        color: '#656565',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nutrition_list_details_col: {
        justifyContent: 'center',
    },
    nutrition_list_details_row: {
        height: '30%',
        alignItems: 'center',
    },
    nutrition_list_details_label: {
        fontFamily: 'Poppins-Medium',
        color: '#102b46',
        fontSize: 15,
    },
    nutrition_list_details_text: {
        fontFamily: 'Poppins-Medium',
        color: 'gray',
        fontSize: 15
    },
    nutritionschudule_list_row: {
        backgroundColor: '#FCFBFB',
        marginTop: normalize(12),
        marginLeft: normalize(25),
        marginRight: normalize(25),
        marginBottom: normalize(3),
        borderRadius: normalize(15),
        borderWidth: 1,
        borderColor: '#D0D0D0'
    },
    nutritionschudule_row: {
        alignItems: 'center',
        justifyContent: 'center',
        height: normalize(30),
        backgroundColor: '#FCFBFB',
        borderTopRightRadius: normalize(15),
        borderTopLeftRadius: normalize(15),
        borderColor: '#D0D0D0',
        borderBottomWidth: 1
    },
    nutritionschudule_list_text: {
        color: '#102b46',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    nutritionschudule_details_row: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: normalize(20),
        marginRight: normalize(20),
        marginTop: normalize(5)
    },
    nutritionschudule_details_col: {
        width: normalize(135)
    },
    nutritionschudule_details_col2: {
        alignItems: 'center',
        width: normalize(20)
    },
    nutritionschudule_details_text: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#333333'
    },    
    nutritionschudule_details_data: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#777777'
    },
    historySchedule_list_row: {
        backgroundColor: '#FCFBFB',
        marginTop: normalize(12),
        marginLeft: normalize(25),
        marginRight: normalize(25),
        marginBottom: normalize(3),
        borderRadius: normalize(15),
        borderWidth: 1,
        borderColor: '#D0D0D0'
    },
    historySchedule_row: {
        alignItems: 'center',
        justifyContent: 'center',
        height: normalize(30),
        backgroundColor: '#FCFBFB',
        borderTopRightRadius: normalize(15),
        borderTopLeftRadius: normalize(15),
        borderColor: '#D0D0D0',
        borderBottomWidth: 1
    },
    historySchedule_list_text: {
        color: '#102b46',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    historySchedule_details_row: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: normalize(20),
        marginRight: normalize(20),
        marginTop: normalize(5)
    },
    historySchedule_details_col: {
        width: normalize(135)
    },
    historySchedule_details_text: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#333333'
    },
    historySchedule_details_data: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#777777'
    },

    //Nutrition screen page css end

    //Message screen page css start

    compose_btn: {
        backgroundColor: '#F1C40E',
        alignItems: 'center',
        borderRadius: normalize(30),
        marginRight: normalize(20),
        marginLeft: normalize(20),
        marginBottom: normalize(15),
        marginTop: normalize(25)
    },
    compose_btn_container: {
        alignItems: 'center',
        height: 40,
    },
    compose_btn_text: {
        color: '#233842',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        justifyContent: 'center',
    },
    compose_row: {
        height: normalize(25),
        marginLeft: normalize(30),
        marginRight: normalize(30),
        marginTop: normalize(25),
        zIndex: -10
    },
    compose_text: {
        color: '#102b46',
        fontFamily: 'Poppins-Medium',
        fontSize: 16
    },
    compose_view: {
        ...Platform.select({
            ios: {
                zIndex: 1,
                marginLeft: normalize(30),
                marginRight: normalize(30),
            },
            android: {
                marginLeft: normalize(30),
                marginRight: normalize(30),
            },
        })
    },
    compose_dropdown: {
        height: normalize(40),
        backgroundColor: '#FCFBFB',
        borderColor: '#EBEBEB',
        borderWidth: 1,
        marginRight: normalize(30),
        borderRadius: normalize(10),
        marginTop: normalize(10),
    },
    compose_subject_row: {
        height: normalize(45),
        backgroundColor: '#FCFBFB',
        borderColor: '#EBEBEB',
        borderWidth: 1,
        marginLeft: normalize(30),
        marginRight: normalize(30),
        borderRadius: normalize(10),
        marginTop: normalize(10),
        zIndex: -10
    },
    compose_subject_text: {
        width: normalize(320)
    },
    compose_subject_input: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: normalize(6),
        paddingLeft: normalize(22),
        color: '#BAB9B9'
    },
    compose_message_row: {
        height: normalize(130),
        backgroundColor: '#FCFBFB',
        borderColor: '#EBEBEB',
        borderWidth: 1,
        marginLeft: normalize(30),
        marginRight: normalize(30),
        borderRadius: normalize(10),
        marginTop: normalize(10)
    },
    compose_message_text: {
        width: normalize(320),
        height: normalize(130),
    },
    compose_message_input: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        paddingLeft: normalize(22),
        paddingRight: normalize(22),
        paddingTop: normalize(10),
        width: normalize(320),
        height: normalize(130),
        color: '#BAB9B9'
    },
    inbox_row: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0DFDF',
        marginRight: '5%',
        marginLeft: '5%',
        height: 95
    },
    inbox_col: {
        width: '21%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    inbox_image_col: {
        borderWidth: 1,
        height: normalize(60),
        width: normalize(60),
        borderRadius: normalize(60),
        alignItems: 'center',
        justifyContent: 'center'
    },
    inbox_image: {
        height: normalize(58),
        width: normalize(58),
        borderRadius: normalize(58),
        alignItems: 'center',
        justifyContent: 'center'
    },
    inbox_container_row: {
        height: '21%',
    },
    inbox_container_col: {
        justifyContent: 'center',
    },
    inbox_container_col2: {
        width: '28%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    inbox_message_for: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: '#102b46',
    },
    inbox_container_data: {
        color: 'gray',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    inboxview_view: {
        height: normalize(50),
        borderBottomColor: '#102b46',
        borderBottomWidth: 1
    },
    back_arrow_image: {
        width: normalize(27),
        height: normalize(27)
    },
    inboxview_title_col: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: normalize(30)
    },
    inboxview_text_col: {
        color: '#102b46',
        fontSize: 20,
        fontWeight: 'bold'
    },
    //Message screen page css end

    //Account screen page css start

    account_TextValue: {
        ...Platform.select({
            ios: {
                width: normalize(240),
                height: normalize(50),
                fontFamily: 'Poppins-Medium',
                fontSize: 16
            },
            android: {
                width: normalize(240),
                height: normalize(50),
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
            },
        })
    },
    account_Email_TextValue: {
        ...Platform.select({
            ios: {
                width: normalize(240),
                height: normalize(50),
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
            },
            android: {
                height: normalize(50),
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
            },
        })
    },
    account_profile_name_row: {
        ...Platform.select({
            ios: {
                height: normalize(40),
                marginRight: normalize(20),
                marginLeft: normalize(20),
                marginBottom: normalize(20),
                borderColor: '#D9DEE2',
                borderBottomWidth: 1,
                paddingBottom: normalize(15),
                paddingRight: normalize(15),
                paddingLeft: normalize(15),
            },
            android: {
                height: normalize(40),
                marginRight: normalize(20),
                marginLeft: normalize(20),
                marginBottom: normalize(20),
                borderColor: '#D9DEE2',
                borderBottomWidth: 1,
                paddingBottom: normalize(15),
                paddingRight: normalize(15),
                paddingLeft: normalize(15),
            }
        })
    },
    account_profile_name_col: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginLeft: normalize(20),
                width: normalize(240),
            },
            android: {
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginLeft: normalize(20),
                width: normalize(240),
            }
        })
    },
    account_profile_Email_name_col: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginLeft: normalize(20),
                width: normalize(245),
            },
            android: {
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginLeft: normalize(20),
                width: normalize(0),
            }
        })
    },
    account_btn:
    {
        backgroundColor: '#F1C40E',
        alignItems: 'center',
        borderRadius: normalize(30),
        marginRight: normalize(20),
        marginLeft: normalize(20),
        marginBottom: normalize(75),
        marginTop: normalize(15)
    },
    account_btn_container:
    {
        alignItems: 'center',
        height: 40,
    },
    account_btn_text:
    {
        color: '#233842',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        justifyContent: 'center',
    },
    account_user_row: {
        height: normalize(120),
        marginLeft: normalize(25),
        marginBottom: normalize(20)
    },
    compose_container: {
        paddingBottom: normalize(100),
    },
    account_user_col: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    account_keyboard: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    account_image_col: {
        height: normalize(80),
        width: normalize(80),
        borderRadius: normalize(15),
        borderColor: '#102b46',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    account_image: {
        height: normalize(80),
        width: normalize(80),
        borderRadius: normalize(15),
    },
    account_name_row: {
        height: normalize(25),
        marginTop: normalize(28)
    },
    account_name_text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#102b46'
    },
    account_address_row: {
        height: normalize(22),
        alignItems: 'center',
    },
    account_address_text: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        opacity: 0.7,
        width: normalize(180)
    },
    account_state_row: {
        height: normalize(20),
    },
    account_state_image_col: {
        width: normalize(20),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    account_state_image: {
        height: normalize(15),
        width: normalize(15),
    },
    account_state_col: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    account_state_text: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        opacity: 0.7
    },
    account_qr_col: {
        justifyContent: 'center',
        width: normalize(85)
    },
    account_profile_image_col: {
        width: normalize(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
    account_profile_image: {
        height: normalize(22),
        width: normalize(22)
    },
    account_Textedit: {
        justifyContent: 'center',
    },
    account_Textedit_col: {
        width: normalize(40),
        height: normalize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    account_Textedit_image: {
        height: normalize(16),
        width: normalize(16)
    },
    //Account screen page css end

    //Subscription screen page css start

    subscription_nodata_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },
    subscription_nodata_text: {
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        color: '#102b46'
    },
    subscription_collaps_col: {
        borderWidth: 1,
        borderColor: '#102b46',
        borderRadius: 5,
        marginLeft: normalize(10),
        marginRight: normalize(10),
        marginBottom: '5%',
    },
    subscription_header_row: {
        paddingLeft: '5%',
        height: 42,
        backgroundColor: '#102b46',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscription_header_col: {
        width: '90%',
    },
    subscription_header_text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#ffffff'
    },
    subscription_header_two_col: {
        width: '10%'
    },
    subscription_header_image: {
        height: 18,
        width: 18,
    },
    subscription_body_top_row: {
        backgroundColor: '#102b46',
        height: normalize(65),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#2F465D',
        borderColor: '#fff'
    },
    subscription_body_row: {
        backgroundColor: '#102b46',
        height: normalize(65),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#2F465D',
    },
    subscription_body_image_col: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: normalize(30),
        width: normalize(55)
    },
    subscription_body_image: {
        height: 28,
        width: 28,
    },
    subscription_body_text_col: {
        marginBottom: normalize(7),
        marginTop: normalize(7)
    },
    subscription_body_text_row: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    subscription_body_text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins-Medium'
    },
    subscription_body_text_two: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    subscription_details_row: {
        height: normalize(120),
        marginLeft: normalize(25),
        marginBottom: normalize(20)
    },
    subscription_image_col: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    subscription_image_two_col: {
        height: normalize(80),
        width: normalize(80),
        borderRadius: normalize(15),
        borderColor: '#102b46',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscription_image_css: {
        height: normalize(85),
        width: normalize(85),
        borderRadius: normalize(15),
    },
    subscription_text_col: {
        justifyContent: 'center',
    },
    subscription_name_row: {
        height: '20%',
    },
    subscription_name_text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#102b46'
    },
    subscription_address_row: {
        height: '18%',
        alignItems: 'center',
    },
    subscription_address_text: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        opacity: 0.7
    },
    subscription_location_row: {
        height: '15%',
        flexDirection: 'row',
    },
    subscription_location_col: {
        width: '7%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    subscription_location_image: {
        height: 12,
        width: 12,
    },
    subscription_state_col: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    subscription_state_text: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        opacity: 0.7
    },
    //Subscription screen page css end

    // <------------------------------------- Staff Member side css ------------------------------------->

    //Member Report screen page css start

    staffside_report_col: {
        borderWidth: 1,
        borderColor: "#102b46",
        borderRadius: 5,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "5%"
    },

    staffside_report_last_col: {
        borderWidth: 1,
        borderColor: "#102b46",
        borderRadius: 5,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "5%",
        marginBottom: "5%"
    },

    report_collaps_row: {
        paddingLeft: "5%",
        height: 45,
        backgroundColor: "#102b46",
        justifyContent: "center",
        alignItems: "center",
    },
    report_text_col: {
        width: "90%"
    },
    report_text_col_css: {
        fontSize: 17,
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff",
    },
    report_image_col: {
        width: "10%"
    },
    report_image_col_css: {
        height: 18,
        width: 18
    },
    report_collaps_nodata_body: {
        backgroundColor: "#102B46",
        paddingBottom: "5%",
        borderTopWidth: 1,
        borderColor: "#fff",
        paddingTop: "5%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    report_collaps_nodata_body_text: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    },
    report_collaps_data_body: {
        backgroundColor: "#102B46",
        paddingBottom: "5%",
        borderTopWidth: 1,
        borderColor: "#fff",
        paddingTop: "5%"
    },
    attendance_report_row: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(10)
    },
    attendance_report_first_col: {
        backgroundColor: '#F1C40E',
        width: normalize(22),
    },
    attendance_report_second_col: {
        backgroundColor: '#535935',
        width: normalize(22),
    },
    attendance_report_first_col_text: {
        fontSize: 12,
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff",
        marginLeft: normalize(10),
        marginRight: normalize(20)
    },
    attendance_report_second_col_text: {
        fontSize: 12,
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff",
        marginLeft: normalize(10),
    },
    attendance_scanner_view: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    attendance_scanner_nav_col: {
        justifyContent: "center",
        alignItems: "center",
        width: normalize(200),
        paddingLeft: normalize(0),
    },
    attendance_scanner_nav_second_col: {
        height: normalize(50),
        justifyContent: "center",
        alignItems: "center",
        width: normalize(50),
    },
    attendance_scanner_nav_thired_col: {
        height: normalize(50),
        justifyContent: "center",
        alignItems: "center",
        width: normalize(50),
    },
    attendance_scanner_second_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    attendance_scanner_button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: normalize(35),
        // width: normalize(130),
        borderWidth: 1,
        borderRadius: normalize(12),
        borderColor: '#102B46'
    },
    attendance_scanner_button_text: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 18,
        color: "#102B46",
        fontFamily: "Poppins-SemiBold"
    },
    attendance_details_membership_expire_text: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    },
    attendance_details_radio: {
        ...Platform.select({
            ios: {
                width: normalize(35),
                borderWidth: 1,
                // marginRight: normalize(10),
                borderRadius: normalize(35),
                height: normalize(35),
            },
            android: {
                width: normalize(0),
                height: normalize(60),
                marginTop: normalize(25)
            },
        })
    },
    attendance_details_radio_col: {
        ...Platform.select({
            ios: {
                marginLeft: normalize(20),
                flexDirection: 'row',
                alignItems: 'center',
                width: normalize(50),
                justifyContent: 'flex-start'
            },
            android: {
                marginLeft: normalize(25),
                flexDirection: 'row',
                alignItems: 'center',
                width: normalize(0),
                justifyContent: 'center'
            },
        })
    },
    attendance_details_ClassText: {
        ...Platform.select({
            ios: {
                height: 25,
                fontSize: 18, fontFamily: 'Poppins-Bold',
                color: '#ffffff',
            },
            android: {
                fontSize: 18, fontFamily: 'Poppins-Bold',
                color: '#ffffff',
            }
        })
    },
    attendance_details_btn:
    {
        backgroundColor: '#F1C40E',
        alignItems: 'center',
        borderRadius: normalize(30),
        marginRight: normalize(20),
        marginLeft: normalize(20),
        marginBottom: normalize(15),
        marginTop: normalize(25)
    },
    attendance_details_btn_container:
    {
        alignItems: 'center',
        height: normalize(50),
    },
    attendance_details_btn_text:
    {
        color: '#233842',
        fontSize: 22,
        fontFamily: 'Poppins-SemiBold',
        justifyContent: 'center',
    },
    //Member Report screen page css end



});
