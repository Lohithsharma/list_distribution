import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AddAgent from "./AddAgent";
import UploadCSV from "./UploadCSV";
import DistributedTasks from "./DistributedTasks";

function Dashboard({ setIsAuthenticated }) {
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // update auth state
    window.location.href = "/login";
  };

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <nav>
        <Link to="add-agent" className="nav-btn">Add Agent</Link> | 
        <Link to="upload-csv" className="nav-btn">Upload CSV</Link> | 
        <Link to="distributed-tasks" className="nav-btn">View Distributed Tasks</Link>
      </nav>

      <Routes>
        {/* Default route inside dashboard */}
        <Route path="/" element={<Navigate to="distributed-tasks" />} />
        <Route path="add-agent" element={<AddAgent />} />
        <Route path="upload-csv" element={<UploadCSV />} />
        <Route path="distributed-tasks" element={<DistributedTasks />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
