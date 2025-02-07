/* eslint-disable react/prop-types */

import { IoPersonSharp } from "react-icons/io5";
import { TbCertificate } from "react-icons/tb";

function Sidebar({ sidebarToggle }) {

  const sideberItems = [
    {
      label: "Personal Details",
      icon: <IoPersonSharp className="w-6 h-6" />,
      route: "/",
    },
    {
      label: "Certificates",
      icon: <TbCertificate className="w-6 h-6" />,
    },
  ];



  return (
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 bg-gray-50 fixed h-full px-6 py-4 shadow-lg`}
    >
      <div className="my-6 text-center">
        <ul className="mt-10 space-y-8">
          {sideberItems.map((item, index) => (
            <li key={index} className="relative">
              <div className="flex items-center space-x-4 text-gray-700">
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
