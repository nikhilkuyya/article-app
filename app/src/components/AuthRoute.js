import { Navigate } from "react-router-dom"

const AuthRoute = ({children}) => {
  const isAllowed = false;
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default AuthRoute;