import { defaultRestClient } from './restClient';
import { HOME_GYM, MEMBERSHIPREPORT , SELLREPORT , INCOMEREPORT ,PRODUCTLIST, PRODUCTGROUPLIST, FEEREPORT , STAFFATTENDANCEREPORT , STAFFMEMBERLOGIN, LOGIN , ACCESSRIGTHS ,RESERVATIONLIST, MEMBERSHIPLIST, TAKEATTENDANCE, MEMBER, MEMBERCLASS, GROUPLIST, VIEWGROUPLIST, STAFFLIST, SIGNUP, STAFF_MEMBER, MEMBERSHIP, MEMBERSHIPCLASSLIST, MEMBERSHIPDAYS, VIEWASSIGNWORKOUT, CLASSLIST, VIEWMEMBERATTENDANCELIST, CLASSSCHEDULTLIST, SINGLEMEMBER, SINGLEMEMBERSHIPTYPE, ACTIVITYLIST, DASHBOARDREPORT, DASHBOARDREPORTWAIST, DASHBOARDREPORTTHIGH, DASHBOARDREPORTARMS, DASHBOARDREPORTHEIGHT, DASHBOARDREPORTCHEST, DASHBOARDREPORTFAT, INBOXMESSAGELIST, SENTMESSAGELIST, NUTRITIONPLAN, MEMBERSHIPDETAILS, UPDATEMEMBERPROFILE, SUBSCRIPTIONHISTORYLIST, LISTWORKOUTLOG, ADDWORKOUTLOG, VIEWWORKOUTLOG, ADDMEASUREMENT, LISTMEASUREMENT, VIEWMEASUREMENT, PAYMENTLIST, NOTICELIST, VIEWNOTICE, GETALLMEMBERANDSTAFF, COMPOSEMESSAGE, WORKOUTIDWISEASSIGNDATA, SINGLEPAYMENTDETAILS, VIEWINVOICE, VIEWMESSAGE, WORKDATEARRAY, REPLYMESSAGELIST, SENDREPLYMESSAGE, SENDINVOICEMAIL, GETACTIVITYVIDEO, CLASSBOOKINGLIST, CANCELCLASSBOOKING, CLASSBOOKING, BOOKINGCLASS, USERLOGOUT, HISTORYLIST } from './Api';


export const staffloginAction = (data) => {
    return defaultRestClient.postWithBody(STAFFMEMBERLOGIN, data);
}

export const accessRightsAction = (data) => {
    return defaultRestClient.postWithBody(ACCESSRIGTHS, data); 
}

export const staffAttendanceAction = (data) => {
    return defaultRestClient.postWithBody(STAFFATTENDANCEREPORT, data);
}

export const feeReportAction = (data) => {
    return defaultRestClient.postWithBody(FEEREPORT, data);
}

export const incomeReportAction = (data) => {
    return defaultRestClient.postWithBody(INCOMEREPORT, data);
}

export const sellReportAction = (data) => {
    return defaultRestClient.postWithBody(SELLREPORT, data);
}

export const membershipReportAction = (data) => {
    return defaultRestClient.postWithBody(MEMBERSHIPREPORT, data);
}

export const loginAction = (data) => {
    return defaultRestClient.postWithBody(LOGIN, data); 
}

export const memberShipListAction = (data) => {
    return defaultRestClient.postWithBody(MEMBERSHIPLIST, data);
}

export const memberNameAction = (data) => {
    return defaultRestClient.postWithBody(MEMBER, data);
}

export const memberClassAction = (data) => {
    return defaultRestClient.postWithBody(MEMBERCLASS, data);
}

export const groupListAction = (data) => {
    return defaultRestClient.postWithBody(GROUPLIST, data);
}

export const reservationListAction = (data) => {
    return defaultRestClient.postWithBody(RESERVATIONLIST, data);
}

export const staffMemberListAction = (data) => {
    return defaultRestClient.postWithBody(STAFFLIST, data);
}

export const signupAction = (data) => {
    return defaultRestClient.postWithBodyToken(SIGNUP, data);
}

export const staffAction = () => {
    return defaultRestClient.postWithBody(STAFF_MEMBER);
}

export const membershipAction = () => {
    return defaultRestClient.postWithBody(MEMBERSHIP);
}

export const classAction = (data) => {
    return defaultRestClient.postWithBody(MEMBERSHIPCLASSLIST, data);
}

export const membershipDaysAction = (data) => {
    return defaultRestClient.postWithBody(MEMBERSHIPDAYS, data);
}

export const viewAssignWorkoutAction = (data) => {
    return defaultRestClient.postWithBody(VIEWASSIGNWORKOUT, data);
}

export const activityListAction = (data) => {
    return defaultRestClient.postWithBody(ACTIVITYLIST, data);
}

export const listWorkoutLogAction = (data) => {
    return defaultRestClient.postWithBody(LISTWORKOUTLOG, data);
}

export const viewWorkoutLogAction = (data) => {
    return defaultRestClient.postWithBody(VIEWWORKOUTLOG, data);
}

export const addWorkoutLogAction = (data) => {
    return defaultRestClient.postWithBody(ADDWORKOUTLOG, data);
}

export const addmeasurementAction = (data) => {
    return defaultRestClient.postWithBody(ADDMEASUREMENT, data);
}

