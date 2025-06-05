import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AllPackages from "../pages/AllPackages";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <p>error</p>,
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