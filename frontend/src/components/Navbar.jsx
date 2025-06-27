import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(!!token);
    setRole(userData?.role || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Construction Connect
        </h1>

        {isLoggedIn && role === "Manager" && (
          <div className="flex gap-4 text-sm">
            <button onClick={() => navigate("/manager/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/manager/users")}>Users</button>
            <button onClick={() => navigate("/manager/moderate")}>Moderate</button>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
