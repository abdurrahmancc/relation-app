import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import Loading from "../Components/share/Loading";
import auth from "./Firebase";
import useToken from "./useToken";

const RequireAuth = () => {
  const [user, loading] = useAuthState(auth);
  const [token, tokenLoading] = useToken(user);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  if (!user) {
    handleSignOut();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
