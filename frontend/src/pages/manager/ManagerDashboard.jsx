import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/manager/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard fetch failed:", err));
  }, []);

  const cards = [
    {
      title: "Manage Users",
      description: "View, update, or remove user accounts.",
      route: "/manager/users",
      color: "bg-blue-100 text-blue-800",
      emoji: "👥",
    },
    {
      title: "Moderate Questions",
      description: "Review and manage posted questions.",
      route: "/manager/moderate",
      color: "bg-yellow-100 text-yellow-800",
      emoji: "🧾",
    },
    {
      title: "Reports & Insights",
      description: "Create platform reports and insights.",
      route: "/manager/reports",
      color: "bg-green-100 text-green-800",
      emoji: "📊",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📋 Site Manager Dashboard</h1>

      {stats && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl">{stats.total_users}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold">Questions</h2>
            <p className="text-2xl">{stats.total_questions}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold">Answers</h2>
            <p className="text-2xl">{stats.total_answers}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => card.route !== "#" && navigate(card.route)}
            className={`cursor-pointer p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 ${card.color}`}
          >
            <div className="text-4xl mb-3">{card.emoji}</div>
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-sm mt-1">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
