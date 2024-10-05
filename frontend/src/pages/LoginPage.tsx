import "../../src/login.css";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [location, navigate]);

  const handleLogin = () => {
    window.location.href = `http://localhost:5000/auth/google`;
  };

  return (
    <div className="flex justify-center items-center h-screen animated-gradient">
      <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-lg w-96 backdrop-blur-md">
        <h2 className="text-center text-white text-2xl font-bold mb-5">HOPE</h2>
        <h3 className="text-center text-white text-lg mb-6">Login</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="username@gmail.com"
              className="w-full p-3 rounded-md bg-white text-gray-900"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-white text-gray-900"
              required
            />
          </div>
          <a
            href="#"
            className="text-sm text-white block mb-6 text-right hover:underline"
          >
            Forgot Password?
          </a>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-white hover:text-blue-900 text-white font-bold py-3 w-full rounded-md transition-colors duration-300 mb-4"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-white text-sm mb-4">or continue with</p>
        <button
          type="button"
          className="bg-white text-gray-900 py-3 w-full rounded-md flex justify-center items-center shadow-md"
          onClick={handleLogin}
        >
          <img
            src="../../src/assets/google.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
        <p className="text-center text-white text-sm mt-6">
          Don't have an account yet?{" "}
          <a href="#" className="hover:underline">
            Register for free
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
