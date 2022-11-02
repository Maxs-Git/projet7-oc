import React from "react";
import { useSelector } from "react-redux";
import { userSlice } from "../app/features/user";
import { logout } from "../app/features/user";
import { useDispatch } from "react-redux";
function Profile() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>profile page</h1>
      <p>Name: {user.name}</p>
      <p>email:{user.email}</p>
      <p></p>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </button>
    </div>
  );
}

// export const {  } = userSlice.actions;

export default Profile;
