

import config from '../Apis/config';
// import queryString from 'query-string';
import axios from 'axios';
import { Redirect } from 'react-router';
import { authHeader,authNoneHeader} from './authHeader';
import Auth from '../../Auth/Auth';
export const APIService = {
	login,
	registerUser,
	logout,
	authUser,
	resetPassword,
	changePassword,
	updatePassword,
	registerSocial,
	categories,
	services,
	profileStepOne,
	profileStepTwo,
	profileStepThree,
	ApplyForPractitioner,
	ApplyForPractitionerUploadDocs,
	UserProfile,
	ApplyForPractitionerDeleteDocs,
	profileImagesUpload,
	dashboardServicesList,
	dashboardAddServices,
	dashboardPackagesList,
	dashboardUpdateServices,
	dashboardEditServicesDetails,
	dashboardAddPackages,
	dashboardRemovePackages,
	createEvent,
	fetchEventAllCurrentUser,
	profileUpdate,
	globalLanguages,
	chooseInterestOneUpdate,
	chooseInterestTwoUpdate,
	eventDetailsById,
	getAllPractitioner,
	favoritePractitioner,
	attachedCard,
	detachCard,
	stripCardList,
	servicePackageList,
	practitionerServiceList,
	eventBooking,
	bookings,
	myBookings,
	userPackages,
	favoriteUsers,
	settingData,
	userSetting,
	addBlockTime,
	unblockTime,
	addBankAccount,
	getBankAccounts,
	verifyBankAccount,
	deleteBankAccount,
	setDefaultBankAccount,
	getUserPayments,
	submitReview,
	receivedRating,
	nonRatedEvent,
	ratedEvent,
	replyRating,
	updateProfilePicture,
	delUserImage,
	notificationsAll,
	ReadNotifications,
	saveMessage,
	messageList,
	allConversation,
	stripeConnect,
	stripeApproved,
	allServiceForUser,
	userRecordings,
	bookedEventUsers,
	userProfileReviews,
	displayReviewRemove,
	checkUser,
	displayReview,
	userPackages,
	emailVerify,
	adminPracPayment,
	userPracPayment,
	homeClassEvents,
	getPaymentDetailForInvoice,


};
const baseUrl = config.baseurl;
// config.url === 'baseurl'
// ? config.baseurl
// : config.url === 'localurl'
// ? config.localurl
// : config.url === 'ngrokurl'
// ? config.ngrokurl
// : config.url === 'sandbox'
// ? config.sandbox
// : window.location.hostname;

function login(request) {
	return  axios.post(baseUrl + config.endpoints.signIn, request);
}
function registerUser(request){
	return  axios.post(baseUrl + config.endpoints.userRegister, request);
}
function registerSocial(request){
	return  axios.post(baseUrl + config.endpoints.registerSocial, request);
}
function authUser(request){
	return  axios.get(baseUrl + config.endpoints.userInfo,{headers:authHeader()});
}
function resetPassword(request){
	return  axios.post(baseUrl + config.endpoints.resetPassword,request,{headers:authHeader()});
}
function changePassword(request){
	return  axios.post(baseUrl + config.endpoints.changePassword,request,{headers:authHeader()});
}
function updatePassword(request){
	return  axios.post(baseUrl + config.endpoints.updatePassword,request,{headers:authHeader()});
}
function globalLanguages(request){
	return  axios.get(baseUrl + config.endpoints.languages,{headers:authHeader()});
}

function categories(request){
	return  axios.get(baseUrl + config.endpoints.categories,{headers:authHeader()});
}
function services(request){
	return  axios.post(baseUrl + config.endpoints.services,request,{headers:authHeader()});
}
function allServiceForUser(request){
	return  axios.post(baseUrl + config.endpoints.allServiceForUser,request,{headers:authHeader()});
}

