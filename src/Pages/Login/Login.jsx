import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const { signIn, setUser, signInWithGoogleFunc } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      setUser(result.user);
      toast.success("Login Successful!");
      navigate(location.state ? location.state : "/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogleFunc();
      const user = res.user;

      const saveUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "buyer",
        status: "pending",
      };

      await axiosSecure.post("/users", saveUser);
      setUser(user);

      toast.success(`Logged in Successfully! ${user.displayName}`);
      navigate(location.state ? location.state : "/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-11 text-gray-500"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold hover:opacity-90 transition"
          >
            Sign In
          </button>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full cursor-pointer flex items-center justify-center gap-3 border rounded-lg py-2 hover:bg-gray-100 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
            Continue with Google
          </button>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-500 underline">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
