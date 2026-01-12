// import { Link, useLocation, useNavigate } from "react-router";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { FaEye } from "react-icons/fa";
// import { IoEyeOff } from "react-icons/io5";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";

// const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const Register = () => {
//   const { createUser, setUser, updateUser, signInWithGoogleFunc } = useAuth();
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const location = useLocation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const imageFile = new FormData();
//       imageFile.append("image", data.photo[0]);

//       const imgRes = await fetch(image_hosting_api, {
//         method: "POST",
//         body: imageFile,
//       });

//       const imgData = await imgRes.json();
//       if (!imgData.success) {
//         toast.error("Image upload failed");
//         return;
//       }

//       const photoURL = imgData.data.display_url;

//       const result = await createUser(data.email, data.password);
//       const user = result.user;

//       await updateUser({
//         displayName: data.name,
//         photoURL,
//       });

//       const saveUser = {
//         name: data.name,
//         email: data.email,
//         photoURL,
//         role: data.role,
//         status: "pending",
//         joinDate: new Date(),
//       };

//       await axiosSecure.post("/users", saveUser);

//       setUser({ ...user, displayName: data.name, photoURL });
//       toast.success("Signup Successful!");
//       reset();
//       navigate(location.state ? location.state : "/", { replace: true });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const res = await signInWithGoogleFunc();
//       const user = res.user;

//       const saveUser = {
//         name: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//         role: "buyer",
//         status: "pending",
//         joinDate: new Date(),
//       };

//       await axiosSecure.post("/users", saveUser);
//       setUser(user);

//       toast.success(`Signin Successful! ${user.displayName}`);
//       navigate(location.state ? location.state : "/", { replace: true });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Create Account </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Join us and start your journey
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//           {/* Name */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Name</label>
//             <input
//               type="text"
//               placeholder="Your name"
//               className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//               {...register("name", { required: "Name is required" })}
//             />
//             {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//               {...register("email", { required: "Email is required" })}
//             />
//           </div>

//           {/* Photo */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Profile Photo</label>
//             <input
//               type="file"
//               className="mt-1 file-input file-input-bordered w-full"
//               {...register("photo", { required: "Photo is required" })}
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Role</label>
//             <select
//               className="mt-1 select select-bordered w-full"
//               {...register("role", { required: true })}
//             >
//               <option value="buyer">Buyer</option>
//               <option value="manager">Manager</option>
//             </select>
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="text-sm font-medium text-gray-600">Password</label>
//             <input
//               type={show ? "text" : "password"}
//               placeholder="••••••••"
//               className="mt-1 w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//               {...register("password", {
//                 required: "Password is required",
//                 pattern: {
//                   value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
//                   message: "Uppercase, lowercase & 6+ chars required",
//                 },
//               })}
//             />
//             <button
//               type="button"
//               onClick={() => setShow(!show)}
//               className="absolute right-3 top-11 text-gray-500"
//             >
//               {show ? <FaEye /> : <IoEyeOff />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold hover:opacity-90 transition"
//           >
//             Sign Up
//           </button>

//           <button
//             onClick={handleGoogleSignIn}
//             type="button"
//             className="w-full cursor-pointer flex items-center justify-center gap-3 border rounded-lg py-2 hover:bg-gray-100 transition"
//           >
//             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
//             Continue with Google
//           </button>

