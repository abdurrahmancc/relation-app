import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import user1 from "../../assets/images/user1.png";
import axiosPrivet from "../../Hooks/axiosPrivet";
import auth from "../../Hooks/Firebase";
import Loading from "../share/Loading";

const RequestUsers = ({ user, refetch }) => {
  const [userM, loading] = useAuthState(auth);

  const handleAcceptRequest = async () => {
    try {
      const { data } = await axiosPrivet.put(`user/accept-request/${userM?.email}`, {
        request: user?.email,
      });
      refetch();
    } catch (error) {
      toast.error(error.message, { id: "friendRequestError" });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex gap-3 items-center cursor-pointer pl-2 relative shadow-2xl hover:bg-[#1f222e] py-5 mb-1">
        <div class="form-control">
          <label class="label cursor-pointer">
            <input
              type="checkbox"
              class="checkbox checkbox-success rounded-none w-4 h-4 border-white"
            />
          </label>
        </div>
        <div class="avatar">
          <div class="w-10 rounded-full ring ring-success ring-offset-base-100 ring-offset-1">
            <img src={user1} />
          </div>
        </div>
        <div className=" flex gap-10">
          <span className="text-neutral text-xs font-semibold">{user?.name}</span>
          <span className="text-neutral text-xs font-semibold">{user?.email}</span>
        </div>
        <div className="">
          <span className="text-neutral text-lg font-semibold absolute right-2 top-6">
            <button onClick={handleAcceptRequest} className="btn btn-success btn-sm capitalize">
              Accept
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default RequestUsers;
