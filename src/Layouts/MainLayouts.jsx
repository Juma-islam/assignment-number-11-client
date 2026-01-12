import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import ScrollBtn from "../components/ScrollBtn/ScrollBtn";

const MainLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-1">
        <Outlet></Outlet>
        <ScrollBtn></ScrollBtn>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
