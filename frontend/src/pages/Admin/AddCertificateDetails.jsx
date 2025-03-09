import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import SideBar from "../../components/SideBar";
import axios from "axios";

function AddCertificateDetails() {
  const [currentView, setCurrentView] = useState("add");
  const [formData, setFormData] = useState({
    certificate_id: "",
    nic: "",
    name: "",
    meet: "",
    ageGroup: "",
    place: "",
    birthCertNumber: "",
    issuedDate: "",
  });
  const [releasedCertificates, setReleasedCertificates] = useState([]);
  const [validCertificates, setValidCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReleasedCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/certificates",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReleasedCertificates(response.data.certificates);
      } catch (error) {
        console.error("Error fetching released certificates:", error);
      }
    };

    const fetchValidCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/certificates/certificate/valid",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setValidCertificates(response.data.certificates);
      } catch (error) {
        console.error("Error fetching valid certificates:", error);
      }
    };

    if (currentView === "released") {
      fetchReleasedCertificates();
    } else if (currentView === "valid") {
      fetchValidCertificates();
    }
  }, [currentView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/certificates/certificate/valid",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setValidCertificates((prevState) => [...prevState, response.data]);

      console.log("Certificate added successfully:", response.data);
      // Reset form after successful submission
      setFormData({
        certificate_id: "",
        nic: "",
        name: "",
        meet: "",
        ageGroup: "",
        place: "",
        birthCertNumber: "",
        issuedDate: "",
      });
    } catch (error) {
      console.error("Error adding certificate:", error);
    }
  };

  const handleDelete = async (certificateId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/certificates/certificate/${certificateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReleasedCertificates((prevState) =>
        prevState.filter(
          (certificate) => certificate.certificate_id !== certificateId
        )
      );
      console.log("Certificate deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const handleDeleteValid = async (certificateId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/certificates/certificate/valid/${certificateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setValidCertificates((prevState) =>
        prevState.filter(
          (certificate) => certificate.certificate_id_db !== certificateId
        )
      );
      console.log("Certificate valid Details successfully:", response.data);
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const filteredCertificates = validCertificates.filter((certificate) =>
    Object.values(certificate).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-gray-100 mt-15">
      <SideBar />
      {/* Main Content */}
      <div className="bg-[#EDF6F7] flex-1 p-8">
        <div className="bg-white flex-1 overflow-auto rounded-lg">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
              <h1 className="text-2xl font-bold">Admin Certificate Details</h1>
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
                  <span>Admin</span>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                />
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
                    currentView === "add"
                      ? "bg-[#67CDCD] text-black"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setCurrentView("add")}
                >
                  Add
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    currentView === "released"
                      ? "bg-[#67CDCD] text-black"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setCurrentView("released")}
                >
                  Released
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    currentView === "valid"
                      ? "bg-[#67CDCD] text-black"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setCurrentView("valid")}
                >
                  Valid DB
                </button>
              </div>
            </div>
          </div>
          {/* Content Section */}
          <div className="px-8 pb-8">
            {currentView === "add" && (
              <div className="bg-[#EDF6F7] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  Add Certificate Details
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="certificate_id"
                    >
                      Certificate ID
                    </label>
                    <input
                      type="text"
                      id="certificate_id"
                      name="certificate_id"
                      value={formData.certificate_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="nic"
                    >
                      NIC Number
                    </label>
                    <input
                      type="text"
                      id="nic"
                      name="nic"
                      value={formData.nic}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="issuedDate"
                    >
                      Issued Date
                    </label>
                    <input
                      type="date"
                      id="issuedDate"
                      name="issuedDate"
                      value={formData.issuedDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="meet"
                    >
                      Meet
                    </label>
                    <input
                      type="text"
                      id="meet"
                      name="meet"
                      value={formData.meet}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="ageGroup"
                    >
                      Age Group
                    </label>
                    <input
                      type="text"
                      id="ageGroup"
                      name="ageGroup"
                      value={formData.ageGroup}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="place"
                    >
                      Place
                    </label>
                    <input
                      type="text"
                      id="place"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="birthCertNumber"
                    >
                      Birth Certificate Number
                    </label>
                    <input
                      type="text"
                      id="birthCertNumber"
                      name="birthCertNumber"
                      value={formData.birthCertNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#67CDCD] text-black rounded-lg hover:bg-[#7fcad3]"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
            {currentView === "released" && (
              <div className="bg-[#EDF6F7] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  Released Certificates
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Certificate ID</th>
                        <th className="py-2 px-4 border-b">Certificate URL</th>
                        <th className="py-2 px-4 border-b">Created At</th>
                        <th className="py-2 px-4 border-b">Event Name</th>
                        <th className="py-2 px-4 border-b">Full Name</th>
                        <th className="py-2 px-4 border-b">Reason</th>
                        <th className="py-2 px-4 border-b">Request ID</th>
                        <th className="py-2 px-4 border-b">User ID</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                      {releasedCertificates.length > 0 ? (
                        releasedCertificates.map((certificate) => (
                          <tr key={certificate.certificate_id}>
                            <td className="py-2 px-4 border-b">
                              {certificate.certificate_id}
                            </td>
                            <td className="py-2 px-4 border-b">
                              <a
                                href={certificate.certificate_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                View Certificate
                              </a>
                            </td>
                            <td className="py-2 px-4 border-b">
                              {new Date(
                                certificate.created_at
                              ).toLocaleString()}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.event_name}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.full_name}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.reason}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.request_id}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.user_id}
                            </td>
                            <td className="py-2 px-4 border-b">
                              <button
                                className="px-4 py-2 bg-[#fd6060] text-black rounded-lg hover:bg-[#d37f7f]"
                                onClick={() =>
                                  handleDelete(certificate.certificate_id)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="py-2 px-4 border-b">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {currentView === "valid" && (
              <div className="bg-[#EDF6F7] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Valid Certificates</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Certificate ID</th>
                        <th className="py-2 px-4 border-b">NIC</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Meet</th>
                        <th className="py-2 px-4 border-b">Age Group</th>
                        <th className="py-2 px-4 border-b">Place</th>
                        <th className="py-2 px-4 border-b">
                          Birth Certificate Number
                        </th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                      {filteredCertificates.length > 0 ? (
                        filteredCertificates.map((certificate) => (
                          <tr key={certificate.certificate_id_db}>
                            <td className="py-2 px-4 border-b">
                              {certificate.certificate_id}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.nic}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.name}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.meet}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.ageGroup}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.place}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {certificate.birthCertNumber}
                            </td>
                            <td className="py-2 px-4 border-b">
                              <button
                                className="px-4 py-2 bg-[#fd6060] text-black rounded-lg hover:bg-[#d37f7f]"
                                onClick={() =>
                                  handleDeleteValid(
                                    certificate.certificate_id_db
                                  )
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="py-2 px-4 border-b">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCertificateDetails;
