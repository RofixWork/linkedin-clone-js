import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/" />;
};
