import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="main">
        <Topbar />         {/* <-- LET OP: deze regel moet erin! */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
