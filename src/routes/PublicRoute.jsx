import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const PubliceRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Navigate to="/home" /> : <Outlet />;
};
