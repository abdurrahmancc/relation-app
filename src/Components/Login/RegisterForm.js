import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLock, FaUser } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Loading from "../share/Loading";
import useToken from "../../Hooks/useToken";
import auth from "../../Hooks/Firebase";
import axiosPrivet from "../../Hooks/axiosPrivet";

const RegisterForm = () => {
  const [checkBoxToggle, setCheckBoxToggle] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [matchingPass, setMatchingPass] = useState("");
  const [user, loading] = useAuthState(auth);
  const [tokenCreate, setTokenCreate] = useState({});
  const [createUserWithEmailAndPassword, cUser, cLoading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [token, tokenLoading, setTokenLoading] = useToken(user || cUser);
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // if (!token && isCreateUser) {
  //   window.location.reload();
  // }

  const onSubmit = async (data) => {
    const email = data.email;
    const confirmPassword = data.confirmPassword;
    const password = data.password;
    const displayName = data.name;
    if (password !== confirmPassword) {
      setMatchingPass("Password does not match");
      return;
    }
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName });
    toast.success("check email and please verify");
    setIsCreateUser(true);
  };

  useEffect(() => {
    if (token) {
      // console.log(token);
      navigate(from, { replace: true });
    }
  }, [token]);

  if (updating || loading || cLoading) {
    return <Loading />;
  }

  return (
    <div className="hero h-full">
      <div className="hero-content w-full flex-col">
        {/* logo */}
        <div className="">
          <Link to={"/"} className={"flex justify-center"}>
            {" "}
            <img className="w-1/6" src={logo} alt="" />
          </Link>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm ">
          <div className="card-body p-0 text-accent">
            <h3 className="text-center text-2xl font-bold text-neutral">Create your an account</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mt-10">
                <label className="label relative pb-0">
                  <span className="absolute top-6 left-2 border-r  border-gray-400 pr-2 text-base-300">
                    <FaUser />
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="input border-black  bg-accent text-base-300 input-bordered pl-10"
                  {...register("name", {
                    required: { value: true, message: "Name is require" },
                    pattern: {
                      value: /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
                      message: "Provide a valid name",
                    },
                  })}
                />
                {errors.name?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.name?.message}
                  </span>
                )}
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-2">
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
              <div className="form-control mt-2">
                <label className="label relative pb-0">
                  <div>
                    <div className="absolute top-6 left-2 border-r  text-base-300 border-gray-400 pr-2">
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
              </div>
              <div className="form-control mt-2">
                <label className="label relative pb-0">
                  <div>
                    <div className="absolute top-6 left-2 border-r  text-base-300 border-gray-400 pr-2">
                      <FaLock />
                    </div>
                    <div
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="text-lg absolute right-3 top-6 text-base-300"
                    >
                      <AiFillEyeInvisible className={`${showConfirmPass || "hidden"} `} />{" "}
                      <AiFillEye className={`${showConfirmPass && "hidden"} `} />
                    </div>
                  </div>
                </label>
                <input
                  type={`${showConfirmPass ? "text" : "password"}`}
                  placeholder="confirm password"
                  className="input border-black  bg-accent text-base-300 input-bordered pl-10"
                  {...register("confirmPassword", {
                    required: { value: true, message: "Confirm Password is require" },
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                      message:
                        "must be one uppercase, one lowercase  letters, one special character, one digit, and a total length of 8",
                    },
                  })}
                />
                {errors.confirmPassword?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
                {errors.confirmPassword?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-5">
                  <input
                    onClick={() => setCheckBoxToggle(!checkBoxToggle)}
                    type="checkbox"
                    checked={`${checkBoxToggle ? "checked" : ""}`}
                    className="checkbox-xs "
                  />
                  <span className="label-text text-neutral">Accept Terms & Condition</span>
                </label>
              </div>
              {matchingPass && <span className="text-red-500 leb">{matchingPass}</span>}
              {error && <span className="text-red-500 leb">{error?.message}</span>}
              {updatingError && <span className="text-red-500 leb">{updatingError?.message}</span>}

              <div className="form-control mt-4 ">
                <button
                  type="submit"
                  disabled={!checkBoxToggle}
                  className="btn text-neutral border-none  bg-primary-gradient"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="mx-auto text-base-300 mt-10">or</div>
          <div className="pt-4">
            <p className="text-center text-lg text-base-300">
              Already have an account?
              <Link to={"/login"} className="text-success pl-2 underline cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
