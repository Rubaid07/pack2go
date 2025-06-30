import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AllPackages from "../pages/AllPackages";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MyBookings from "../pages/MyBookings";
import AddPackage from "../pages/AddPackage";
import PrivateRoute from "../layouts/PrivateRoute";
import PackageDetails from "../pages/PackageDetails";
import Booking from "../pages/Booking";
import ManageMyPackages from "../pages/ManageMyPackages";
import EditPackage from "../pages/EditPackage";
import NotFound from "../pages/NotFound";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";
import SafetyGuidelines from "../components/SafetyGuidelines";
// import GuideBookings from "../pages/GuideBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound></NotFound>,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/packages',
        Component: AllPackages
      },
      {
        path: '/about',
        Component: AboutUs
      },
      {
        path: '/privacy',
        Component: PrivacyPolicy
      },
      {
        path: '/terms',
        Component: TermsAndConditions
      },
      {
        path: '/guidelines',
        Component: SafetyGuidelines
      },
      {
        path: '/my-booking',
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
      },
      // {
      //   path: '/guide-bookings',
      //   element: <PrivateRoute><GuideBookings></GuideBookings></PrivateRoute>
      // },
      {
        path: '/add-package',
        element: <PrivateRoute><AddPackage></AddPackage></PrivateRoute>
      },
      {
        path: '/manage-packages',
        element: <PrivateRoute><ManageMyPackages></ManageMyPackages></PrivateRoute>
      },
      {
        path: '/edit-package/:id',
        element: <PrivateRoute><EditPackage></EditPackage></PrivateRoute>
      },
      {
        path: '/package/:id',
        element: <PrivateRoute><PackageDetails></PackageDetails></PrivateRoute>
      },
      {
        path: '/booking/:id',
        element: <PrivateRoute><Booking></Booking></PrivateRoute>
      },
      {
        path: '/signin',
        Component: SignIn
      },
      {
        path: '/signup',
        Component: SignUp
      },
    ]
  },
]);