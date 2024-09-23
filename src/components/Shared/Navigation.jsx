import { Link } from "react-router-dom";
import Logo from "../ui/Logo/Logo";
import avatar from "../../assets/userAvater.gif";

const Navigation = () => {
  const admin = true;
  return (
    <nav className="bg-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto ml-auto justify-between px-5 lg:px-0 flex py-3 items-center">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          {admin === true ? (
            <Link
              to="/addVideo"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
            >
              + Add Video
            </Link>
          ) : (
            ""
          )}
          <Link to="/login">
            <img className="w-12 h-12 rounded-full" src={avatar} alt="" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
