import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import auth from "../../Hooks/Firebase";
import Loading from "../share/Loading";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import axiosPrivet from "../../Hooks/axiosPrivet";
import toast from "react-hot-toast";
import UsersRow from "./UsersRow";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate("");

  const handleCreateUser = () => {
    signOut(auth);
    navigate("/register");
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosPrivet.get("user/all-users");
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message, { id: "usersError" });
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-primary h-[800px] ">
      <div>
        <h1 className="text-2xl font-bold text-neutral text-center pt-14">Manage Users</h1>
        <div className="flex justify-center">
          <span onClick={handleCreateUser}>
            <IoIosAddCircle className="text-5xl text-neutral my-5" />
          </span>
        </div>
      </div>
      <div className="mx-20">
        <div class="overflow-x-auto">
          <table class="table bg-none w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-none ">
              {/* <!-- row 1 --> */}
              {users && users.map((user) => <UsersRow key={user?._id} user={user} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
