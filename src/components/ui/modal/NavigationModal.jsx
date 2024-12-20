import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../../Features/auth/authSlice";
import { Link } from "react-router-dom";

const NavigationModal = ({ open, close }) => {
  // =================================================================

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { name, email, image, status } = user || {};

  const handleLogOut = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
    close();
  };

  // =================================================================
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center lg:justify-end lg:-mt-[135px] pr-2 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl text-center leading-6 font-semibold text-gray-900"
                >
                  <div className="flex justify-center">
                    <img
                      className="w-14 h-14  rounded-full"
                      src={image}
                      alt=""
                    />
                  </div>
                  <span className="font-bold text-2xl">Hi</span>,<br /> {name}
                  <br />{" "}
                  <span className="text-[12px] font-normal">{email}</span>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mt-5 font-semibold">
                    Would you like to log out of your account?
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={close}
                  >
                    Cancel
                  </button>
                </div>

                {/* --------- */}
                {status === "admin" ? (
                  <Link to="/userAccess">
                    <div className="mt-12 flex justify-center bg-fuchsia-800 px-6 py-2 rounded-xl hover:bg-fuchsia-950">
                      <button className=" text-white font-semibold">
                        Requested Users
                      </button>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
                {/* ---------- */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NavigationModal;
