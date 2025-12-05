import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthContext";

const Login = () => {
  const { signIn, setUser, signInWithGoogleFunc, sendPasswordResetEmailFunc } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [show, setShow] = useState();
  const [email, setEmail] = useState();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // alert(errorCode, errorMessage)
        setError(errorCode);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogleFunc()
      .then((res) => {
        setUser(res.user);
        toast.success("Logged in with Google");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="flex justify-center min-h-screen items-center">
      <title>Login page</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h1 className="text-2xl font-semibold text-center">Please Login your account</h1>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            {/* email  */}
            <label className="label">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Email"
              required
            />
            {/* password  */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <span onClick={() => setShow(!show)} className="absolute top-9 right-3 cursor-pointer z-50">
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            <div>
              <a
                onClick={() => {
                  if (!email) {
                    toast.error("please enter your email first");
                    return;
                  }
                  sendPasswordResetEmailFunc(email)
                    .then(() => toast.success("password reset email sent!"))
                    .catch((error) => toast.error(error.message));
                  return;
                }}
                className="link link-hover"
              >
                Forgot password? <span className="underline text-blue-600">Link</span>
              </a>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-px w-16 bg-green-500"></div>
              <span className="text-sm text-green-500">or</span>
              <div className="h-px w-16 bg-green-500"></div>
            </div>

            {/* Google Signin */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-3 btn btn-outline text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
              Continue with Google
            </button>
            <p className="text-center mt-2">
              Don't have an account ?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-800 underline">
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
