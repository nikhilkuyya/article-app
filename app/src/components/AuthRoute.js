import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthRoute;
