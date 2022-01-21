import * as React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import BottomTabScreen from "./navigation/BottomTab";
import LoadingScreen from "./components/LoadingScreen";
import NotificationScreen from "./screens/Home/NotificationScreen";
import SearchScreen from "./screens/Home/SearchScreen";
import ViewAllScreen from "./screens/Home/ViewAllScreen";
import SpecialistScreen from "./screens/Home/SpecialistScreen";
import TimeSlotScreen from "./screens/Home/TimeSlotsScreen";
import ConsultaionScreen from "./screens/Home/ConsultationDetailScreen";
import PaymentMethodScreen from "./screens/Home/PaymentMethodScreen";
import DoctorProfileScreen from "./screens/Home/DoctorProfileScreen";
import ReviewScreen from "./screens/Home/ReviewScreen";
import LabTestAndHealthCheckUpScreen from "./screens/Home/LabTestAndHealthCheckUpScreen";
import MessageScreen from "./screens/Chat/MessageScreen";
import EditProfileScreen from "./screens/Profile/EditProfileScreen";
import PatientDirectoryScreen from "./screens/Profile/PatientDirectoryScreen";
import AboutUsScreen from "./screens/Profile/AboutUsScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterScreen from "./screens/RegisterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import SplashScreen from "./screens/SplashScreen";
import UserDataEdit from "./screens/Profile/UserDataEdit";
import ProfileEditScreen from "./screens/Profile/profileAddScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import ShowMoreScreen from "./screens/Home/ShowMoreScreen"
import UsersProfileScreen from './screens/Profile/userProfileScreen'
import QrScreen from './screens/Profile/QrScreen'
import { database } from "./firebase";
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_test_51K84PtSGPMJ99FNgX57aaoX5J5UACm4MVzTxzs46ldk9LP9sbnEX6prObXtDcPf9baInJKUMj5uYBEUwERbwo82b00oolvcUS9',
})

const navigator = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen: LoadingScreen,
      mainFlow: createStackNavigator({
        Welcome: {
          screen: WelcomeScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        Register: RegisterScreen,
        Verification: VerificationScreen,
        Splash: SplashScreen,
        BottomTabScreen: {
          screen: BottomTabScreen,
          navigationOptions: {
            headerShown: false,
          },
        },
        Notification: NotificationScreen,
        Search: SearchScreen,
        ViewAll: ViewAllScreen,
        Specialist: SpecialistScreen,
        TimeSlots: TimeSlotScreen,
        Consultation: ConsultaionScreen,
        PaymentMethod: PaymentMethodScreen,
        DoctorProfile: DoctorProfileScreen,
        Review: ReviewScreen,
        LabTestAndCheckUp: LabTestAndHealthCheckUpScreen,
        Message: MessageScreen,
        EditProfile: EditProfileScreen,
        PatientDirectory: PatientDirectoryScreen,
        AboutUs: AboutUsScreen,
        EditProfileNow: ProfileEditScreen,
        UserEditNow : UserDataEdit,
        Home : HomeScreen,
        ShowMore : ShowMoreScreen,
        UserProfile : UsersProfileScreen,
        DefaultProfile : QrScreen,
      }),
    },
    {
      initialRouteName: "LoadingScreen",
      defaultNavigationOptions: {
        title: "Aidn",
      },
    }
  )
);

const App = navigator;

export default () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};
