import React, { useState, useEffect } from "react";
import API from "../api/api";

function AddAgent() {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchAgents = async () => {
    try {
      const res = await API.get("/agents", { headers: { Authorization: `Bearer ${token}` } });
      setAgents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/agents", formData, { headers: { Authorization: `Bearer ${token}` } });
      setFormData({ name: "", email: "", mobile: "", password: "" });
      fetchAgents();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding agent");
    }
  };

  return (
    <div className="agent-card">
      <h3>Add Agent</h3>
      {error && <p style={{color:"red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Add Agent</button>
      </form>
      <h4>Agents List</h4>
      <ul>
        {agents.map(agent => <li key={agent._id}>{agent.name} - {agent.email} - {agent.mobile}</li>)}
      </ul>
    </div>
  );
}

export default AddAgent;
