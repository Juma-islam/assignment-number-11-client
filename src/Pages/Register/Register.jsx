// import { Link, useNavigate } from "react-router";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { FaEye } from "react-icons/fa";
// import { IoEyeOff } from "react-icons/io5";
// import useAuth from "../../hooks/useAuth";
// import { useForm } from "react-hook-form";

// const Register = () => {
//   const { createUser, setUser, updateUser, signInWithGoogleFunc } = useAuth();
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();

//   // react hook
//   const {
//     register,
//     handleSubmit,
//     // watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const {name, email, photo, password} = data

//         createUser(email, password)
//       .then((result) => {
//         const user = result.user;
//         updateUser({ displayName: name, photoURL: photo })
//           .then(() => {
//             setUser({ ...user, displayName: name, photoURL: photo });
//             navigate("/");
//           })
//           .catch((error) => {
//             console.log(error);
//             setUser(user);
//           });
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         toast.error(errorMessage);
//       });
//   };

//   // const handleRegister = (e) => {
//   //   e.preventDefault();
//   //   const name = e.target.name.value;
//   //   if (name.length < 5) {
//   //     setNameError("Name should be 5 character more");
//   //     return;
//   //   } else {
//   //     setNameError("");
//   //   }
//   //   const email = e.target.email.value;
//   //   const photo = e.target.photo.value;
//   //   const password = e.target.password.value;
//   //   const regexp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
//   //   if (!regexp.test(password)) {
//   //     toast.error(
//   //       "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter."
//   //     );
//   //     return;
//   //   }
//   //   createUser(email, password)
//   //     .then((result) => {
//   //       const user = result.user;
//   //       updateUser({ displayName: name, photoURL: photo })
//   //         .then(() => {
//   //           setUser({ ...user, displayName: name, photoURL: photo });
//   //           navigate("/");
//   //         })
//   //         .catch((error) => {
//   //           console.log(error);
//   //           setUser(user);
//   //         });
//   //     })
//   //     .catch((error) => {
//   //       const errorMessage = error.message;
//   //       toast.error(errorMessage);
//   //     });
//   // };

//   const handleGoogleSignIn = () => {
//     signInWithGoogleFunc()
//       .then((res) => {
//         setUser(res.user);
//         toast.success("Signin Successful!!");
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   return (
//     <div className="flex justify-center min-h-screen items-center">
//       <title>Register page</title>
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
//         <div className="mb-8 text-center">
//           <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
//           <p className="text-sm text-gray-400">Welcome to Register Page</p>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//           <fieldset className="fieldset">
//             {/* name  */}
//             <label className="label">Name</label>
//             <input
//               type="text"
//               className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
//               placeholder="Name"
//               {...register("name", {
//                 required: "name is required",
//                 maxLength: {
//                   value: 20,
//                 },
//               })}
//             />
//             {errors.name?.type === "required" && (
//                 <p className="text-error italic">
//                   Name is required.
//                 </p>
//               )}

//             {/* email  */}
//             <label className="label">Email</label>
//             <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
//             {errors.email?.type === "required" && <p className="text-error">Email is required</p>}

//             {/* photo image  */}
//             <label className="label">Photo</label>
//             <input
//               type="file"
//               {...register("photo", { required: true })}
//               className="file-input"
//               placeholder="Your photo"
//             />
//             {errors.photo?.type === "required" && <p className="text-error">Photo is required</p>}

//             {/* password  */}
//             <div className="relative">
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input
//                 type={show ? "text" : "password"}
//                 placeholder="••••••••"
//                 className="input input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
//                 {...register("password", {
//                   required: true,
//                   minLength: 6,
//                   pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
//                 })}
//               />
//               <span onClick={() => setShow(!show)} className="absolute top-9 right-3 cursor-pointer z-50">
//                 {show ? <FaEye /> : <IoEyeOff />}
//               </span>
//               {errors.password?.type === "required" && <p className="text-error italic">password is required.</p>}

//               {errors.password?.type === "pattern" && (
//                 <p className="text-error italic">
//                   Password must be at least 6 chars and include both upper and lower case letters.
//                 </p>
//               )}
//             </div>

//             <button type="submit" className="btn btn-neutral mt-4">
//               Sign In
//             </button>

//             {/* Divider */}
//             <div className="flex items-center justify-center gap-2 my-2">
//               <div className="h-px w-16 bg-green-500"></div>
//               <span className="text-sm text-green-500">or</span>
//               <div className="h-px w-16 bg-green-500"></div>
//             </div>

//             {/* Google Signin */}
//  <button
//    onClick={handleGoogleSignIn}
//   type="button"
//   className="flex items-center justify-center gap-3 btn btn-outline text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
// >
//   <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
//  Continue with Google
// </button>
//             <p className="text-center mt-2">
//               Already have an account ?{" "}
//               <Link to="/login" className="text-blue-500 hover:text-blue-800 underline">
//                 Sign In
//               </Link>
//             </p>
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogleFunc } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, photo, password, role } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(async() => {
            const saveUser = {
              name: data.displayName,
              email: data.email,
              photoURL: data.photoURL,
              role: data.role,
              status: 'pending',
            }
            await axiosSecure.post('/users', saveUser)
            setUser({ ...user, displayName: name, photoURL: photo, role, status: "pending" });
            toast.success("Signup Successful!");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            setUser(user);
          });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogleFunc()
      .then(async (res) => {
const user = res.user
        const saveUser ={
          name: user.displayName,
           email: user.email,
          photoURL: user.photoURL,
          role: "buyer",
          status: "pending",

        };
        await axiosSecure.post("/users", saveUser);
        setUser({...res.user, role: "buyer", status: "pending"});
        toast.success(`Signin Successful with Google! ${user?.displayName}`);
        navigate(location.state ? location.state : "/", { replace: true })
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Register Page</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset>
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-error">{errors.name.message}</p>}

            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-error">{errors.email.message}</p>}
            {/* photo  */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400"
              {...register("photo", { required: "Photo URL is required" })}
            />
            {errors.photo && <p className="text-error">{errors.photo.message}</p>}
            <label className="label">Role</label>
            <select className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400" {...register("role", { required: true })}>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
            {/* password  */}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                placeholder="•••••••"
                className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Password must have uppercase, lowercase & 6+ chars",
                  },
                })}
              />
              <span onClick={() => setShow(!show)} className="absolute top-10 right-3 cursor-pointer">
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
              {errors.password && <p className="text-error">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition-all duration-300"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center gap-2 my-3">
              <div className="h-px w-16 bg-green-500"></div>
              <span className="text-sm text-green-500">or</span>
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

            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
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
