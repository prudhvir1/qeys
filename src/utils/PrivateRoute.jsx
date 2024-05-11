import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  return localStorage.getItem("NTSID") ? (
    <Outlet />
  ) : (
    <Navigate to="/Login" replace />
  );
}

export default PrivateRoute;
