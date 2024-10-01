import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../Features/auth/authApi";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { imageUpload } from "./../../Api/utils";
import { useNavigate } from "react-router-dom";
import Logo from "../ui/Logo/Logo";
import { Form, Formik } from "formik";
import InputField from "../Formik/InputField";
import InputPassword from "../Formik/InputPassword";
import * as Yup from "yup";
import InputText from "../Formik/InputText";
import { FileInput } from "rizzui";
import InputFile from "../Formik/InputFile";

const Register = () => {
  const [uploadButtonText, setUploadButtonText] = useState(
    "Upload Profile Picture"
  );
  const navigate = useNavigate();

  // =================================================================
  const [register, { isLoading, error: responseError, isSuccess }] =
    useRegisterMutation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    image: null,
  };

  const signUpSchema = Yup.object().shape({
    email: Yup.string().required("Required!").email("Invalid Email!"),
    password: Yup.string().required("Required!"),
    name: Yup.string().required("Name is required"),
    image: Yup.mixed().required("Profile picture is required"),
  });

  useEffect(() => {
    if (responseError) {
      toast.error(responseError?.data?.message);
    } else if (isSuccess) {
      navigate("/");
    }
  }, [responseError, navigate, isSuccess]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Image upload logic
      const image = values.image;
      console.log(image);

      const imageData = await imageUpload(image);

      // Registration API call with image URL
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        image: imageData?.data?.display_url,
        status: "user",
      });

      toast.success("Registration successful!");
      resetForm(); // Reset the form
      navigate("/"); // Navigate to home or login
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800 text-slate-100 px-24 lg:h-screen h-auto">
      <div className="lg:w-1/2">
        <div className="p-6 rounded-md sm:p-10 text-gray-900">
          <div className="mb-8">
            <h1 className="my-3 text-4xl font-bold text-white">
              <Logo />
            </h1>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              Welcome to Tube-Nest
            </p>
          </div>

          {/* Formik form for registration */}
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-5">
                {/* Name field */}
                <InputText name="name" label="Name" placeholder="Your Name" />

                {/* Email field */}
                <InputField
                  name="email"
                  label="Email"
                  placeholder="enter@gmail.com"
                />

                {/* Password field */}
                <InputPassword
                  name="password"
                  label="Password"
                  placeholder="******"
                />

                {/* File input for image */}

                <InputFile
                  setUploadButtonText={uploadButtonText}
                  setFieldValue={setFieldValue}
                  label={uploadButtonText}
                />
                {/* Submit button */}
                <div>
                  {isSubmitting || isLoading ? (
                    <button className="bg-red-600 flex justify-center font-semibold text-xl w-full rounded-md py-3 text-white hover:bg-red-700">
                      <FaSpinner className="animate-spin" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-red-600 font-semibold text-xl w-full rounded-md py-3 text-white hover:bg-red-700"
                    >
                      Register
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
