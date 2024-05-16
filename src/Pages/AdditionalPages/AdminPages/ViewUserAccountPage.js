import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Header from "../../../Components/Header";
import CreateUserPic from "../../../Assets/adminPhotos/CreateUser.png";
import ViewUserPic from "../../../Assets/adminPhotos/ViewUser.jpg";
import SearchUserPic from "../../../Assets/adminPhotos/SearchUser.png";
import SuspendUserPic from "../../../Assets/adminPhotos/suspendUser.jpeg";
import UpdateUserPic from "../../../Assets/adminPhotos/UpdateUser.png";

import { Link, useNavigate } from "react-router-dom";
import AccountPic from "../../../Assets/adminPhotos/Account.jpg";
import AdminProfile from "../../../Assets/adminPhotos/Profile.png";
import ViewAllUserDataController from "../../../Controllers/ViewAllUserDataController";
import avatar from "../../../Assets/profile.png";

const ViewUserAccountPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [users, setUsers] = useState([]);

  const viewAllUserDataController = new ViewAllUserDataController();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await viewAllUserDataController.fetchAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleLogout = (event) => {
    console.log("Logging out...");
  };

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>Admin user account VIEW page</div>
      <div>
        <h2>User Account List</h2>
        <div className="displayAcctResult">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>License ID</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAccounts.map((userAcct, index) => (
                <tr key={index}>
                  <td>{userAcct.User_ID}</td>
                  <td>{userAcct.Name}</td>
                  <td>{userAcct.Email}</td>
                  <td>{userAcct.License_ID}</td>
                  <td>{userAcct.Phone_Number}</td>
                  <td>{userAcct.Role}</td>
                  <td>{userAcct.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttons-container">
          <form method="post" name="logout" onSubmit={handleLogout}>
            <button className="logOutButtonView" type="submit" name="logout">
              Logout
            </button>
          </form>
          <Link to={"/systemAdminHomePage"}>
            <button className="back-button-view">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewUserAccountPage;
