import React, { useState } from "react";
import API from "../api/api";

function UploadCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/tasks/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error uploading CSV");
    }
  };

  return (
    <div className="upload-area">
      <h3>Upload CSV</h3>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadCSV;
