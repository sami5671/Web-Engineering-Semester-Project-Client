import { MdSatelliteAlt } from "react-icons/md";
import SocialLogin from "../Shared/SocialLogin";
import Navigation from "../Shared/Navigation";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../Features/auth/authApi";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { imageUpload } from "./../../Api/utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState(
    "Upload Profile Picture"
  );
  const navigate = useNavigate();

  // =================================================================
  const [register, { data, isLoading, error: responseError, isSuccess }] =
    useRegisterMutation();

  useEffect(() => {
    if (responseError) {
      toast.error(responseError?.data?.message);
    } else if (isSuccess) {
      navigate("/");
    }
  }, [responseError, navigate, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    const imageData = await imageUpload(image);

    register({
      name,
      email,
      password,
      image: imageData?.data?.display_url,
      status: "user",
    });

    setName("");
    setEmail("");
    setPassword("");
    setUploadButtonText(uploadButtonText);
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  // =================================================================
  return (
    <>
      <Navigation />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between text-slate-100 px-24">
        <div
          className="w-1/2 text-black
        "
        >
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              SignUp with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          {/*  */}
          <SocialLogin />
          {/*  */}
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?
            <button
              // onClick={openLoginModal}
              className="hover:underline hover:text-red-500 text-gray-100"
            >
              Login
            </button>
          </p>
        </div>

        {/* for Signup */}
        <div className="w-full">
          <div className="flex justify-center items-center ">
            <div className="flex flex-col p-6 rounded-md sm:p-10 text-gray-900">
              <div className="mb-8">
                <h1 className="my-3 text-4xl font-bold text-red-500">
                  Sign Up
                </h1>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  Welcome to SamTube <MdSatelliteAlt className="animate-spin" />
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                noValidate=""
                action=""
                className="space-y-6 ng-untouched ng-pristine ng-valid"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name Here"
                      className="lg:w-[600px] px-3 py-2 border rounded-md border-gray-300 focus:outline-red-500 bg-gray-200 text-gray-900"
                      data-temp-mail-org="0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm  text-white"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter Your Email Here"
                      className="lg:w-[600px] px-3 py-2 border rounded-md border-gray-300 focus:outline-red-500 bg-gray-200 text-gray-900"
                      data-temp-mail-org="0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm mb-2 text-white"
                      >
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="*******"
                      className=" lg:w-[600px] px-3 py-2 border rounded-md border-gray-300 focus:outline-red-500 bg-gray-200 text-gray-900"
                    />
                  </div>
                </div>
                <div className=" w-full  m-auto rounded-lg">
                  <div className="file_upload py-2 relative border-4 border-dashed border-red-300">
                    <div className="flex flex-col w-max mx-auto text-center ">
                      <label>
                        <input
                          onChange={(e) => handleImageChange(e.target.files[0])}
                          className="text-smlg:w-[600px] cursor-pointer hidden"
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          hidden
                        />
                        <div className="bg-red-800 hover:animate-pulse text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-red-700">
                          {uploadButtonText}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  {isLoading ? (
                    <button className="bg-red-600 lg:w-[600px] rounded-md py-3 text-white hover:bg-red-700">
                      <FaSpinner className="animate-spin" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-red-600 lg:w-[600px] rounded-md py-3 text-white hover:bg-red-700"
                    >
                      submit
                    </button>
                  )}
                </div>
              </form>
              {/* ....................... */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
