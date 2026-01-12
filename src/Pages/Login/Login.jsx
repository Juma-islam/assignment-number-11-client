
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Chrome } from "lucide-react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn, signInWithGoogleFunc } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      toast.error(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogleFunc();
      toast.success("Google Login Successful!");
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    }
  };

  // Demo credentials
  const demoCredentials = [
    { label: "Demo Buyer", email: "buyer@demo.com", password: "Buyer1234" },
    { label: "Demo Manager", email: "manager@garments.com", password: "Manager123" },
    { label: "Demo Admin", email: "admin@garments.com", password: "Admin123" },
  ];

  const autoFillDemo = (email, password) => {
    const emailInput = document.querySelector('input[name="email"]');
    const passInput = document.querySelector('input[name="password"]');

    if (emailInput && passInput) {
      emailInput.value = email;
      passInput.value = password;
      toast.info(`Auto-filled ${email.split("@")[0]} demo credentials!`, {
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/70 dark:to-purple-950/50 transition-colors duration-500 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 dark:bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 md:right-32 w-80 md:w-[500px] h-80 md:h-[500px] bg-pink-500/10 dark:bg-pink-700/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Visual / Illustration */}
          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-3xl opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2400"
                alt="Modern Garment Production Dashboard"
                className="relative z-10 rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[680px] drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Right Side - Login Form*/}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className={`
              bg-white/75 dark:bg-gray-900/65 
              backdrop-blur-2xl 
              border border-white/40 dark:border-gray-700/50 
              rounded-3xl 
              shadow-2xl dark:shadow-indigo-950/40 
              p-8 md:p-12 lg:p-16 
              transition-all duration-500
            `}
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Demo Quick Access */}
            <div className="mb-10">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {demoCredentials.map((cred, idx) => (
                  <button
                    key={idx}
                    onClick={() => autoFillDemo(cred.email, cred.password)}
                    className={`
                      py-3 px-4 rounded-xl text-sm font-medium 
                      bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
                      dark:from-indigo-600/20 dark:to-purple-600/20
                      border border-indigo-200/70 dark:border-indigo-700/50
                      hover:border-indigo-400 dark:hover:border-indigo-500
                      text-indigo-700 dark:text-indigo-300 
                      hover:shadow-md transition-all duration-300
                    `}
                  >
                    {cred.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  className={`
                    w-full px-5 py-5 bg-white/40 dark:bg-gray-800/40 
                    border border-gray-300/70 dark:border-gray-600/70 
                    rounded-xl text-gray-900 dark:text-white 
                    placeholder-transparent focus:outline-none 
                    focus:border-indigo-500 dark:focus:border-indigo-400 
                    peer transition-all duration-300
                  `}
                  placeholder=" "
                />
                <label
                  className={`
                    absolute left-5 top-1/2 -translate-y-1/2 
                    text-gray-500 dark:text-gray-400 pointer-events-none 
                    transition-all duration-300 
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                  `}
                >
                  Email Address
                </label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className={`
                    w-full px-5 py-5 pr-14 bg-white/40 dark:bg-gray-800/40 
                    border border-gray-300/70 dark:border-gray-600/70 
                    rounded-xl text-gray-900 dark:text-white 
                    placeholder-transparent focus:outline-none 
                    focus:border-indigo-500 dark:focus:border-indigo-400 
                    peer transition-all duration-300
                  `}
                  placeholder=" "
                />
                <label
                  className={`
                    absolute left-5 top-1/2 -translate-y-1/2 
                    text-gray-500 dark:text-gray-400 pointer-events-none 
                    transition-all duration-300 
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                  `}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className={`
                  w-full py-5 px-8 rounded-xl font-bold text-white 
                  bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 
                  dark:from-indigo-500 dark:via-purple-500 dark:to-indigo-500
                  hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 
                  shadow-lg hover:shadow-xl transition-all duration-300
                  disabled:opacity-60 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                `}
              >
                {loading ? (
                  <>Signing in...</>
                ) : (
                  <>
                    Sign In <LogIn size={20} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/70 dark:border-gray-600/70" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-900 px-6 text-sm text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              className={`
                w-full py-5 px-8 rounded-xl font-medium 
                bg-white dark:bg-gray-800 
                border border-gray-300 dark:border-gray-700 
                text-gray-800 dark:text-white 
                hover:bg-gray-50 dark:hover:bg-gray-700 
                transition-all duration-300 flex items-center justify-center gap-3 shadow-sm
              `}
            >
              <Chrome size={22} className="text-red-500" />
              Continue with Google
            </button>

            {/* Register Link */}
            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Create Account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

