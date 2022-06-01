import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const IsUserAuthenticated = () => {
  try {
    let loggedInUser = localStorage.getItem("token");
    const user: any = loggedInUser && jwt_decode(loggedInUser);
    if (user.email) {
      // if user is not banned or deleted
      if (user.banned === false && user.email !== user.id) {
        return <Outlet />;
      } else {
        localStorage.removeItem("token");
      }
    }
  } catch (error) {
    console.log(error);
  }
  return <Navigate to="/auth" />;
};

export const IsUserUnauthenticated = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" />
  }
  return <Outlet />
}