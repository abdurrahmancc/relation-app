import React from "react";
import { MdDelete } from "react-icons/md";
import user1 from "../../assets/images/user1.png";

const UsersRow = ({ user }) => {
  return (
    <>
      <tr className="bg-none hover">
        <td>
          <div className="flex gap-3 items-center">
            <div class="avatar">
              <div class="w-10 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL ? user?.photoURL : user1} />
              </div>
            </div>
            <div>
              <span>{user?.displayName}</span>
            </div>
          </div>
        </td>
        <td>{user?.email}</td>
        <td>
          <MdDelete className="text-2xl " />
        </td>
      </tr>
    </>
  );
};

export default UsersRow;
