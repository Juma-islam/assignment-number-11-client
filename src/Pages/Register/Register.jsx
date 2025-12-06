import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogleFunc } = useAuth()
  const [nameError, setNameError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (name.length < 5) {
      setNameError("Name should be 5 character more");
      return;
    } else {
      setNameError("");
    }
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const regexp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regexp.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter."
      );
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogleFunc()
      .then((res) => {
        setUser(res.user);
        toast.success("Signin Successful!!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <title>Register page</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h1 className="text-2xl font-semibold text-center"> SignUp</h1>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* name  */}
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Name"
              required
            />
            {nameError && <p className="text-sm text-error">{nameError}</p>}
            {/* photo Url  */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Photo URL"
              required
            />
            {/* email  */}
            <label className="label">Email</label>
            <input
              type="email"
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
                className="input input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <span onClick={() => setShow(!show)} className="absolute top-9 right-3 cursor-pointer z-50">
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

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
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-800 underline">
                Sign In
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
