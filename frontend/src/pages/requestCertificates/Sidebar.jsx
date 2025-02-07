/* eslint-disable react/prop-types */
import { IoPersonSharp } from "react-icons/io5";
import { TbCertificate } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarToggle, onSelectPage }) {
  const navigate = useNavigate();
  const sidebarItems = [
    {
      label: "Personal Details",
      icon: <IoPersonSharp className="w-6 h-6" />,
      route: "",
    },
    {
      label: "Certificates",
      icon: <TbCertificate className="w-6 h-6" />,
      route: "",
    },
  ];

    const handleNavigation = (route, label) => {
      navigate(route);
      onSelectPage(label); 
    };

  return (
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 bg-[#EDF6F5] fixed h-full px-6 py-4 shadow-lg`}
    >
      <div className="my-6 text-center">
        <ul className="mt-10 space-y-5">
          {sidebarItems.map((item, index) => (
            <li key={index} className="relative">
              <div
                className="flex relative items-center border-1 border-[#B9D8DB] rounded-2xl px-3 py-3 space-x-4 text-gray-700 cursor-pointer hover:bg-[#67CDCD]"
                onClick={() => handleNavigation(item.route, item.label)} 
              >
                {item.icon}
                <span className="text-[17px] font-medium">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
