import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";

const ProtectedRoute = ({children}) => {
  const {isAuth, loadingUser} = useAuth();

  if (loadingUser) return null;

  if (!isAuth) return <Navigate to="/" replace/>;

  return children;
};

export default ProtectedRoute;