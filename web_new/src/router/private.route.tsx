import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  // load user from provider
  const user: any = null;

  console.log('!user', !user)
  return !user ? <Navigate to="/login" /> : <Outlet />;
}