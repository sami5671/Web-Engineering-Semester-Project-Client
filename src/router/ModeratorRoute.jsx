import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ModeratorRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const { status } = user || {};
  if (status === "moderator" || status === "admin") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default ModeratorRoute;
