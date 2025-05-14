import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone, // ✅ Added phone here
      password: data.password,
      dob: data.dob,
      genre: data.genre,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Successfully!");
        //localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.error(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-[600px] p-6 bg-white shadow-md rounded-md relative">
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>

          <h3 className="font-bold text-2xl mb-6 text-center">Signup</h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border rounded-md outline-none"
              {...register("fullname", { required: "Name is required" })}
            />
            {errors.fullname && (
              <span className="text-sm text-red-500">{errors.fullname.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border rounded-md outline-none"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />
            {errors.phone && (
              <span className="text-sm text-red-500">{errors.phone.message}</span>
            )}
          </div>


          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md outline-none"
              {...register("dob", { required: "Date of birth is required" })}
            />
            {errors.dob && (
              <span className="text-sm text-red-500">{errors.dob.message}</span>
            )}
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label className="block mb-1">Preferred Genre</label>
            <select
              className="w-full px-3 py-2 border rounded-md outline-none"
              {...register("genre", { required: "Please select a genre" })}
            >
              <option value="">-- Select Genre --</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="fantasy">Fantasy</option>
              <option value="biography">Biography</option>
              <option value="self-help">Self Help</option>
              <option value="science">Science</option>
              <option value="romance">Romance</option>
            </select>
            {errors.genre && (
              <span className="text-sm text-red-500">{errors.genre.message}</span>
            )}
          </div>

          {/* Signup button */}
          <div className="flex flex-col items-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              Sign Up
            </button>

            <div className="text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 underline cursor-pointer"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Login modal outside the form */}
      <Login />
    </div>
  );
}

export default Signup;
