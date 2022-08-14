import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import axiosPrivet from "../../Hooks/axiosPrivet";
import auth from "../../Hooks/Firebase";
import Loading from "../share/Loading";
import AllFriends from "./AllFriends";
import FriendRequest from "./FriendRequest";
import MyFriends from "./MyFriends";
import Search from "./Search";
import User from "./User";
import UserDetails from "./UserDetails";

const Inbox = () => {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  const [user, loading] = useAuthState(auth);
  const [detailsPage, setDetailsPage] = useState(true);
  const [friendRequestPages, setFriendRequestPages] = useState(false);
  const [friendsPages, setFriendsPages] = useState(false);
  const [select, setSelect] = useState(false);
  const [allFriends, setAllFriends] = useState(false);
  const [showFriends, setShowFriends] = useState([]);
  const [selectFriends, setSelectFriends] = useState([]);
  const [relationFriend, setRelationFriend] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const handleTogglePages = (data, info) => {
    if (data === "friendsRequest") {
      setDetailsPage(false);
      setFriendsPages(false);
      setAllFriends(false);
      setFriendRequestPages(true);
    } else if (data === "allFriends") {
      setDetailsPage(false);
      setFriendRequestPages(false);
      setAllFriends(false);
      setFriendsPages(true);
    } else if (data === "myDetails") {
      setFriendsPages(false);
      setFriendRequestPages(false);
      setAllFriends(false);
      setDetailsPage(true);
    } else if (data === "myAllFriends") {
      setFriendsPages(false);
      setFriendRequestPages(false);
      setDetailsPage(false);
      setAllFriends(true);
      setShowFriends(info);
    } else if (data === "friendList") {
      setFriendsPages(false);
      setFriendRequestPages(false);
      setDetailsPage(true);
      setAllFriends(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosPrivet.get("user/users");
        const users = data.filter((rUser) => rUser.email !== user.email);
        setUsers(users);
        // console.log(data);
      } catch (error) {
        toast.error(error.message, { id: "usersError" });
      }
    })();
  }, [refetch]);

  if (loading) {
    return <Loading />;
  }

  //findFriendOfFriend
  const findFriendOfFriend = async () => {
    try {
      const { data } = await axiosPrivet.post("user/relation", { friends: selectFriends });
      const friends = data[0].friends;
      const { data: result } = await axiosPrivet.post("user/relation", { friends: friends });
      // console.log(result);
      if (result.length !== 0) {
        const { data: existFriends } = await axiosPrivet.post("user/relation", {
          friends: result[0].friends,
        });
        if (existFriends.length !== 0) {
          // console.log(existFriends);
          if (existFriends) {
            const isExist = existFriends.find((friends) =>
              friends.friends.map((friend) => friend === selectFriends[1])
            );

            if (isExist.name) {
              setRelationFriend([data[0].name, result[0].name, isExist.name, data[1].name]);
            }
          }
        }
      } else {
        toast.error("No Relation", { id: "relationError" });
      }
    } catch (error) {
      toast.error(error.message, { id: "searchError" });
    }
  };

  //handleSearchRelation
  const handleSearchRelation = async () => {
    try {
      const { data } = await axiosPrivet.post("user/relation", { friends: selectFriends });
      const getArraysIntersection = (a1, a2) => {
        return a1.filter(function (n) {
          return a2.indexOf(n) !== -1;
        });
      };
      const intersectingColors = getArraysIntersection(data[0].friends, data[1].friends);
      const intersectingColor = getArraysIntersection(data[1].friends, data[0].friends);
      // console.log("A", intersectingColors, "B", intersectingColor);
      if (intersectingColors.length !== 0) {
        const { data: friendName } = await axiosPrivet.get(
          `user/search-name/${intersectingColors[0]}`
        );
        // const result = [data[0].name, friendName.name, data[1].name];
        setRelationFriend([data[0].name, friendName.name, data[1].name]);
      } else if (intersectingColor.length !== 0) {
        const { data: friendName } = await axiosPrivet.get(
          `user/search-name/${intersectingColors[0]}`
        );
        // const result = [data[0].name, friendName.name, data[1].name];
        setRelationFriend([data[1].name, friendName.name, data[0].name]);
      } else {
        findFriendOfFriend();
      }
    } catch (error) {
      toast.error(error.message, { id: "relationError" });
    }
  };

  //handleRelation
  const handleRelation = async () => {
    try {
      if (selectFriends.length !== 2) {
        toast.error("please select two users", { id: "select" });
        return;
      }
      const { data } = await axiosPrivet.post("user/relation", { friends: selectFriends });
      console.log(data);
      if (data) {
        const isFriend1 = data[1].friends.find((friend) => friend === selectFriends[0]);
        const isFriend2 = data[1].friends.find((friend) => friend === selectFriends[1]);
        // console.log(isFriend2);
        if (isFriend1 || isFriend2) {
          setRelationFriend([data[0].name, data[1].name]);
          toast.success(`${data[0].name} and ${data[1].name} there are friend`);
        } else {
          handleSearchRelation();
        }
      }
    } catch (error) {
      toast.error(error.message, { id: "relationError" });
    }
  };
  return (
    <div className="grid grid-cols-4 relative">
      <div className="col-span-1 bg-secondary h-[800px] rounded-l-xl">
        <Search />
        <div onClick={() => handleTogglePages("friendList", " ")}>
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                user={user}
                setRefetch={setRefetch}
                setSelectUser={setSelectUser}
                select={select}
                setSelectFriends={setSelectFriends}
                selectFriends={selectFriends}
              />
            ))}
        </div>
        <div className="flex gap-2 absolute bottom-5 mx-5">
          <button
            onClick={() => setSelect(!select)}
            className="btn btn-success rounded-none max-w-[100px]  w-full"
          >
            select
          </button>
          <label
            for="relationModal"
            onClick={() => handleRelation()}
            disabled={selectFriends.length !== 2}
            class="btn modal-button btn-success rounded-none max-w-[100px] disabled-btn w-full"
          >
            Relation
          </label>
        </div>
      </div>
      <div className="col-span-3 bg-primary rounded-r-xl">
        <div className="py-5 bg-accent rounded-tr-xl">
          <h1
            onClick={() => handleTogglePages("myDetails", " ")}
            className="text-center cursor-pointer text-neutral text-2xl font-semibold "
          >
            Details
          </h1>
        </div>
        {detailsPage && <UserDetails selectUser={selectUser} setTogglePage={handleTogglePages} />}
        {friendRequestPages && <FriendRequest />}
        {friendsPages && <AllFriends />}
        {allFriends && <MyFriends showFriends={showFriends} />}
      </div>
      {relationFriend && (
        <>
          {/* // <!-- Put this part before </body> tag --> */}
          <input type="checkbox" id="relationModal" class="modal-toggle" />
          <label for="relationModal" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
              <h3 class="text-lg font-bold text-center">Relation</h3>
              <div class=" text-sm breadcrumbs flex justify-center ">
                <ul>
                  {relationFriend.map((friend, index) => (
                    <li key={index}>{friend}</li>
                  ))}
                </ul>
              </div>
            </label>
          </label>
        </>
      )}
    </div>
  );
};

export default Inbox;
