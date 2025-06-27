import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AskQuestion from "./pages/AskQuestion";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; //  Import Footer

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import UserManagement from "./pages/manager/UserManagement";
import ModerateContent from "./pages/manager/ModerateContent";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* User Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/ask"
              element={
                <PrivateRoute>
                  <AskQuestion />
                </PrivateRoute>
              }
            />

            {/* Manager Protected Routes */}
            <Route
              path="/manager/dashboard"
              element={
                <PrivateRoute>
                  <ManagerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager/users"
              element={
                <PrivateRoute>
                  <UserManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager/moderate"
              element={
                <PrivateRoute>
                  <ModerateContent />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        <Footer /> {/* Added Footer here */}
      </div>
    </Router>
  );
}

export default App;
