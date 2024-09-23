import { Link } from "react-router-dom";
import Logo from "./../ui/Logo/Logo";
import Navigation from "../Shared/Navigation";
import SocialLogin from "../Shared/SocialLogin";
import { useState } from "react";
import { useLoginMutation } from "../../Features/auth/authApi";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center mt-2">
        <div className="flex flex-col w-1/2 rounded-md sm:p-10 text-gray-900">
          <div className="mt-6">
            {/* == */}
            <div className="mb-3">
              <h1 className="my-3 text-4xl font-bold text-red-600">Sign In</h1>
            </div>
            {/* == */}
            <p className="text-sm text-gray-500">
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-2 mt-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="📩 Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-red-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm mb-2 mt-2 text-white"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="🔐 Password"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-red-500 bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              {isLoading ? (
                <button className="bg-red-600 font-semibold text-xl w-full rounded-md py-3 text-white hover:bg-red-700">
                  <FaSpinner className="animate-spin" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-red-600 font-semibold text-xl w-full rounded-md py-3 text-white hover:bg-red-700"
                >
                  Login
                </button>
              )}
            </div>
          </form>
          <div className="space-y-1">
            <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
              Forgot password?
            </button>
          </div>
          {/*  */}
          {/* ====social login */}
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>

          <SocialLogin />
          <p className="px-6 text-sm text-center text-gray-800">
            Don&apos;t have an account yet?
            <Link
              to="/register"
              //   onClick={closeLoginModal}
              className="hover:underline hover:text-red-500 text-gray-500"
            >
              Sign up
            </Link>
          </p>
          {/* ================ */}
        </div>
      </div>
    </>
  );
};

export default Login;
