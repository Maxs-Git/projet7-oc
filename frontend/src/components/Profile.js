import React from "react";
import { useSelector } from "react-redux";
import { userSlice } from "../app/features/user";

function Profile() {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <h1>profile page</h1>
      <p>Name: {user.name}</p>
      <p>email:{user.email}</p>
      <p></p>
    </div>
  );
}

// export const {  } = userSlice.actions;

export default Profile;
