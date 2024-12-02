import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../Features/auth/authApi";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import Logo from "./../ui/Logo/Logo";
import { Form, Formik } from "formik";
import InputField from "../Formik/InputField";
import InputPassword from "../Formik/InputPassword";
import * as Yup from "yup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [login, { data, isLoading, error: responseError, isSuccess }] =
    useLoginMutation();

  // ----------------------------------------------------------------
  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Required!").email("Invalid Email!"),
    password: Yup.string().required("Required!"),
  });
  // ----------------------------------------------------------------

  useEffect(() => {
    if (responseError) {
      toast.error(responseError?.data?.message);
    } else if (isSuccess) {
      navigate("/");
    }
  }, [responseError, isSuccess, navigate]);

  const handleSubmit = (values) => {
    login({
      email: values.email,
      password: values.password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex items-center justify-center mt-2 bg-slate-800 h-svh">
        <div className="flex flex-col w-1/2 rounded-md sm:p-10 text-gray-900">
          <div className="mt-6">
            {/* == */}
            <div className="mb-3 flex items-center justify-center">
              <h1 className="my-3 text-4xl font-bold text-white">
                <Logo />
              </h1>
            </div>
            {/* == */}
            <p className="text-sm text-gray-500">
              Sign in to access your account
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {() => {
              return (
                <Form className="space-y-5">
                  <InputField
                    name="email"
                    label="Email"
                    placeholder="ADMIN: samialam5671@email.com"
                  />

                  <InputPassword
                    name="password"
                    label="Password"
                    placeholder="PASSWORD: 123456"
                  />

                  <p className="text-end text-xs font-semibold text-white">
                    Fields marked with <span className="text-red-600">*</span>{" "}
                    are mandatory!
                  </p>

                  <div>
                    {isLoading ? (
                      <button className="bg-red-600 flex justify-center font-semibold text-xl w-full rounded-md py-3 text-white hover:bg-red-700">
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
                </Form>
              );
            }}
          </Formik>
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
          <p className="px-6 text-sm text-center text-slate-300">
            Don&apos;t have an account yet?
            <Link
              to="/register"
              className="hover:underline hover:text-red-500 text-red-400"
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
