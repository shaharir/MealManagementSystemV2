import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";
import Dashboard from "../Page/Private/Dashboard/Dashboard";
import Login from "../Page/Public/Login";
import Register from "../Page/Public/Registration";
import Border from "../Page/Private/Border/Border";
import Bazar from "../Page/Private/Bazar/Bazar";
import Deposit from "../Page/Private/Deposit/Deposit";
import Meal from "../Page/Private/Meal/Meal";
import Summary from "../Page/Private/Summary/Summary";
import Feedback from "./../Page/Private/Feedback/Feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/border",
        element: <Border />,
      },
      {
        path: "/bazar",
        element: <Bazar />,
      },
      {
        path: "/meal",
        element: <Meal />,
      },
      {
        path: "/deposit",
        element: <Deposit />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Register />,
  },
]);
export default router;
