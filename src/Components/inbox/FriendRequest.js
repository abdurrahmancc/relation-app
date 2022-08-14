import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import axiosPrivet from "../../Hooks/axiosPrivet";
import auth from "../../Hooks/Firebase";
import Loading from "../share/Loading";
import RequestUsers from "./RequestUsers";

const FriendRequest = () => {
  const [user, loading] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery("friendsRequest", () =>
    axiosPrivet.get(`user/friends-request/${user.email}`)
  );

  if (loading || isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-20">
      <div className="mx-32 flex flex-col gap-5 mt-10">
        <h2 className="text-center text-3xl text-neutral font-semibold mb-10">
          All Friend Requests
        </h2>
      </div>
      {data?.data.length !== 0 ? (
        data?.data.map((requestUser) => (
          <RequestUsers key={requestUser._id} user={requestUser} refetch={refetch} />
        ))
      ) : (
        <div>
          <p className="text-center mt-20 text-lg font-bold text-neutral">
            Your friends were not found
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
