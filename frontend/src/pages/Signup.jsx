import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { API_ENDPOINTS } from "../utils/api";
import { UserContext } from "../context/userContextserContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, {
        username: name,
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-200 via-orange-100 to-amber-200">
      <div className="flex bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden w-[900px] max-w-full">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>
          <p className="text-gray-600 mb-8 text-center">Sign up to get started</p>

          {error && (
            <div className="mb-4 text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-400 text-white py-3 rounded-xl font-semibold hover:bg-rose-500 transition duration-300 shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-rose-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://i.pinimg.com/1200x/25/4b/7a/254b7a9b67f3a3e700f939f00840ae6e.jpg"
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
