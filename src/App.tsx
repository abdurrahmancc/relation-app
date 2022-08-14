import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FriendRequest from "./Components/inbox/FriendRequest";
import Inbox from "./Components/inbox/Inbox";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Components/NotFound";
import Users from "./Components/Users/Users";
import RequireAuth from "./Hooks/RequireAuth";

function App() {
  return (
    <div className="bg-gradient-to-r from-[#52d794] to-[#00b3bd] h-screen px-20">
      <Toaster />
      <Navbar />

      <div className=" max-w-[1000px] h-[800px] w-full mx-auto rounded-xl">
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Inbox></Inbox>}></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="inbox" element={<Inbox></Inbox>}></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/users" element={<Users></Users>} />
          </Route>
          <Route path="/login" element={<Login></Login>} />

          <Route path="/register" element={<Register></Register>} />
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
