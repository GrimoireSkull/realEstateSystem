import React, { useEffect, useState } from "react";

//import "../../../Styles/adminSuspendUserAccount.css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Header from "../../../Components/Header";
import CreateUserPic from "../../../Assets/adminPhotos/CreateUser.png";
import ViewUserPic from "../../../Assets/adminPhotos/ViewUser.jpg";
import SearchUserPic from "../../../Assets/adminPhotos/SearchUser.png";
import SuspendUserPic from "../../../Assets/adminPhotos/suspendUser.jpeg";
import UpdateUserPic from "../../../Assets/adminPhotos/UpdateUser.png";

import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AccountPic from "../../../Assets/adminPhotos/Account.jpg";
import AdminProfile from "../../../Assets/adminPhotos/Profile.png";
import { Create } from "@mui/icons-material";

const SuspendUserProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedUser, setSelectedUser] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    role: "Admin",
  });
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Account 1" },
    { id: 2, name: "Account 2" },
    { id: 3, name: "Account 3" },
    // Add more accounts as needed
  ]);
  const [isSuspended, setIsSuspended] = useState(false);

  // Function to handle suspend user
  const handleSuspendUser = () => {};

  // Function to handle select user
  const handleSelectUser = (event) => {};

  const handleSuspend = () => {};

  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <div>Admin user account SUSPEND page</div>
      <div className="user-profile">
        <h1 className="title">{userProfile.name}</h1>
        <p className="role">{userProfile.role}</p>
        <h2 className="accounts-title">Accounts</h2>
        <ul className="accounts-list">
          {accounts.map((account) => (
            <li key={account.id} className="account-item">
              {account && account.name}
            </li>
          ))}
        </ul>
        <button className="suspend-button" onClick={handleSuspend}>
          Suspend User Profile
        </button>
        {isSuspended && (
          <p className="suspended-message">User Profile Suspended</p>
        )}
      </div>
    </div>
  );
};

export default SuspendUserProfilePage;