function ApplyForPractitioner(request){
	return  axios.post(baseUrl + config.endpoints.ApplyForPractitioner,request,{headers:authHeader()});
}
function ApplyForPractitionerUploadDocs(request,setProgress){
	return  axios.post(baseUrl + config.endpoints.ApplyForPractitionerUploadDocs,request,{headers:authHeader(),onUploadProgress: data => {
        setProgress(Math.round((100 * data.loaded) / data.total))
      },});
}
function ApplyForPractitionerDeleteDocs(request){
	return  axios.post(baseUrl + config.endpoints.ApplyForPractitionerDeleteDocs,request,{headers:authHeader()});
}
function UserProfile(request){
	return  axios.post(baseUrl + config.endpoints.userProfile,request,{headers:authHeader()});
}
// complete Profile steps
function profileStepOne(request){
	return  axios.post(baseUrl + config.endpoints.profileStepOne,request,{headers:authHeader()});
}
function profileStepTwo(request){
	return  axios.post(baseUrl + config.endpoints.profileStepTwo,request,{headers:authHeader()});
}
function profileStepThree(request){
	return  axios.post(baseUrl + config.endpoints.profileStepThree,request,{headers:authHeader()});
}
function profileImagesUpload(request){
	return  axios.post(baseUrl + config.endpoints.profileImagesUpload,request,{headers:authHeader()});
}
function delUserImage(request){
	return  axios.post(baseUrl + config.endpoints.delUserImage,request,{headers:authHeader()});
}
function profileUpdate(request){
	return  axios.post(baseUrl + config.endpoints.updateProfile,request,{headers:authHeader()});
} 
function userRecordings(request){
	return  axios.post(baseUrl + config.endpoints.userRecordings,request,{headers:authHeader()});
} 
function bookedEventUsers(request){
	return  axios.post(baseUrl + config.endpoints.bookedEventUsers,request,{headers:authHeader()});
}
function userProfileReviews(request){
	return  axios.post(baseUrl + config.endpoints.userProfileReviews,request,{headers:authHeader()});
}
function displayReviewRemove(request){
	return  axios.post(baseUrl + config.endpoints.displayReviewRemove,request,{headers:authHeader()});
} 
function displayReview(request){
	return  axios.post(baseUrl + config.endpoints.displayReview,request,{headers:authHeader()});
} 
function checkUser(request){
	return  axios.post(baseUrl + config.endpoints.checkUser,request,{headers:authHeader()});
}
function emailVerify(request){
	return  axios.post(baseUrl + config.endpoints.emailVerify,request,{headers:authHeader()});
}


// 

// Dashboard data Apis
function dashboardServicesList(request){
	return  axios.post(baseUrl + config.endpoints.serviceList,request,{headers:authHeader()});
}
function dashboardAddServices(request){
	return  axios.post(baseUrl + config.endpoints.dashboardAddServices,request,{headers:authHeader()});
}
function dashboardEditServicesDetails(request){
	return  axios.post(baseUrl + config.endpoints.editPractitionerService,request,{headers:authHeader()});
}
function dashboardUpdateServices(request){
	return  axios.post(baseUrl + config.endpoints.updatePractitionerService,request,{headers:authHeader()});
}
function dashboardPackagesList(request){
	return  axios.post(baseUrl + config.endpoints.packagesList,request,{headers:authHeader()});
}
function dashboardAddPackages(request){
	return  axios.post(baseUrl + config.endpoints.addPackages,request,{headers:authHeader()});
}
function dashboardRemovePackages(request){
	return  axios.post(baseUrl + config.endpoints.removePackages,request,{headers:authHeader()});
}
function createEvent(request){
	return  axios.post(baseUrl + config.endpoints.createEvent,request,{headers:authHeader()});
}  
function fetchEventAllCurrentUser(request){
	return  axios.post(baseUrl + config.endpoints.eventsAll,request,{headers:authHeader()});
} 
function chooseInterestOneUpdate(request){
	return  axios.post(baseUrl + config.endpoints.interestStep1,request,{headers:authHeader()});
} 
function chooseInterestTwoUpdate(request){
	return  axios.post(baseUrl + config.endpoints.interestStep2,request,{headers:authHeader()});
}  
function eventDetailsById(request){
	return  axios.post(baseUrl + config.endpoints.eventDetail,request,{headers:authHeader()});
} 
function getAllPractitioner(request){
		return  axios.post(baseUrl + config.endpoints.getAllPractitioner,request,{headers:authHeader()});
}
function favoritePractitioner(request){
	return  axios.post(baseUrl + config.endpoints.favoritePractitioner,request,{headers:authHeader()});
}  
function attachedCard(request) {
	return  axios.post(baseUrl + config.endpoints.attachedCard,request,{headers:authHeader()});
}
function detachCard(request) {
	return  axios.post(baseUrl + config.endpoints.detachCard,request,{headers:authHeader()});
}
function stripCardList(request) {
	return  axios.post(baseUrl + config.endpoints.stripCardList,request,{headers:authHeader()});
}
function servicePackageList(request) {
	return  axios.post(baseUrl + config.endpoints.servicePackageList,request,{headers:authHeader()});
}
function practitionerServiceList(request){
	return axios.post(baseUrl + config.endpoints.practitionerServiceList,request,{headers:authHeader()})
}
function eventBooking(request){
	return axios.post(baseUrl + config.endpoints.eventBooking,request,{headers:authHeader()})
}
function bookings(request){
	return axios.post(baseUrl + config.endpoints.bookings,request,{headers:authHeader()})
}
function myBookings(request){
	return axios.post(baseUrl + config.endpoints.myBookings,request,{headers:authHeader()})
}
function userPackages(request){
	return axios.post(baseUrl + config.endpoints.userPackages,request,{headers:authHeader()})
}
function favoriteUsers(request){
	return axios.post(baseUrl + config.endpoints.favoriteUsers,request,{headers:authHeader()})
}
function settingData(request){
	return axios.post(baseUrl + config.endpoints.settingData,request,{headers:authHeader()})
}
function userSetting(request){
	return axios.post(baseUrl + config.endpoints.userSetting,request,{headers:authHeader()})
}
function addBlockTime(request){
	return axios.post(baseUrl + config.endpoints.addBlockTime,request,{headers:authHeader()})
}
function unblockTime(request){
	return axios.post(baseUrl + config.endpoints.unblockTime,request,{headers:authHeader()})
}
//  add remove & verified user bank account for payouts
function addBankAccount(request){
	return axios.post(baseUrl + config.endpoints.addBankAccount,request,{headers:authHeader()})
}
function getBankAccounts(request){
	return axios.post(baseUrl + config.endpoints.getBankAccounts,request,{headers:authHeader()})
}
function verifyBankAccount(request){
	return axios.post(baseUrl + config.endpoints.verifyBankAccount,request,{headers:authHeader()})
}
function deleteBankAccount(request){
	return axios.post(baseUrl + config.endpoints.deleteBankAccount,request,{headers:authHeader()})
}
function setDefaultBankAccount(request){
	return axios.post(baseUrl + config.endpoints.setDefaultBankAccount,request,{headers:authHeader()})
}
function getUserPayments(request){
	return axios.post(baseUrl + config.endpoints.getUserPayments,request,{headers:authHeader()})
}
function adminPracPayment(request) {
	return  axios.post(baseUrl + config.endpoints.adminPracPayment, request,{headers:authHeader()});
}
function userPracPayment(request) {
	return  axios.post(baseUrl + config.endpoints.userPracPayment, request,{headers:authHeader()});
}
function getPaymentDetailForInvoice(request) {
	return  axios.post(baseUrl + config.endpoints.getPaymentDetailForInvoice, request,{headers:authHeader()});
}

