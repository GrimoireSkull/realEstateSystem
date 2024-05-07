import React from "react";
import LogoutBtn from "../../Utils/logoutBtn";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import avatar from "../../Assets/profile.png";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SystemAdminHomePage = () => {
  const { currentUser } = useContext(AuthContext);
  /* const userType = currentUser ? currentUser.userType : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (userType !== "admin") {
      navigate("..");
    }
  }, [userType, navigate]); */

  const customProfilePic = currentUser ? currentUser.profilePic : null;

  return (
    <>
      <div>BSystem Admin Home Page</div>
      <div>Welcome, {currentUser ? currentUser.username : ""}</div>
      {customProfilePic ? (
        <Avatar alt="Profile Picture" src={customProfilePic} />
      ) : (
        <Avatar alt="Profile Picture" src={avatar} />
      )}
      <div></div>
      <div>
        <LogoutBtn />
      </div>
    </>
  );
};

export default SystemAdminHomePage;