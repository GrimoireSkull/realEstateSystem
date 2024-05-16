import React, { useEffect, useState } from "react";

import "../../../Styles/adminSearchUserAccount.css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Header from "../../../Components/Header";
import CreateUserPic from "../../../Assets/adminPhotos/CreateUser.png";
import ViewUserPic from "../../../Assets/adminPhotos/ViewUser.jpg";
import SearchUserPic from "../../../Assets/adminPhotos/SearchUser.png";
import SuspendUserPic from "../../../Assets/adminPhotos/suspendUser.jpeg";
import UpdateUserPic from "../../../Assets/adminPhotos/UpdateUser.png";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AccountPic from "../../../Assets/adminPhotos/Account.jpg";
import AdminProfile from "../../../Assets/adminPhotos/Profile.png";
import { Create } from "@mui/icons-material";
import ViewAllUserDataController from "../../../Controllers/ViewAllUserDataController";
import avatar from "../../../Assets/profile.png";
import SuspendUserController from "../../../Controllers/SuspendUserController";

const SearchUserAccountPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const suspendUserController = new SuspendUserController();
  const [refreshData, setRefreshData] = useState(false);

  const handleSuspendUser = async (userId) => {
    try {
      await suspendUserController.suspendUser(userId);
      setRefreshData((prevState) => !prevState);
      Swal.fire({
        icon: "success",
        title: "User suspended successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to suspend user",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error suspending user:", error);
    }
  };
  const handleReActivateUser = async (userId) => {
    try {
      await suspendUserController.reactivateUser(userId);
      setRefreshData((prevState) => !prevState);
      Swal.fire({
        icon: "success",
        title: "User re-activated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to re-activate user",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error re-activating user:", error);
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchTerm);
    const searchResults = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setRefreshData((prevState) => !prevState);
    setFilteredUsers(searchResults);
    console.log(searchResults);
  };

  const viewAllUserDataController = new ViewAllUserDataController();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await viewAllUserDataController.fetchAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [refreshData]);

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>Admin user account Search page</div>
      <div>
        <h2>Search Users</h2>
        <div className="searchForm">
          <form onSubmit={handleSubmit}>
            <label>ID:</label>
            <input
              type="text"
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
            />
            <label>Name:</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <label>Role:</label>
            <input
              type="text"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <button id="search" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="displayResult">
          {searchResults.length > 0 ? (
            <div className="searchResults">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link to="/updateAccount">
                          <button>Update</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No results found.</div>
          )}
        </div>

        <div className="buttons-container">
          <form method="post" name="logout">
            <button className="logOutButtonSearch" name="logout">
              Logout
            </button>
          </form>
          <Link to={"/systemAdminHomePage"}>
            <button className="back-button-search">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchUserAccountPage;