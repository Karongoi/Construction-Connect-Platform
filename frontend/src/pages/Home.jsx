import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-bold mb-4">Welcome to Construction Connect</h1>
      <p className="text-lg mb-8 text-center max-w-lg">
        A platform where apprentices, journeymen, and site managers learn, teach, and grow together.
      </p>
      <div className="space-x-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl shadow hover:bg-gray-100 transition"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;
