import React from "react";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const navigate = useNavigate();

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
      description: "Coming soon: platform statistics and trends.",
      route: "#",
      color: "bg-gray-100 text-gray-800",
      emoji: "📊",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📋 Manager Dashboard</h1>

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
