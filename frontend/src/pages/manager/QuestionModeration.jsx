import React, { useEffect, useState } from "react";
import axios from "axios";
import AnswerForm from "./AnswerForm";
import AnswerList from "./AnswerList";

const QuestionModeration = ({ filter }) => {
  const [questions, setQuestions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    let url = "http://127.0.0.1:5000/manager/moderate/questions";
    if (filter === "answered") url += "?answered=true";
    else if (filter === "unanswered") url += "?answered=false";

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    // optional: scroll to top when changing filters
    window.scrollTo(0, 0);
  }, [filter, refreshKey]);

  const handleMarkAnswered = (id) => {
    const token = localStorage.getItem("token");
    axios
      .patch(`http://127.0.0.1:5000/manager/moderate/questions/${id}/mark-answered`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setRefreshKey((prev) => prev + 1))
      .catch((err) => console.error("Error marking question as answered:", err));
  };

  return (
    <div className="space-y-4">
      {questions.length === 0 ? (
        <p className="text-gray-500">No questions found.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q.id}
            className={`p-4 border rounded-lg shadow-sm ${
              q.is_answered ? "bg-green-50 border-green-200" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-800">{q.title}</h3>
            <p className="text-gray-700 mt-1">{q.body}</p>
            <p className="text-sm text-gray-500 mt-2">
              Asked by: <span className="font-medium">{q.asked_by}</span> | ID: {q.id}
            </p>

            <div className="mt-3 flex gap-3">
              {!q.is_answered && (
                <button
                  onClick={() => handleMarkAnswered(q.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Mark as Answered
                </button>
              )}
            </div>

            <AnswerList questionId={q.id} refreshTrigger={refreshKey} />
            <AnswerForm questionId={q.id} onAnswered={() => setRefreshKey((k) => k + 1)} />
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionModeration;
