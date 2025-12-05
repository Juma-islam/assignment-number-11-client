import { createBrowserRouter } from "react-router";
import Home from '../Pages/Home'
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
   Component : MainLayouts,
   children : [
    {
        index: true,
        Component: Home
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/register',
        Component: Register
    },
   
   ]
  },
]);


export default router;

