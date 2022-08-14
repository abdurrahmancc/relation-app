import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import auth from "../../Hooks/Firebase";
import Loading from "../share/Loading";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center gap-3 py-10">
      <NavLink to={"inbox"}>Inbox</NavLink>
      <NavLink to={"users"} className="border-x-[1px] px-3 border-black text-lg">
        Users
      </NavLink>
      {user ? (
        <span onClick={() => handleSignOut()} className={"cursor-pointer"}>
          Sign out
        </span>
      ) : (
        <NavLink to={"login"}>Login</NavLink>
      )}
    </div>
  );
};

export default Navbar;
