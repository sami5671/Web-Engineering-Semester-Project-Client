import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
const Logo = () => {
  return (
    <>
      <Link to="/">
        <span className="flex items-center font-serif font-bold text-2xl">
          <img className="h-10" src={logo} alt="logo" />
          Tube<span className="text-red-500 text-3xl">Nest</span>
        </span>
      </Link>
    </>
  );
};

export default Logo;
