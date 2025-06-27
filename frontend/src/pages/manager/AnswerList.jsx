// src/pages/manager/AnswerList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AnswerList = ({ questionId, refreshTrigger }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/answers/${questionId}`)
      .then((res) => setAnswers(res.data))
      .catch((err) => console.error("Error loading answers:", err));
  }, [questionId, refreshTrigger]);

  if (!answers.length)
    return <p className="text-sm text-gray-400">No answers yet.</p>;

  return (
    <div className="mt-2">
      <h4 className="font-semibold text-sm text-gray-700">Answers:</h4>
      <ul className="list-disc list-inside ml-4">
        {answers.map((ans) => (
          <li key={ans.id} className="text-gray-700">
            {ans.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerList;
