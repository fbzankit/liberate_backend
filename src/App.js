import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './Routes/Protected/ProtectedRoutes';
import { PublicRoutes } from './Routes/PublicRoutes/PublicRoutes';
import Routes from './Routes/Routes';
import './assets.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Welcome from './Pages/Welcome';
import AboutUs from './Welcome/AboutUs';
import ContactUs from './Welcome/ContactUs';
import Faq from './Welcome/Faq';
import HowToWork from './Welcome/HowToWork';
import PrivacyPolicy from './Welcome/PrivacyPolicy';
import TermAndCondition from './Welcome/TermAndCondition';
import Disclaimer from './Welcome/Disclaimer';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import LogOut from './Pages/LogOut';
import ForgetPassword from './Pages/ForgetPassword';
import SetPassword from './Pages/SetPassword';
import Error from './Common/Error';
import Home from './Pages/Home/Home';
import Services from './Pages/Services/Services';
import CreateEvent from './Pages/CreateEvents/CreateEvent';
import Profile from './Pages/UserProfile/Profile';
import CompleteProfile from './Pages/CompleteProfileSteps/CompleteProfile';
import Referrals from './Pages/Referrals/Referrals';
import Favorite from './Pages/Favorite/Favorite';
import Credits from './Pages/Credits/Credits';
import Discount from './Pages/Discount/Discount';
import Messages from './Pages/Messages/Messages';
import Bookings from './Pages/Bookings/Bookings';
import Media from './Pages/Media/Media';
import Reviews from './Pages/Reviews/Reviews';
import Interests from './Pages/Interests/Interests';
import Settings from './Pages/Settings/Settings';
import BillingInfo from './Pages/BillingInfo/BillingInfo';
import ReturnReAuth from './Pages/BillingInfo/Components/ReturnReAuth';
import Payments from './Pages/Payments/Payments';
import Notifications from './Pages/Notifications/Notifications';
import Packages from './Pages/Packages/Packages';
import MyAccount from './Pages/MyAccount/MyAccount';
import ApplyForPractitioner from './Pages/ApplyForPractitioner/ApplyForPractitioner';
import EmailVerification from './Pages/EmailVerification';
import Invoice from './Pages/Payments/Invoice/Invoice';


document.title = "Liberate";
const PublicRoutesArray = [
	{
		path: '/signup',
		exact: true,
		component: Signup
	},
	{
		path: '/login',
		exact: true,
		component: Login
	},
	{
		path: '/logout',
		exact: true,
		component: LogOut
	},
	{
		path: '/forget-password',
		exact: true,
		component: ForgetPassword
	},
	{
		path: '/emailVerification',
		exact: true,
		component: EmailVerification
	},
	{
		path: '/change-password',
		exact: true,
		component: SetPassword
	},
	{
		path: '/',
		exact: true,
		component: Welcome
	},
	{
		path: '/about-us',
		exact: true,
		component: AboutUs
	},
	{
		path: '/contact-us',
		exact: true,
		component: ContactUs
	},
	{
		path: '/faq',
		exact: true,
		component: Faq
	},
	{
		path: '/how-to-work',
		exact: true,
		component: HowToWork
	},
	{
		path: '/privacy-policy',
		exact: true,
		component: PrivacyPolicy
	},
	{
		path: '/term-and-condition',
		exact: true,
		component: TermAndCondition
	},
	{
		path: '/disclaimer',
		exact: true,
		component: Disclaimer
	},
	{
		exact: true,
		component: Error
	}]
const App = () => {
	return (
		<>
			<Router>
				<Switch>
					{/* {Routes.map((route, index) => {
						return (
							<ProtectedRoute
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.component}
							/>

						);
					})} */}


					<ProtectedRoute
						path='/home'
						exact={true}
						component={Home
						} />
					<ProtectedRoute
						path='/create-event'
						exact={true}
						component={CreateEvent
						} />
					<ProtectedRoute
						path='/apply-for-practitioner'
						exact={true}
						component={ApplyForPractitioner
						} />
					<ProtectedRoute
						path='/account'
						exact={true}
						component={MyAccount
						} />
					<ProtectedRoute
						path='/packages'
						exact={true}
						component={Packages}
					/>
					<ProtectedRoute
						path='/services'
						exact={true}
						component={Services
						} />
					<ProtectedRoute
						path='/notifications'
						exact={true}
						component={Notifications
						} />
					<ProtectedRoute
						path='/payments'
						exact={true}
						component={Payments
						} />
					<ProtectedRoute
						path='/payments/invoice/:id'
						exact={true}
						component={Invoice
						} />

					<ProtectedRoute
						path='/return'
						exact={true}
						component={ReturnReAuth
						} />
					<ProtectedRoute
						path='/reauth'
						exact={true}
						component={ReturnReAuth
						} />
					<ProtectedRoute
						path='/billing-info'
						exact={true}
						component={BillingInfo
						} />
					<ProtectedRoute
						path='/settings'
						exact={true}
						component={Settings
						} />
					<ProtectedRoute
						path='/interests'
						exact={true}
						component={Interests
						} />
					<ProtectedRoute
						path='/reviews'
						exact={true}
						component={Reviews
						} />
					<ProtectedRoute
						path='/media'
						exact={true}
						component={Media
						} />
					<ProtectedRoute
						path='/bookings'
						exact={true}
						component={Bookings
						} />
					<ProtectedRoute
						path='/messages/:id'
						exact={true}
						component={Messages
						} />
					<ProtectedRoute
						path='/messages'
						exact={true}
						component={Messages
						} />
					<ProtectedRoute
						path='/discount'
						exact={true}
						component={Discount}
					/>
					<ProtectedRoute path='/credits' exact={true} component={Credits} />
					<ProtectedRoute path='/favorite' exact={true} component={Favorite} />
					<ProtectedRoute path='/referrals' exact={true} component={Referrals} />
					<ProtectedRoute path='/complete-profile' exact={true} component={CompleteProfile} />
					<ProtectedRoute path='/profile/:id' exact={true} component={Profile} />

					{PublicRoutesArray.map((res, i) => <PublicRoutes key={i} {...res} />)}
					{/* <Redirect from="*" to="/" /> */}
				</Switch>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