//           <p className="text-center text-sm mt-3">
//             Already have an account?{" "}
//             <Link to="/login" className="text-pink-500 underline">
//               Sign In
//             </Link>
//           </p>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, ImagePlus, Chrome } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUser, signInWithGoogleFunc } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password", "");

  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Image upload to imgbb
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();

      if (!imgData.success) {
        throw new Error("Image upload failed");
      }

      const photoURL = imgData.data.display_url;

      // Create user in Firebase
      const result = await createUser(data.email, data.password);
      await updateUser({
        displayName: data.name,
        photoURL,
      });

      // Save user info to your backend
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL,
        role: data.role,
        status: "pending",
        joinDate: new Date().toISOString(),
      };

      await axiosSecure.post("/users", userInfo);

      toast.success("Account created successfully! Welcome aboard 🎉");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithGoogleFunc();
      const user = result.user;

      await axiosSecure.post("/users", {
        name: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "buyer",
        status: "pending",
        joinDate: new Date().toISOString(),
      });

      toast.success("Registered successfully with Google!");
      navigate("/");
    } catch (err) {
      toast.error("Google registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950/70 dark:to-purple-950/50 transition-colors duration-500 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/10 dark:bg-pink-700/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-cyan-500/10 dark:bg-cyan-600/20 rounded-full blur-3xl animate-pulse-slow delay-2000" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 to-purple-600/15 rounded-3xl blur-3xl opacity-40" />
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2400&auto=format&fit=crop"
                alt="Modern Garment Industry"
                className="relative z-10 rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[720px] drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Right Side - Registration Form (Glassmorphic) */}
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
              p-8 md:p-12 lg:p-14 
              transition-all duration-500
            `}
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3">
                Create Your Account
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Join the next generation of garment management today
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Name */}
              <div className="relative">
                <input
                  {...register("name", { required: "Name is required" })}
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
                  Full Name
                </label>
                {errors.name && (
                  <p className="mt-1 text-sm text-pink-600 dark:text-pink-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
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
                {errors.email && (
                  <p className="mt-1 text-sm text-pink-600 dark:text-pink-400">{errors.email.message}</p>
                )}
              </div>

              {/* Profile Photo */}
              <div className="relative">
                <div className="flex items-center gap-4 p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-300/70 dark:border-gray-600/70 rounded-xl">
                  <ImagePlus size={26} className="text-indigo-500 dark:text-indigo-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("photo", { required: "Profile photo is required" })}
                      className="text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:bg-indigo-500/10 dark:file:bg-indigo-600/20 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-500/20 dark:hover:file:bg-indigo-600/30 transition"
                    />
                  </div>
                </div>
                {errors.photo && (
                  <p className="mt-1 text-sm text-pink-600 dark:text-pink-400">{errors.photo.message}</p>
                )}
              </div>

              {/* Role Selection */}
              <div className="relative">
                <select
                  {...register("role", { required: "Please select your role" })}
                  className={`
                    w-full px-5 py-5 bg-white/40 dark:bg-gray-800/40 
                    border border-gray-300/70 dark:border-gray-600/70 
                    rounded-xl text-gray-900 dark:text-white 
                    focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 
                    transition-all appearance-none
                  `}
                >
                  <option value="">Select Your Role</option>
                  <option value="buyer">Buyer</option>
                  <option value="manager">Manager</option>
                </select>
                <label
                  className={`
                    absolute left-5 top-1/2 -translate-y-1/2 
                    text-gray-500 dark:text-gray-400 pointer-events-none 
                    transition-all duration-300 
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                  `}
                >
                  Choose Role
                </label>
                {errors.role && (
                  <p className="mt-1 text-sm text-pink-600 dark:text-pink-400">{errors.role.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])/,
                      message: "Must contain at least one uppercase & lowercase letter",
                    },
                  })}
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

                {errors.password && (
                  <p className="mt-1 text-sm text-pink-600 dark:text-pink-400">{errors.password.message}</p>
                )}
              </div>

              {/* Password Strength */}
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        password.length < 6
                          ? "w-1/4 bg-red-500"
                          : password.length < 10
                          ? "w-2/4 bg-orange-500"
                          : "w-full bg-green-500"
                      }`}
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    {password.length < 6
                      ? "Weak - Minimum 6 characters"
                      : password.length < 10
                      ? "Good - Add more variety"
                      : "Strong - Excellent!"}
                  </p>
                </div>
              )}

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
                  flex items-center justify-center gap-2 mt-2
                `}
              >
                {loading ? (
                  <>Creating Account...</>
                ) : (
                  <>
                    Create Account <UserPlus size={20} />
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
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleSignUp}
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
              Sign up with Google
            </button>

            {/* Login Link */}
            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;