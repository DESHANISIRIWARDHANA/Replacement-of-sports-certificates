import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import SideBar from "../../components/SideBar";
import { NavLink } from "react-router-dom";

function RequestView() {
  const [requests, setRequests] = useState([]);
  const [currentView, setCurrentView] = useState("pending");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/requests",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust the token retrieval as needed
            },
          }
        );
        setRequests(response.data.requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active Now":
      case "Active Today":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredRequests = requests.filter(
    (request) => request.status === currentView
  );

  return (
    <div className="flex h-screen bg-gray-100 pt-20">
      {/* <SideBar /> */}
      {/* Main Content */}
      <div className="bg-[#EDF6F7] flex-1 p-8">
        <div className="bg-white flex-1 overflow-auto rounded-lg">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
              <h1 className="text-2xl font-bold">Requests</h1>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Bell size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Chanodya</span>
                </div>
              </div>
            </div>
          </header>

          {/* Welcome Section */}
          <div className="p-8">
            <div className="bg-[#EDF6F7] rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Admin"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold">Hello,</h2>
                  <p className="text-xl">Admin name</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    currentView === "pending"
                      ? "bg-[#67CDCD] text-black"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setCurrentView("pending")}
                >
                  Pending
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    currentView === "approved"
                      ? "bg-[#67CDCD] text-black"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setCurrentView("approved")}
                >
                  Approved
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    currentView === "rejected"
                      ? "bg-[#67CDCD] text-black"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setCurrentView("rejected")}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>

          {/* Request Table */}
          <div className="px-8 pb-8">
            <div className="bg-[#EDF6F7] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)}{" "}
                Requests
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Full Name</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">Reason</th>
                      <th className="py-2 px-4 border-b">Request ID</th>
                      <th className="py-2 px-4 border-b">Status</th>
                      <th className="py-2 px-4 border-b">User ID</th>
                      <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center align-middle">
                    {filteredRequests.map((request, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">
                          {request.full_name}
                        </td>
                        <td className="py-2 px-4 border-b">{request.email}</td>
                        <td className="py-2 px-4 border-b">{request.reason}</td>
                        <td className="py-2 px-4 border-b">
                          {request.request_id}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {request.user_id}
                        </td>
                        <td className="py-2 px-4 border-b align-middle">
                          <div className="flex justify-center space-x-2">
                            {currentView === "pending" && (
                              <>
                                {/* <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                  Approve
                                </button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                  Reject
                                </button> */}
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                  View
                                </button>
                              </>
                            )}
                            {currentView === "approved" && (
                              <>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                  View
                                </button>
                                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                  Delete
                                </button>
                              </>
                            )}
                            {currentView === "rejected" && (
                              <>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                  View
                                </button>
                                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                  Delete
                                </button>
                              </>
                            )}
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
      </div>
    </div>
  );
}

export default RequestView;
