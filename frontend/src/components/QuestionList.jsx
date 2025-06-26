import { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-gray-600">No questions have been posted yet.</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {questions.map((q) => (
        <div
          key={q.id}
          className="bg-white border border-gray-200 shadow-md rounded-lg p-4"
        >
          <h3 className="text-xl font-bold text-blue-700">{q.title}</h3>
          <p className="text-gray-800">{q.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Asked by: {q.asked_by || "Unknown"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
