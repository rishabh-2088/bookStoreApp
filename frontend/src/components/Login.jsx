import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("https://bookstoreapp-yhvs.onrender.com/user/login", userInfo);
      if (res.data) {
        toast.success("Logged in Successfully!");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        document.getElementById("my_modal_3").close();
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
        console.error(err);
      }
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </Link>
          <h3 className="font-bold text-lg mb-4">Login</h3>

          {/* Email */}
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md outline-none"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md outline-none"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              Login
            </button>
            <p className="text-sm">
              Not registered?{" "}
              <Link to="/signup" className="underline text-blue-500">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
