import React from 'react';
import { Text, View, ScrollView, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { Row, Col } from 'react-native-easy-grid';
import { t } from '../../../../locals';
import styleCss from '../../../style.js';
import * as SecureStore from 'expo-secure-store';
//Redux
import { connect } from "react-redux";
import { loadingStart, fetchUserdetails } from "../../redux/actions/auth";

class MembershipDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  async singleMember() {
    const { fetchUserdetails, loadingStart } = this.props;
    loadingStart();
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    const userData = {
      "member_id": Id,
      "access_token": Token,
    };
    fetchUserdetails(userData)
  }
  onRefresh() {
    this.singleMember();
  }

  render() {
    const { userData, loading } = this.props;
    if (!loading) {
      return (
        <View style={styleCss.container}>
          <ScrollView
          refreshControl={
            <RefreshControl
              colors={["#102b46"]}
              refreshing={loading}
              onRefresh={this.onRefresh.bind(this)}
            />
          }>
            <Col>

              <Row style={styleCss.membershipdetails_row}>
                <Col style={styleCss.membershipdetails_image_col}>
                  <Image style={styleCss.membershipdetails_details_image}
                    source={require('../../../images/Group-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.membershipdetails_col}>
                  <Row style={styleCss.membership_details_row}>
                    <Text style={styleCss.membershipdetails_text}>{t("Membership")}</Text>
                  </Row>
                  <Row style={styleCss.membershipdetails_data_row}>
                    <Text style={styleCss.membershipdetails_data_text}>{userData.membership_name}</Text>
                  </Row>
                </Col>
              </Row>

              <Row style={styleCss.membershipdetails_row}>
                <Col style={styleCss.membershipdetails_image_col}>
                  <Image style={styleCss.membershipdetails_details_image}
                    source={require('../../../images/date-yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.membershipdetails_col}>
                  <Row style={styleCss.membership_details_row}>
                    <Text style={styleCss.membershipdetails_text}>{t("Expiry Date")}</Text>
                  </Row>
                  <Row style={styleCss.membershipdetails_data_row}>
                    <Text style={styleCss.membershipdetails_data_text}>{userData.membership_valid_to}</Text>
                  </Row>
                </Col>
              </Row>

              <Row style={styleCss.membershipdetails_row}>
                <Col style={styleCss.membershipdetails_image_col}>
                  <Image style={styleCss.membershipdetails_details_image}
                    source={require('../../../images/Class-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.membershipdetails_col}>
                  <Row style={styleCss.membership_details_row}>
                    <Text style={styleCss.membershipdetails_text}>{t("Classes")}</Text>
                  </Row>
                  {(userData.class_name != null) ? (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={styleCss.membershipdetails_data_text}>{userData.class_name}</Text>
                    </Row>
                  ) : (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={styleCss.membershipdetails_data_text}>{t("Not available class")}</Text>
                    </Row>
                  )}

                </Col>
              </Row>

              <Row style={styleCss.membershipdetails_row}>
                <Col style={styleCss.membershipdetails_image_col}>
                  <Image style={styleCss.membershipdetails_details_image}
                    source={require('../../../images/interest.png')}
                  />
                </Col>
                <Col style={styleCss.membershipdetails_col}>
                  <Row style={styleCss.membership_details_row}>
                    <Text style={styleCss.membershipdetails_text}>{t("Interest Area")}</Text>
                  </Row>
                  {(userData.interest_area != null) ? (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={styleCss.membershipdetails_data_text}>{userData.interest_area}</Text>
                    </Row>
                  ) : (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={styleCss.membershipdetails_data_text}>{t("Not available interest area")}</Text>
                    </Row>
                  )}

                </Col>
              </Row>

              <Row style={styleCss.membershipdetails_row}>
                <Col style={styleCss.membershipdetails_image_col}>
                  <Image style={styleCss.membershipdetails_details_image}
                    source={require('../../../images/Staff Member-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.membershipdetails_col}>
                  <Row style={styleCss.membership_details_row}>
                    <Text style={styleCss.membershipdetails_text}>{t("Staff Member")}</Text>
                  </Row>
                  {(userData.staff_member_name != null) ? (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={styleCss.membershipdetails_data_text}>{userData.staff_member_name}</Text>
                    </Row>
                  ) : (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={styleCss.membershipdetails_data_text}>{t("Not available staff member name")}</Text>
                    </Row>
                  )}

                </Col>
              </Row>

              <Row style={styleCss.membershipdetails_row}>
                <Col style={styleCss.membershipdetails_image_col}>
                  <Image style={styleCss.membershipdetails_details_image}
                    source={require('../../../images/Status-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.membershipdetails_col}>
                  <Row style={styleCss.membership_details_row}>
                    <Text style={styleCss.membershipdetails_text}>{t("Status")}</Text>
                  </Row>
                  <Row style={styleCss.membershipdetails_data_row}>
                    <Text style={{ fontSize: 12, color: 'gray', opacity: 0.7, fontFamily: 'Poppins-Regular' }}>{userData.membership_status}</Text>
                  </Row>
                </Col>
              </Row>

              <Row style={styleCss.membershipdetails_row}>
                <Col style={styleCss.membershipdetails_image_col}>
                  <Image style={styleCss.membershipdetails_details_image}
                    source={require('../../../images/Group-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.membershipdetails_col}>
                  <Row style={styleCss.membership_details_row}>
                    <Text style={styleCss.membershipdetails_text}>{t("Groups")}</Text>
                  </Row>
                  {(userData.group_name != null) ? (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={{ fontSize: 12, color: 'gray', opacity: 0.7, fontFamily: 'Poppins-Regular' }}>{userData.group_name}</Text>
                    </Row>
                  ) : (
                    <Row style={styleCss.membershipdetails_data_row}>
                      <Text style={{ fontSize: 12, color: 'gray', opacity: 0.7, fontFamily: 'Poppins-Regular' }}>{t("Not available Groups")}</Text>
                    </Row>
                  )}

                </Col>
              </Row>

            </Col>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styleCss.container}>

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

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = {
  fetchUserdetails,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembershipDetails);