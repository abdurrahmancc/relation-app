import React from "react";
import img from "../../assets/images/illustration.png";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="grid grid-cols-3 z-10">
      <div className="col-span-1 bg-accent h-[800px] flex items-center rounded-l-xl">
        <div className={"w-[12rem] mx-auto"}>
          <img src={img} alt="" />
        </div>
      </div>
      <div className="col-span-2 bg-primary rounded-r-xl z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
