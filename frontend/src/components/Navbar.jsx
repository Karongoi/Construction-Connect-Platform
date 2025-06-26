import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbar = ["/", "/signup"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (hideNavbar) return null;

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-white font-bold text-xl">
        Construction Connect
      </Link>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
