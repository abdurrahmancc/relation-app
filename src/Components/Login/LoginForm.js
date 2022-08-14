import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLock, FaUser } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../Hooks/Firebase";
import useToken from "../../Hooks/useToken";
import Loading from "../share/Loading";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, eUser, eLoading, eError] = useSignInWithEmailAndPassword(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [token] = useToken(user || gUser || eUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (loading || eLoading || gLoading) {
    return <Loading />;
  }
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(data);
    await signInWithEmailAndPassword(email, password);
  };

  if (token) {
    navigate(from, { replace: true });
  }

  // console.log(token)

  return (
    <div className="hero h-full ">
      <div className="hero-content w-full flex-col">
        {/* logo */}
        <div className="">
          <Link to={"/"} className={"flex justify-center"}>
            {" "}
            <img className="w-1/6" src={logo} alt="" />
          </Link>
        </div>
        {/* login form start */}
        <div className="card flex-shrink-0 w-full max-w-sm  bg-none">
          <div className="card-body p-0 text-accent">
            <h3 className="text-center text-2xl font-bold text-neutral">Login To Your Account</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mt-10">
                <label className="label relative pb-0">
                  <span className="absolute top-6 left-2 border-r  border-gray-400 pr-2 text-base-300">
                    <FaUser />
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input border-black  bg-accent text-base-300 input-bordered pl-10"
                  {...register("email", {
                    required: { value: true, message: "Email is require" },
                    pattern: {
                      value:
                        /^[\w-']+(\.[\w-']+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
                      message: "Provide a valid email",
                    },
                  })}
                />
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.email?.message}
                  </span>
                )}
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-8">
                <label className="label relative pb-0">
                  <div>
                    <div className="absolute top-6 left-2 border-r border-gray-400 pr-2 text-base-300">
                      <FaLock />
                    </div>
                    <div
                      onClick={() => setShowPass(!showPass)}
                      className="text-lg absolute right-3 top-6 text-base-300"
                    >
                      <AiFillEyeInvisible className={`${showPass || "hidden"} `} />{" "}
                      <AiFillEye className={`${showPass && "hidden"} `} />
                    </div>
                  </div>
                </label>
                <input
                  type={`${showPass ? "text" : "password"}`}
                  placeholder="password"
                  className="input border-black  bg-accent text-base-300 input-bordered pl-10"
                  {...register("password", {
                    required: { value: true, message: "password is require" },
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                      message:
                        "must be one uppercase, one lowercase  letters, one special character, one digit, and a total length of 8",
                    },
                  })}
                />
                {errors.password?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-accent hover:text-primary"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              {eError && <span className="text-red-500 label-text-alt">{eError?.message}</span>}
              <div className="form-control mt-4 ">
                <button
                  type="submit"
                  //   disabled={!checkBoxToggle}
                  className="btn text-neutral border-none rounded-[12px]  bg-primary-gradient"
                >
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex gap-5 text-lg mt-20">
          <Link to={"/register"} className=" pl-2 underline text-neutral cursor-pointer">
            Create an account
          </Link>
          <span className="text-neutral">or</span>
          <span
            onClick={() => signInWithGoogle()}
            className=" text-neutral cursor-pointer underline"
          >
            Continue with google
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
