import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiUserShared2Fill } from "react-icons/ri";
import { BiUserCheck } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { MdDetails } from "react-icons/md";
import user1 from "../../assets/images/user1.png";
import axiosPrivet from "../../Hooks/axiosPrivet";
import auth from "../../Hooks/Firebase";
import Loading from "../share/Loading";
import { useQuery } from "react-query";

const User = ({ user, setSelectUser, select, selectFriends, setSelectFriends, setRefetch }) => {
  const [userM, loading] = useAuthState(auth);
  const [isFriend, setIsFriend] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axiosPrivet.get(`user/isFriend/${user.email}`);
      console.log(data, userM.email);
      if (data?.friends) {
        const existRequest = data?.friends.find((friend) => friend === userM?.email);
        if (existRequest) {
          setIsFriend(true);
          setSending(false);
          setRefetch(true);
          return;
        } else if (data?.friendsRequest) {
          const existRequest = data?.friendsRequest.find((friend) => friend === userM?.email);
          // console.log(existRequest);
          if (existRequest) {
            setSending(true);
            setIsFriend(false);
            setRefetch(true);
            return;
          }
        }
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleAddFriendRequest = async (id) => {
    const currentUser = { email: userM?.email };
    try {
      const { data } = await axiosPrivet.put(`user/friend-request/${id}`, currentUser);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectFriends = (email) => {
    // let friends = { ...selectFriends, [email]: true };
    let friends = [...selectFriends, email];
    console.log(friends);
    setSelectFriends(friends);
  };

  return (
    <>
      <div
        onClick={() => setSelectUser(user)}
        className="flex gap-3 items-center cursor-pointer pl-2 relative shadow-2xl hover:bg-[#1f222e] py-5 mb-1"
      >
        {select && (
          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="checkbox"
                onClick={() => handleSelectFriends(user?.email)}
                class="checkbox checkbox-success rounded-none w-4 h-4 border-white"
              />
            </label>
          </div>
        )}

        <div class="avatar">
          <div class="w-10 rounded-full ring ring-success ring-offset-base-100 ring-offset-1">
            <img src={user1} />
          </div>
        </div>
        <div>
          <span className="text-neutral text-xs font-semibold">{user?.name}</span>
        </div>
        <div className="">
          <span className="text-neutral text-lg font-semibold absolute right-2 top-2">
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className=" m-1">
                <span>
                  <BsThreeDots className="cursor-pointer" />
                </span>
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu border top-10 border-gray-700 rounded-sm shadow bg-accent  w-40"
              >
                <li className="hover:bg-primary">
                  {isFriend && (
                    <div className="">
                      <span>
                        <BiUserCheck className="text-white " />
                      </span>
                      <span className="text-sm">Friends</span>
                    </div>
                  )}
                  {sending && (
                    <div className="">
                      <span>
                        <RiUserShared2Fill className="text-white " />
                      </span>
                      <span className="text-sm">Request Sent</span>
                    </div>
                  )}
                  {sending || isFriend || (
                    <div onClick={() => handleAddFriendRequest(user?._id)} className="">
                      <span>
                        <FiUserPlus className="text-white " />
                      </span>
                      <span className="text-sm">Add Friend</span>
                    </div>
                  )}
                </li>

                <li className="hover:bg-primary">
                  <div className="">
                    <span>
                      <MdDetails className=" text-white " />
                    </span>
                    <span className="text-sm">Details</span>
                  </div>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default User;
