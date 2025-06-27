import { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/mentorship/requests/sent", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Mentorship Requests</h2>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-4 rounded shadow">
            <p className="text-gray-800">
              <strong>Mentor:</strong> {req.mentor_name}
            </p>
            <p className="text-sm text-gray-600">
              Status: <span className="capitalize">{req.status}</span>
            </p>
            <p className="text-xs text-gray-500">
              Requested: {new Date(req.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRequests;
