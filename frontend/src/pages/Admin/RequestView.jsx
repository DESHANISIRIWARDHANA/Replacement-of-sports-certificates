import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";

function RequestView() {
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();
  const { request_id } = useParams();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/certificates/request/${request_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust the token retrieval as needed
            },
          }
        );
        setRequest(response.data.request);
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };

    fetchRequest();
  }, [request_id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active Now":
      case "Active Today":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const handleAccept = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/approve/${request_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequest((prevRequest) => ({
        ...prevRequest,
        status: "approved",
      }));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/reject/${request_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequest((prevRequest) => ({
        ...prevRequest,
        status: "rejected",
      }));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/certificates/request/${request_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/admin/requestsAdmin");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  if (!request) {
    return <div>Loading...</div>;
  }

  const getMatchingPercentageColor = (percentage) => {
    return percentage >= 80 ? "text-green-500" : "text-red-500";
  };

  const getPredictionColor = (prediction) => {
    return prediction === "sports" ? "text-green-500" : "text-red-500";
  };

  const certificateIdColor = (certificateId) => {
    return certificateId === null ? "text-red-500" : "text-green-500";
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-20">
      <SideBar />
      {/* Main Content */}
      <div className="bg-[#EDF6F7] flex-1 p-8">
        <div className="bg-white flex-1 overflow-auto rounded-lg shadow-lg">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
              <h1 className="text-2xl font-bold">Request Details</h1>
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
            <div className="bg-[#EDF6F7] rounded-lg p-6 flex items-center justify-between shadow-md">
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
            </div>
          </div>

          {/* Request Details */}
          <div className="px-8 pb-8">
            <div className="bg-[#EDF6F7] rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Request Details</h2>
                <div className="flex gap-2">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={handleReject}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(request.status === "rejected" ||
                    request.status === "approved") && (
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <h3
                  className={`text-2xl font-bold ${getMatchingPercentageColor(
                    request.matchingPercentage
                  )}`}
                >
                  Matching Percentage: {request.matchingPercentage}%
                </h3>
              </div>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Full Name:</p>
                    <p>{request.full_name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>{request.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Reason:</p>
                    <p>{request.reason}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Request ID:</p>
                    <p>{request.request_id}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Status:</p>
                    <p className={getStatusColor(request.status)}>
                      {request.status}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Prediction:</p>
                    <p className={getPredictionColor(request.prediction)}>
                      {request.prediction}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">User ID:</p>
                    <p>{request.user_id}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p>{request.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Certificate ID:</p>
                    <p className={certificateIdColor(request_id)}>
                      {request.certificate_id}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Certificate Type:</p>
                    <p>{request.certificate_type}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Created At:</p>
                    <p>{new Date(request.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Date Issued:</p>
                    <p>{new Date(request.date_issued).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Date of Birth:</p>
                    <p>{new Date(request.dob).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Event Name:</p>
                    <p>{request.event_name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Faculty Name:</p>
                    <p>{request.faculty_name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone Number:</p>
                    <p>{request.phone_number}</p>
                  </div>
                  <div>
                    <p className="font-semibold">NIC Number:</p>
                    <p>{request.nic}</p>
                  </div>
                  <div>
                    <p className="font-semibold">NIC URL:</p>
                    <a
                      href={request.nic_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View NIC
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold">Old Document URL:</p>
                    <a
                      href={request.old_document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Old Document
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestView;
