import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage";
import AllProduct from "../Pages/AllProduct/AllProduct";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRouter from "./PrivateRouter";
import ProductsOrder from "../Pages/ProductsOrder/ProductsOrder";
import Payment from "../Pages/Payment/Payment";
import Dashboard from "../Pages/PaymentCancel/Dashboard/Dashboard";
import DashboardMain from "../Pages/DashboardMain/DashboardMain";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";
import MyOrders from "../Pages/MyOrders/MyOrders";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AdminRouter from "./AdminRouter";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import AllAdminOrders from "../Pages/AllAdminOrders/AllAdminOrders";
import AdminAllProducts from "../Pages/AdminAllProducts/AdminAllProducts";
import OrderDetails from "../Pages/OrderDetails/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/all-products",
        Component: AllProduct,
      },
      {
        path: "product-details/:id",
        element: <PrivateRouter><ProductDetails></ProductDetails></PrivateRouter>,
      },
      {
                path: 'product-details/:id/order-form',
                element: <ProductsOrder></ProductsOrder>
            },
             {
                path: 'product-details/:id/order-form/payment',
                element: <Payment></Payment>
            }
    ],
  },


  {
    path: 'dashboard',
    element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
    children: [
      {
        index: true,
        Component: DashboardMain
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancel
      },
       {
                path: 'my-orders',
                element: <MyOrders></MyOrders>
            },
       {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
              path: 'all-products',
              element: <AdminRouter><AdminAllProducts></AdminAllProducts></AdminRouter>
            },
            {
              path: 'manage-users',
              element: <AdminRouter><ManageUsers></ManageUsers></AdminRouter>
            },
            {
              path: 'all-orders',
              element: <AdminRouter><AllAdminOrders></AllAdminOrders></AdminRouter>
            },
            {
                path: 'all-orders/order-details/:orderId',
                element: <OrderDetails></OrderDetails>
            },
    ]
  }
]);



export default router;
