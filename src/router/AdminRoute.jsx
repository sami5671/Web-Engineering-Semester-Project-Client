import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const { status } = user || {};
  if (status === "admin" || status === "moderator") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
