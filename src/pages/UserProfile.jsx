import { height } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditProfile from "./../components/EditProfile";
import UserPictures from "./../components/UserPictures";
import Button from "@mui/material/Button";
import "./UserProfile/UserProfile.css";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../utils/consts";

const UserProfile = () => {
  const { username } = useParams();
  const [userToDisplay, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (username) {
      axios
        .get(`${API_URL}/api/user?username=${username}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          const user = res.data[0];
          setUser(user);
        });
    }
  }, [username, token]);

  // users profile
  if (!userToDisplay) return <div>No profile</div>;
  return (
    <div>
      <section className="user">
        {userToDisplay.avatar && (
          <img
            className="avatar"
            src={userToDisplay.avatar}
            alt={`profile ${userToDisplay.username}`}
          />
        )}
        <ul className="userInfos">
          <li className="username">{userToDisplay.username}</li>
          <li className="role">{userToDisplay.role}</li>
          <li>{userToDisplay.email}</li>
          <li>{userToDisplay._id}</li>
        </ul>
      </section>

      <Button variant="outlined" onClick={() => setShowForm(!showForm)}>
        Edit profile
      </Button>
      {showForm && <EditProfile />}
      <UserPictures id={userToDisplay._id} />
    </div>
  );
};

export default UserProfile;
