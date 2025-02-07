import { useState } from "react";
import { FaUser, FaCertificate, FaFileUpload, FaCheckCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); 

 
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className="h-screen flex">
      
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded mb-10"
      >
        <FaBars size={20} />
      </button>

      
      <div
        className={`fixed top-0 left-0 h-full bg-blue-100 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 p-4 flex flex-col`}
      >
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            {[
              { id: "personalDetails", label: "Personal Details", icon: <FaUser /> },
              { id: "certificateDetails", label: "Certificate Details", icon: <FaCertificate /> },
              { id: "documentUpload", label: "Document Upload", icon: <FaFileUpload /> },
              { id: "reviewAndSubmit", label: "Review and Submit", icon: <FaCheckCircle /> }
            ].map((item) => (
              <li
                key={item.id}
                className={`flex items-center p-3 cursor-pointer rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-blue-300"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        
        <div
          className="mt-auto p-3 bg-red-500 text-white cursor-pointer rounded-lg hover:bg-red-600"
          onClick={() => alert("Logging out...")}
        >
          <div className="flex items-center">
            <FaSignOutAlt className="mr-3" /> Logout
          </div>
        </div>
      </div>
    </div>
  );
}
