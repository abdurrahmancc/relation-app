import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import axiosPrivet from "../../Hooks/axiosPrivet";
import auth from "../../Hooks/Firebase";
import Loading from "../share/Loading";

const UserDetails = ({ selectUser, setTogglePage }) => {
  const [user, loading] = useAuthState(auth);
  const [myDetails, setMyDetails] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axiosPrivet.get(`user/me/${user.email}`);
      setMyDetails(data);
    })();
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-20">
      <div className="mx-32 flex flex-col gap-5 mt-10">
        {!selectUser.name && (
          <h2 className="text-center text-3xl text-neutral font-semibold mb-10">Your Details</h2>
        )}
        <p className="text-neutral text-xl">
          Name: {selectUser?.name ? selectUser?.name : myDetails?.name}
        </p>
        <p className="text-neutral text-xl">
          email: {selectUser?.email ? selectUser?.email : myDetails?.email}
        </p>
        <p className="text-neutral text-xl">
          joined:{" "}
          {selectUser?.date
            ? selectUser?.date && selectUser?.date.split("T")[0]
            : myDetails?.date && myDetails?.date.split("T")[0]}
        </p>
        <p className="text-neutral text-xl">
          Friends:{" "}
          {selectUser?.friends ? (
            selectUser?.friends ? (
              <span
                onClick={() => setTogglePage("myAllFriends", selectUser?.friends)}
                className={"cursor-pointer text-blue-600"}
              >
                see all ({selectUser?.friends.length})
              </span>
            ) : (
              "None"
            )
          ) : myDetails?.friends ? (
            <span
              onClick={() => setTogglePage("allFriends", " ")}
              className={"cursor-pointer text-blue-600"}
            >
              see all ({myDetails?.friends.length})
            </span>
          ) : (
            "None"
          )}
        </p>
        {!selectUser.name && (
          <p className="text-neutral text-xl">
            Friends Request:{" "}
            {myDetails?.friendsRequest ? (
              <span
                onClick={() => setTogglePage("friendsRequest", " ")}
                className={"cursor-pointer text-blue-600"}
              >
                see all ({myDetails?.friendsRequest.length})
              </span>
            ) : (
              "None"
            )}
          </p>
        )}
        {!selectUser.name && (
          <p className="text-neutral text-xl">
            Send Requests:{" "}
            {myDetails?.sendRequest ? (
              <span
                onClick={() => setTogglePage("friendsRequest", " ")}
                className={"cursor-pointer text-blue-600"}
              >
                see all ({myDetails?.sendRequest.length})
              </span>
            ) : (
              "None"
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
