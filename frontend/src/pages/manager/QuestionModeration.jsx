import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionModeration = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:5000/questions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div key={q.id} className="p-4 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold text-gray-800">{q.title}</h3>
          <p className="text-gray-700 mt-1">{q.body}</p>
          <p className="text-sm text-gray-500 mt-2">
            Asked by: <span className="font-medium">{q.asked_by}</span> | ID: {q.id}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuestionModeration;
