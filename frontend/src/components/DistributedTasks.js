import React, { useEffect, useState } from "react";
import API from "../api/api";

function DistributedTasks() {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState({});
  const token = localStorage.getItem("token");

  // Fetch all agents
  const fetchAgents = async () => {
    try {
      const res = await API.get("/agents", { headers: { Authorization: `Bearer ${token}` } });
      setAgents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch tasks for each agent
  const fetchTasks = async () => {
    const tasksData = {};
    for (let agent of agents) {
      try {
        const res = await API.get(`/tasks/agent/${agent._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        tasksData[agent._id] = res.data;
      } catch (err) {
        console.error(err);
      }
    }
    setTasks(tasksData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAgents();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (agents.length > 0) fetchTasks();
  }, [agents]);

  return (
    <div className="agent-card">
      <h3>Distributed Tasks</h3>
      {agents.map((agent) => (
        <div key={agent._id} style={{ border: "1px solid black", padding: "10px", margin: "10px 0" }}>
          <h4>{agent.name} ({agent.email})</h4>
          <ul>
            {tasks[agent._id]?.map((task) => (
              <li key={task._id}>
                <strong>{task.firstName}</strong> - {task.phone} - {task.notes}
              </li>
            )) || <li>No tasks assigned</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DistributedTasks;
