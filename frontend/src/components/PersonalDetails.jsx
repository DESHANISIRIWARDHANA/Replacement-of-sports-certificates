import { useState, useEffect } from "react";
import axios from "axios";
import { Bell, ChevronLeft } from "lucide-react";
import profileSample from "../assets/images/profileSample.jpg";

function PersonalDetails() {
  const [profile, setProfile] = useState({
    fullName: "",
    contactNumber: "",
    adminId: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  useEffect(() => {
    // Fetch profile data from the backend
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setProfile({
          fullName: data.full_name,
          contactNumber: data.contact_number,
          adminId: data.uid,
          email: data.email,
          profilePicture: data.profile_picture_url || profileSample,
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="bg-[#EDF6F7] flex-1 p-4 md:p-8">
        <div className="bg-white flex-1 overflow-auto rounded-lg">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 md:px-8 py-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h1 className="text-lg md:text-xl font-semibold">My Profile</h1>
              </div>
              {/* <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {profile.fullName}
                  </span>
                </div>
              </div> */}
            </div>
          </header>

          {/* Main Content */}
          <div className="p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Section */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      className="w-full p-2 rounded-md bg-[#F8FAFC] border border-gray-200"
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={profile.contactNumber}
                      className="w-full p-2 rounded-md bg-[#F8FAFC] border border-gray-200"
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">User ID</label>
                    <input
                      type="text"
                      value={profile.adminId}
                      className="w-full p-2 rounded-md bg-[#F8FAFC] border border-gray-200"
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      className="w-full p-2 rounded-md bg-[#F8FAFC] border border-gray-200"
                      readOnly
                    />
                  </div>

                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <input
                      type="password"
                      value={profile.password}
                      className="w-full p-2 rounded-md bg-[#F8FAFC] border border-gray-200"
                      readOnly
                    />
                  </div> */}

                  <button className="w-32 py-2 px-4 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-md transition-colors">
                    Save
                  </button>
                </div>
              </div>

              {/* Profile Picture Section */}
              <div className="lg:col-span-1 bg-[#EDF6F7] rounded-lg shadow p-4 md:mb-0">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-[#B9D8DB] outline-4 outline-[#67CDCD] outline-offset-2 mt-4 mb-4">
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="w-full py-2 px-4 bg-[#67CDCD] hover:bg-[#7fcad3] text-black rounded-md transition-colors mb-4">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
