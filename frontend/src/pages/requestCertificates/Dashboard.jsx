/* eslint-disable react/prop-types */

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


function Dashboard({ sidebarToggle, setSidebarToggle }) {
  return (
    <div className="flex w-full">
      <Sidebar sidebarToggle={sidebarToggle} />

      <div className={`${sidebarToggle ? "" : "ml-64"} flex-1`}>
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      </div>
    </div>
  );
}

export default Dashboard