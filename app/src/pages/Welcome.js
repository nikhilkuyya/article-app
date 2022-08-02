import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Welcome = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>{isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}</>
  );
};
export default Welcome;
