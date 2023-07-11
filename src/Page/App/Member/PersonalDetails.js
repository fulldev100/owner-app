import React from 'react';
import { Text, View, Image, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Row, Col } from 'react-native-easy-grid'
import { t } from '../../../../locals';
import styleCss from '../../../style.js';

//Redux
import { connect } from "react-redux";
import { loadingStart, fetchUserdetails } from "../../redux/actions/auth";
class PersonalDetails extends React.Component {
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

              <Row style={styleCss.personaldetail_row}>
                <Col style={styleCss.personaldetail_image_col}>
                  <Image style={styleCss.personaldetail_image}
                    source={require('../../../images/Account-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.personaldetail_data_col}>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_text}>{t("Member ID")}</Text>
                  </Row>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_data_text}>{userData.member_unique_id}</Text>
                  </Row>
                </Col>
              </Row>

              <Row style={styleCss.personaldetail_row}>
                <Col style={styleCss.personaldetail_image_col}>
                  <Image style={styleCss.personaldetail_image}
                    source={require('../../../images/date-yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.personaldetail_data_col}>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_text}>{t("Membership Joining Date")}</Text>
                  </Row>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_data_text}>{userData.membership_valid_from}</Text>
                  </Row>
                </Col>
              </Row>

              <Row style={styleCss.personaldetail_row}>
                <Col style={styleCss.personaldetail_image_col}>
                  <Image style={styleCss.personaldetail_image}
                    source={require('../../../images/date-yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.personaldetail_data_col}>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_text}>{t("Membership End Date")}</Text>
                  </Row>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_data_text}>{userData.membership_valid_to}</Text>
                  </Row>
                </Col>
              </Row>

              <Row style={styleCss.personaldetail_row}>
                <Col style={styleCss.personaldetail_image_col}>
                  <Image style={styleCss.personaldetail_image}
                    source={require('../../../images/Membership-Type-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.personaldetail_data_col}>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_text}>{t("Member Type")}</Text>
                  </Row>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_data_text}>{userData.member_type}</Text>
                  </Row>
                </Col>
              </Row>

              <Row style={styleCss.personaldetail_row}>
                <Col style={styleCss.personaldetail_image_col}>
                  <Image style={styleCss.personaldetail_image}
                    source={require('../../../images/sand-clock-Yellow-512.png')}
                  />
                </Col>
                <Col style={styleCss.personaldetail_data_col}>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_text}>{t("Membership Status")}</Text>
                  </Row>
                  <Row style={styleCss.personaldetail_data_row}>
                    <Text style={styleCss.personaldetail_data_text}>{userData.membership_status}</Text>
                  </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
