import React from "react";
import { Link, useNavigate, useRouteError } from "react-router";
import errorImg from "../assets/error-404-image.avif";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <>
      <Navbar></Navbar>
      <div>
        <title>Error Page</title>
        <h1>{error.message}</h1>
        <div className="flex flex-col justify-center items-center space-y-3">
          <img src={errorImg} alt="" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Oops, page not found!</h1>
          <p className="text-gray-500 text-sm md:text-[16px] lg:text-xl">
            The page you are looking for is not available.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate()}
              className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default ErrorPage;