export const listmeasurementAction = (data) => {
    return defaultRestClient.postWithBody(LISTMEASUREMENT, data);
}

export const viewmeasurementAction = (data) => {
    return defaultRestClient.postWithBody(VIEWMEASUREMENT, data);
}

export const classListAction = (data) => {
    return defaultRestClient.postWithBody(CLASSLIST, data);
}

export const classSchedultListAction = (data) => {
    return defaultRestClient.postWithBody(CLASSSCHEDULTLIST, data);
}

export const singleMemberAction = (data) => {
    return defaultRestClient.postWithBody(SINGLEMEMBER, data);
}

export const viewMemberAttendanceListAction = (data) => {
    return defaultRestClient.postWithBody(VIEWMEMBERATTENDANCELIST, data);
}

export const singleMembershipTypeAction = (data) => {
    return defaultRestClient.postWithBody(SINGLEMEMBERSHIPTYPE, data);
}

export const dashboardReportAction = (data) => {
    return defaultRestClient.postWithBody(DASHBOARDREPORT, data);
}

export const dashboardReportWaistAction = (data) => {
    return defaultRestClient.postWithBody(DASHBOARDREPORTWAIST, data);
}

export const dashboardReportThighAction = (data) => {
    return defaultRestClient.postWithBody(DASHBOARDREPORTTHIGH, data);
}

export const dashboardReportArmsAction = (data) => {
    return defaultRestClient.postWithBody(DASHBOARDREPORTARMS, data);
}

export const dashboardReportHeightAction = (data) => {
    return defaultRestClient.postWithBody(DASHBOARDREPORTHEIGHT, data);
}

export const dashboardReportChestAction = (data) => {
    return defaultRestClient.postWithBody(DASHBOARDREPORTCHEST, data);
}

export const dashboardReportFatAction = (data) => {
    return defaultRestClient.postWithBody(DASHBOARDREPORTFAT, data);
}

export const noticeListAction = (data) => {
    return defaultRestClient.postWithBody(NOTICELIST, data);
}

export const inboxmessagelistAction = (data) => {
    return defaultRestClient.postWithBody(INBOXMESSAGELIST, data);
}

export const sentmessagelistAction = (data) => {
    return defaultRestClient.postWithBody(SENTMESSAGELIST, data);
}

export const nutritionlistAction = (data) => {
    return defaultRestClient.postWithBody(NUTRITIONPLAN, data);
}

export const historylistAction = (data) => {
    return defaultRestClient.postWithBody(HISTORYLIST, data);
}

export const homeAction = (data) => {
    return defaultRestClient.postWithBody(HOME_GYM, data);
}

export const productlistAction = (data) => {
    return defaultRestClient.postWithBody(PRODUCTLIST, data);
}

export const productListAction = (data) => {
    return defaultRestClient.postWithBody(PRODUCTGROUPLIST, data);
}

export const membershipdetailsAction = (data) => {
    return defaultRestClient.postWithBody(MEMBERSHIPDETAILS, data);
}

export const subscriptionHistoryAction = (data) => {
    return defaultRestClient.postWithBody(SUBSCRIPTIONHISTORYLIST, data);
}

export const updateMemberprofileAction = (data) => {
    return defaultRestClient.postWithBody(UPDATEMEMBERPROFILE, data);
}

export const paymentListAction = (data) => {
    return defaultRestClient.postWithBodyToken(PAYMENTLIST, data);
}

export const viewInvoiceAction = (data) => {
    return defaultRestClient.postWithBodyToken(VIEWINVOICE, data);
}

export const getallMemberAndStaffAction = (data) => {
    return defaultRestClient.postWithBodyToken(GETALLMEMBERANDSTAFF, data);
}

export const composeMessageAction = (data) => {
    return defaultRestClient.postWithBodyToken(COMPOSEMESSAGE, data);
}

export const viewMessageAction = (data) => {
    return defaultRestClient.postWithBodyToken(VIEWMESSAGE, data);
}

export const workoutdateArrayAction = (data) => {
    return defaultRestClient.postWithBodyToken(WORKDATEARRAY, data);
}

export const replymessageListAction = (data) => {
    return defaultRestClient.postWithBodyToken(REPLYMESSAGELIST, data);
}

export const sendreplyMessageAction = (data) => {
    return defaultRestClient.postWithBodyToken(SENDREPLYMESSAGE, data);
}

export const sendInvoiceMailAction = (data) => {
    return defaultRestClient.postWithBodyToken(SENDINVOICEMAIL, data);
}

export const takeAttendanceAction = (data) => {
    return defaultRestClient.postWithBody(TAKEATTENDANCE, data);
}

export const classBookingListAction = (data) => {
    return defaultRestClient.postWithBody(CLASSBOOKINGLIST, data);
}

export const cancelBookingClassAction = (data) => {
    return defaultRestClient.postWithBody(CANCELCLASSBOOKING, data);
}

export const classScheduleDataAction = (data) => {
    return defaultRestClient.postWithBody(CLASSBOOKING, data);
}

export const classBooingAction = (data) => {
    return defaultRestClient.postWithBody(BOOKINGCLASS, data);
}

export const userLogoutAction = (data) => {
    return defaultRestClient.postWithBody(USERLOGOUT, data);
}