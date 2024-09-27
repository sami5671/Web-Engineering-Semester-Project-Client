import { Link } from "react-router-dom";
import Logo from "../ui/Logo/Logo";
import avatar from "../../assets/userAvater.gif";
import { useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import NavigationModal from "../ui/modal/NavigationModal";
import { MdAdminPanelSettings, MdOutlineFavorite } from "react-icons/md";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const checkUser = useAuth();
  const { email, image, status } = user || {};

  // modal logout
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <nav className="bg-slate-100 shadow-md">
        <div className="max-w-7xl mx-auto ml-auto justify-between px-5 lg:px-0 flex py-3 items-center">
          <div>
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            {status === "admin" ? (
              <Link
                to="/addVideo"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
              >
                + Add Video
              </Link>
            ) : (
              <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-red-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500">
                <span className="flex items-center gap-2">
                  Request for Admin <MdAdminPanelSettings className="text-xl" />
                </span>
              </button>
            )}
            {checkUser === true ? (
              <div className="flex items-center gap-4">
                <div>
                  <img
                    onClick={handleOpen}
                    className="w-12 h-12 rounded-full cursor-pointer border-2 border-slate-500"
                    src={image}
                    alt=""
                  />
                </div>
                <div>
                  <Link>
                    <MdOutlineFavorite className="text-2xl text-slate-500  hover:text-black" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <img className="w-12 h-12 rounded-full" src={avatar} alt="" />
              </Link>
            )}
          </div>
        </div>
      </nav>
      <NavigationModal open={open} close={handleClose} />
    </>
  );
};

export default Navigation;
