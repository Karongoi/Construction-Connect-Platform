import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AskQuestion from "./pages/AskQuestion";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import UserManagement from "./pages/manager/UserManagement";
import ModerateContent from "./pages/manager/ModerateContent";
import ReportInsights from "./pages/manager/ReportInsights"; 

// Mentorship Pages (Apprentice)
import AvailableMentors from "./pages/mentorship/AvailableMentors";
import MyRequests from "./pages/mentorship/MyRequests";
import MyMentors from "./pages/mentorship/MyMentors";

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

            {/* Mentorship Routes (Apprentice) */}
            <Route
              path="/mentorship/available"
              element={
                <PrivateRoute>
                  <AvailableMentors />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentorship/requests"
              element={
                <PrivateRoute>
                  <MyRequests />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentorship/my-mentors"
              element={
                <PrivateRoute>
                  <MyMentors />
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
            <Route
              path="/manager/reports"
              element={
                <PrivateRoute>
                  <ReportInsights />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
