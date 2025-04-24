import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle signup logic here (e.g., API call)
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-[600px] p-6 bg-white shadow-md rounded-md relative">
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          {/* Close button to go home */}
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
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name.message}</span>
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

          {/* Buttons */}
          <div className="flex flex-col items-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              Sign Up
            </button>

            <p className="text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 underline cursor-pointer"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* DaisyUI Login Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <Login />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Signup;