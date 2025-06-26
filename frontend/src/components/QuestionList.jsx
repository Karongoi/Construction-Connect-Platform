import { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/questions/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => {
        console.error("Failed to load questions:", err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Questions</h2>

      {questions.length === 0 ? (
        <p className="text-gray-500 text-center">No questions yet.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li
              key={q.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {q.title}
              </h3>
              <p className="text-gray-700 mb-3">{q.body}</p>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>Asked by: <strong>{q.asked_by}</strong></span>
                <span>{new Date(q.created_at).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionList;
