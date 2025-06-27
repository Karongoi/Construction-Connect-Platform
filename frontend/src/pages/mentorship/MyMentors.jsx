import { useEffect, useState } from "react";
import axios from "axios";

const MyMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/mentorship/my-mentors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMentors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMentors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Active Mentors</h2>
      <ul className="space-y-4">
        {mentors.map((m) => (
          <li key={m.mentor_id} className="border p-4 rounded shadow">
            <p className="text-gray-800">
              <strong>Name:</strong> {m.mentor_name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {m.email}
            </p>
            <p className="text-sm text-gray-500">
              Started: {new Date(m.joined_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyMentors;
