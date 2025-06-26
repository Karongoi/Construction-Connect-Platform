import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionList from "../components/QuestionList";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}</h1>
      <p className="text-lg mb-6">Role: {user.role}</p>

      {/* Role-specific Dashboards */}
      {user.role === "Apprentice" && (
        <div className="bg-blue-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold">Apprentice Dashboard</h2>
          <p>You can ask questions and request mentorship.</p>
        </div>
      )}

      {user.role === "Journeyman" && (
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold">Journeyman Dashboard</h2>
          <p>You can answer questions and mentor apprentices.</p>
        </div>
      )}

      {user.role === "Site Manager" && (
        <div className="bg-yellow-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold">Site Manager Dashboard</h2>
          <p>You can manage users, questions, and moderate the platform.</p>
        </div>
      )}

      {/* Show Questions to All Users */}
      <QuestionList role={user.role} />
    </div>
  );
}

export default Dashboard;
