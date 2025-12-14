import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogleFunc } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = new FormData();
      imageFile.append("image", data.photo[0]);

      const imgRes = await fetch(image_hosting_api, {
        method: "POST",
        body: imageFile,
      });

      const imgData = await imgRes.json();
      if (!imgData.success) {
        toast.error("Image upload failed");
        return;
      }

      const photoURL = imgData.data.display_url;

      const result = await createUser(data.email, data.password);
      const user = result.user;

      await updateUser({
        displayName: data.name,
        photoURL,
      });

      const saveUser = {
        name: data.name,
        email: data.email,
        photoURL,
        role: data.role,
        status: "pending",
        joinDate: new Date(),
      };

      await axiosSecure.post("/users", saveUser);

      setUser({ ...user, displayName: data.name, photoURL });
      toast.success("Signup Successful!");
      reset();
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
        joinDate: new Date(),
      };

      await axiosSecure.post("/users", saveUser);
      setUser(user);

      toast.success(`Signin Successful! ${user.displayName}`);
      navigate(location.state ? location.state : "/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join us and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          {/* Photo */}
          <div>
            <label className="text-sm font-medium text-gray-600">Profile Photo</label>
            <input
              type="file"
              className="mt-1 file-input file-input-bordered w-full"
              {...register("photo", { required: "Photo is required" })}
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-600">Role</label>
            <select
              className="mt-1 select select-bordered w-full"
              {...register("role", { required: true })}
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message: "Uppercase, lowercase & 6+ chars required",
                },
              })}
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
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-3 border rounded-lg py-2 hover:bg-gray-100 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
            Continue with Google
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 underline">
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;


