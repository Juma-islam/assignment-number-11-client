import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn, setUser, signInWithGoogleFunc } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login Successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogleFunc()
      .then((res) => {
        setUser(res.user);
        toast.success("Logged in with Google");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-6">
        <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset>
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-error">{errors.email.message}</p>}

            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("password", { required: "Password is required" })}
              />
              <span onClick={() => setShow(!show)} className="absolute right-3 top-10 cursor-pointer">
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
              {errors.password && <p className="text-error">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition-all duration-300"
            >
              Sign In
            </button>

            <div className="flex justify-center items-center gap-2 my-3">
              <div className="h-px w-16 bg-green-500"></div>
              <span className="text-green-500 text-sm">or</span>
              <div className="h-px w-16 bg-green-500"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-3 btn btn-outline text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-center mt-2 w-full">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
