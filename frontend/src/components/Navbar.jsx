import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Construction Connect
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
