import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Dispatching loginUser...");
      const userData = await dispatch(loginUser(formData)).unwrap(); // Dispatch loginUser action and unwrap the response
      console.log('Logged in user:', userData);
      // Show success toast on successful login
      toast.success("Login successful!", { position: "top-center", autoClose: 5000 });

      // Redirect after delay to show the success toast
      setTimeout(() => {
        navigate("/home"); // Redirect to home page
      }, 1000); // Delay for toast to appear

    } catch (err) {
      // Handle errors if any during login
      toast.error(err.message || "Login failed!", { position: "top-center", autoClose: 5000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-400 to-blue-500">
      <div className="max-w-lg w-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-md p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <div className="relative mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pl-10 rounded-lg bg-white bg-opacity-60 text-gray-800 placeholder-gray-400 shadow-inner focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <span className="absolute left-3 top-2.5 text-gray-500">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pl-10 rounded-lg bg-white bg-opacity-60 text-gray-800 placeholder-gray-400 shadow-inner focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <span className="absolute left-3 top-2.5 text-gray-500">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-ascent-2 text-sm text-center mt-0">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;

