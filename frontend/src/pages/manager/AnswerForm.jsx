// src/pages/manager/AnswerForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AnswerForm = ({ questionId, onAnswered }) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      await axios.post(
        `http://127.0.0.1:5000/answers/${questionId}`,
        { body },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setBody("");
      if (onAnswered) onAnswered();
    } catch (err) {
      console.error("Failed to post answer:", err);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <textarea
        className="w-full p-2 border rounded"
        rows={2}
        placeholder="Type your answer..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={loading}
        required
      />
      <button
        type="submit"
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Answer"}
      </button>
    </form>
  );
};

export default AnswerForm;