function stripeConnect(request){
	return axios.post(baseUrl + config.endpoints.stripeConnect,request,{headers:authHeader()})
}
function stripeApproved(request){
	return axios.post(baseUrl + config.endpoints.stripeApproved,request,{headers:authHeader()})
}
function homeClassEvents(request){
	return axios.post(baseUrl + config.endpoints.homeClassEvents,request,{headers:authHeader()})
}
//  end
// event Reviews in dashboard
function submitReview(request){
	return axios.post(baseUrl + config.endpoints.submitReview,request,{headers:authHeader()})	
}
function receivedRating(request){
	return axios.post(baseUrl + config.endpoints.receivedRating,request,{headers:authHeader()})	
}
function nonRatedEvent(request){
	return axios.post(baseUrl + config.endpoints.nonRatedEvent,request,{headers:authHeader()})
}
function ratedEvent(request){
	return axios.post(baseUrl + config.endpoints.ratedEvent,request,{headers:authHeader()})
}
function replyRating(request){
	return axios.post(baseUrl + config.endpoints.replyRating,request,{headers:authHeader()})
}
// end review
// Profile picture upload
function updateProfilePicture(request){
	return axios.post(baseUrl + config.endpoints.updateProfilePicture,request,{headers:authHeader()})
}
// End Profile picture upload 
// 
// notificationsAll
function notificationsAll(request){
	return axios.post(baseUrl + config.endpoints.notificationsAll,request,{headers:authHeader()})
}
function ReadNotifications(request){
	return axios.post(baseUrl + config.endpoints.readNotification,request,{headers:authHeader()})
}
// end notificationsAll
// Chat Message
function saveMessage(request){
	return axios.post(baseUrl + config.endpoints.saveMessage,request,{headers:authHeader()})
}
function messageList(request){
	return axios.post(baseUrl + config.endpoints.messageList,request,{headers:authHeader()})
}
function allConversation(request){
	return axios.post(baseUrl + config.endpoints.allConversation,request,{headers:authHeader()})
}

// End Chat Message
function logout() {
	localStorage.clear();
	sessionStorage.clear();
	return <Redirect to="/login" />
}
