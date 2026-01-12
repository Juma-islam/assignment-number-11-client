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
import AdminAllProducts from "../Pages/AdminAllProducts/AdminAllProducts";
import OrderDetails from "../Pages/OrderDetails/OrderDetails";
import ManagerRouter from "./ManagerRouter";
import AddProducts from "../Pages/AddProducts/AddProducts";
import ManageProducts from "../Pages/ManageProducts/ManageProducts";
import PendingOrders from "../components/PendingOrders/PendingOrders";
import ApprovedOrders from "../components/ApprovedOrders/ApprovedOrders";
import BuyerRouter from "./BuyerRouter";
import TrackOrder from "../Pages/TrackOrder/TrackOrder";
import TrackOrderBuyer from "../Pages/TrackOrderBuyer/TrackOrderBuyer";
import TrackOrderManager from "../Pages/TrackOrderManager/TrackOrderManager";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import AdminAllOrders from "../Pages/AdminAllOrders/AdminAllOrders";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";

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
        path: "/allProducts",
        Component: AllProduct,
      },
      {
        path: "product-details/:id",
        element: (
          <PrivateRouter>
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "product-details/:id/order-form",
        element: <ProductsOrder></ProductsOrder>,
      },
      {
        path: "product-details/:id/order-form/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        Component: DashboardMain,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "my-orders",
        element: (
          <BuyerRouter>
            <MyOrders></MyOrders>
          </BuyerRouter>
        ),
      },
      {
        path: "my-orders/order-details/:orderId",
        element: <OrderDetails></OrderDetails>,
      },
      {
        path: "track-order",
        element: (
          <BuyerRouter>
            <TrackOrder></TrackOrder>
          </BuyerRouter>
        ),
      },
      {
        path: "track-order/:id",
        element: <TrackOrderBuyer></TrackOrderBuyer>,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRouter>
            <AdminAllProducts></AdminAllProducts>
          </AdminRouter>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRouter>
            <ManageUsers></ManageUsers>
          </AdminRouter>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRouter>
            <AdminAllOrders></AdminAllOrders>
          </AdminRouter>
        ),
      },
      {
        path: "all-orders/order-details/:orderId",
        element: <OrderDetails></OrderDetails>,
      },
      {
        path: "add-products",
        element: (
          <ManagerRouter>
            <AddProducts></AddProducts>
          </ManagerRouter>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ManagerRouter>
            <ManageProducts></ManageProducts>
          </ManagerRouter>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRouter>
            <PendingOrders></PendingOrders>
          </ManagerRouter>
        ),
      },
      {
        path: "pending-orders/order-details/:orderId",
        element: <OrderDetails></OrderDetails>,
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRouter>
            <ApprovedOrders></ApprovedOrders>
          </ManagerRouter>
        ),
      },
      {
        path: "approved-orders/view-tracking/:id",
        element: (
          <ManagerRouter>
            <TrackOrderManager></TrackOrderManager>
          </ManagerRouter>
        ),
      },
    ],
  },
]);

export default router;
