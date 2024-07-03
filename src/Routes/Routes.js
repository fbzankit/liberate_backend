import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Error from "../Common/Error";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import SetPassword from "../Pages/SetPassword";
import Profile from "../Pages/UserProfile/Profile";
import LogOut from "../Pages/LogOut";
import CompleteProfile from "../Pages/CompleteProfileSteps/CompleteProfile";
import Welcome from "../Pages/Welcome";
import ApplyForPractitioner from "../Pages/ApplyForPractitioner/ApplyForPractitioner";
import MyAccount from "../Pages/MyAccount/MyAccount";
import Services from "../Pages/Services/Services";
import Packages from "../Pages/Packages/Packages";
import CreateEvent from "../Pages/CreateEvents/CreateEvent";
import Notifications from "../Pages/Notifications/Notifications";
import Payments from "../Pages/Payments/Payments";
import BillingInfo from "../Pages/BillingInfo/BillingInfo";
import Referrals from "../Pages/Referrals/Referrals"
import Settings from "../Pages/Settings/Settings"
import Interests from "../Pages/Interests/Interests"
import Reviews from "../Pages/Reviews/Reviews"
import Media from "../Pages/Media/Media"
import Bookings from "../Pages/Bookings/Bookings"
import Messages from "../Pages/Messages/Messages"
import Discount from "../Pages/Discount/Discount"
import Credits from "../Pages/Credits/Credits"
import Favorite from "../Pages/Favorite/Favorite"
import AboutUs from "../Welcome/AboutUs";
import ContactUs from "../Welcome/ContactUs";
import Faq from "../Welcome/Faq";
import HowToWork from "../Welcome/HowToWork";
import Disclaimer from "../Welcome/Disclaimer";
import TermAndCondition from "../Welcome/TermAndCondition";
import PrivacyPolicy from "../Welcome/PrivacyPolicy";
import Test from "../Pages/UserProfile/Components/CropperModal/test";
import ReturnReAuth from "../Pages/BillingInfo/Components/ReturnReAuth";
import Invoice from "../Pages/Payments/Invoice/Invoice";
export default [
	{
		path:'/test',
		exact: true,
		private:false,
		component:Test
	},
	{
		path:'/',
		exact: true,
		private:false,
		component:Welcome
	},
	{
		path:'/about-us',
		exact: true,
		private:false,
		component:AboutUs
	},
	{
		path:'/contact-us',
		exact: true,
		private:false,
		component:ContactUs
	},
	{
		path:'/faq',
		exact: true,
		private:false,
		component:Faq
	},
	{
		path:'/how-to-work',
		exact: true,
		private:false,
		component:HowToWork
	},
	{
		path:'/privacy-policy',
		exact: true,
		private:false,
		component:PrivacyPolicy
	},
	{
		path:'/term-and-condition',
		exact: true,
		private:false,
		component:TermAndCondition
	},
	{
		path:'/disclaimer',
		exact: true,
		private:false,
		component:Disclaimer
	},
	{
		path:'/home',
		exact: true,
		private:true,
		component:Home
	},
	{
		path:'/create-event',
		exact: true,
		private:true,
		component:CreateEvent
	},
	{
		path:'/apply-for-practitioner',
		exact: true,
		private:true,
		component:ApplyForPractitioner
	},
	{
		path:'/account',
		exact: true,
		private:true,
		component:MyAccount
	},
	{
		path:'/packages',
		exact: true,
		private:true,
		component:Packages
	},
	{
		path:'/services',
		exact: true,
		private:true,
		component:Services
	},
	{
		path:'/notifications',
		exact: true,
		private:true,
		component:Notifications
	},
	{
		path:'/payments',
		exact: true,
		private:true,
		component:Payments
	},
	{
		path:'/return',
		exact: true,
		private:true,
		component:ReturnReAuth
	},
	{
		path:'/reauth',
		exact: true,
		private:true,
		component:ReturnReAuth
	},
	{
		path:'/billing-info',
		exact: true,
		private:true,
		component:BillingInfo
	},
	{
		path:'/settings',
		exact: true,
		private:true,
		component:Settings
	},
	{
		path:'/interests',
		exact: true,
		private:true,
		component:Interests
	},
	{
		path:'/reviews',
		exact: true,
		private:true,
		component:Reviews
	},
	{
		path:'/media',
		exact: true,
		private:true,
		component:Media
	},
	{
		path:'/bookings',
		exact: true,
		private:true,
		component:Bookings
	},
	{
		path:'/messages/:id',	
		exact: true,
		private:true,
		component:Messages
	},
	{
		path:'/messages',	
		exact: true,
		private:true,
		component:Messages
	},
	{
		path:'/discount',
		exact: true,
		private:true,
		component:Discount
	},
	{
		path:'/credits',
		exact: true,
		private:true,
		component:Credits
	},
	{
		path:'/favorite',
		exact: true,
		private:true,
		component:Favorite
	},
	{
		path:'/referrals',
		exact: true,
		private:true,
		component:Referrals
	},
	{
		path:'/signup',
		exact: true,
		private:false,
		component:Signup
	},
	{
		path:'/login',
		exact: true,
		private:false,
		component:Login
	},
	{
		path:'/logout',
		exact: true,
		private:false,
		component:LogOut
	},
	{
		path:'/forget-password',
		exact: true,
		private:false,
		component:ForgetPassword
	},
	{
		path:'/change-password',
		exact: true,
		private:false,
		component:SetPassword
	},
	{
		path:'/complete-profile',
		exact: true,
		private:true,
		component:CompleteProfile
	},
	{
		path:'/profile/:id',
		exact: true,
		private:true,
		component:Profile
	},	
	{
		exact: true,
		component:Error
	}
	
];