import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import user1 from "../../assets/images/user1.png";
import axiosPrivet from "../../Hooks/axiosPrivet";
import Loading from "../share/Loading";

const MyFriends = ({ showFriends }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        if (showFriends.length) {
          setLoading(true);
          const { data } = await axiosPrivet.post(`user/show-friends`, {
            friends: showFriends,
          });
          setFriends(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message, { id: "friendError" });
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-20 ">
      <div className="mx-32 flex flex-col gap-5 mt-10">
        <h2 className="text-center text-3xl text-neutral font-semibold mb-10">All Friends</h2>
      </div>
      <div className="mx-20 border border-success">
        {friends &&
          friends.map((friend) => (
            <div
              key={friend?._id}
              className="flex gap-3 items-center cursor-pointer pl-2 relative shadow-2xl hover:bg-[#1f222e] py-5 mb-1"
            >
              <div class="avatar">
                <div class="w-10 ml-5 rounded-full ring ring-success ring-offset-base-100 ring-offset-1">
                  <img src={user1} />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-neutral text-xs font-semibold">{friend?.name}</span>
                <span className="text-neutral text-xs font-semibold">{friend?.email}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyFriends;
