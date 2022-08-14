import React from "react";
import RegisterForm from "./RegisterForm";
import img from "../../assets/images/illustration.png";

const Register = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 bg-accent h-[800px] flex items-center rounded-l-xl">
        <div className={"w-[12rem] mx-auto"}>
          <img src={img} alt="" />
        </div>
      </div>
      <div className="col-span-2 bg-primary rounded-r-xl">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
