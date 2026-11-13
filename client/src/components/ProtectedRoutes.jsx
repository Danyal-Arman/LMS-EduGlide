import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthLoading: PropTypes.bool.isRequired,
};

export const LoggedInUser = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
LoggedInUser.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthLoading: PropTypes.bool.isRequired,
};

export const AdminAcess = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <LoadingScreen message="Checking your session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (user?.role !== "instructor") {
    return <Navigate to="/" />;
  }
  return children;
};
AdminAcess.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthLoading: PropTypes.bool.isRequired,
};
