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
import TheCreatorController from "../../../Controllers/TheCreatorController/TheCreatorController";

const SearchUserProfilePage = () => {
  const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const suspendUserController = new SuspendUserController();
  const [editingIndex, setEditingIndex] = useState(null);

  const [currentUserProfiles, setCurrentUserProfiles] = useState([]);
  const [userProfileForEdit, setUserProfileForEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const theCreatorController = new TheCreatorController();
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const creatorController = new TheCreatorController();
      const profiles = await creatorController.fetchUserProfiles();
      setCurrentUserProfiles(profiles);
    };

    fetchProfiles();
  }, [refreshData]);

  const handleSuspendUser = async (profileName) => {
    try {
      await suspendUserController.suspendUserProfile(profileName);
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

  const handleReActivateUser = async (profileName) => {
    try {
      await suspendUserController.reactivateUserProfile(profileName);
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
    const searchResults = currentUserProfiles.filter((userProfile) =>
      Object.values(userProfile).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setRefreshData((prevState) => !prevState);
    setFilteredUserProfiles(searchResults);
    console.log(searchResults);
  };

  const handleEditUser = () => {
    setIsEditing(true);
  };

  const handleEdited = async (oldName) => {
    console.log("Edited");
    console.log(editedName);

    try {
      // Update the user profile name
      await theCreatorController.updateUserProfileName(oldName, editedName);
      setRefreshData((prevState) => !prevState);
    } catch (error) {
      console.error("Error updating user profile name:", error);
    }

    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  console.log(currentUserProfiles);
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="ml-10 mr-5">
        <div class="pb-4 ml-10 bg-white dark:bg-gray-900">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1 flex">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for User Profiles..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="ml-2">
              <button
                onClick={handleSearch}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="ml-10 mr-5">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Found User Profiles
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUserProfiles.map((userProfile, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${index}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEdited(userProfile.name);
                            }
                          }}
                        />
                      ) : (
                        userProfile.name
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            userProfile.isSuspended
                              ? "bg-red-500"
                              : "bg-green-500"
                          } me-2`}
                        ></div>{" "}
                        {userProfile.isSuspended ? "Suspended" : "Active"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-4">
                        {/*Edit button*/}
                        <button
                          onClick={() => {
                            setUserProfileForEdit(userProfile);
                            setEditingIndex(index);
                            (editingIndex === index
                              ? handleSave
                              : handleEditUser)();
                          }}
                          className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="inline-block text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => handleSuspendUser(userProfile.name)}
                          disabled={
                            userProfile.isSuspended &&
                            userProfile.isSuspended === true
                          }
                        >
                          Suspend
                        </button>

                        <button
                          type="button"
                          className="inline-block text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                          onClick={() => handleReActivateUser(userProfile.name)}
                          disabled={
                            userProfile.isSuspended &&
                            !userProfile.isSuspended === true
                          }
                        >
                          Re-Activate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserProfilePage;
