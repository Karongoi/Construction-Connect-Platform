import { useEffect, useState } from "react";
import axios from "axios";

const AvailableMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/auth/journeymen", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMentors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMentors();
  }, []);

  const sendRequest = async (mentorId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/mentorship/request",
        { mentor_id: mentorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Request failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Mentors</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <ul className="space-y-4">
        {mentors.map((mentor) => (
          <li key={mentor.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{mentor.username}</h3>
            <p className="text-gray-600">{mentor.email}</p>
            <button
              onClick={() => sendRequest(mentor.id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Request Mentorship
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableMentors;
