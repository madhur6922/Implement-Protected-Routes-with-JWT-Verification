import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.message);
      } catch {
        setData("Unauthorized Access!");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;
