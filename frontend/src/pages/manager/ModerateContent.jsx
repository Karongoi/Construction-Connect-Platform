import React, { useState } from "react";
import QuestionModeration from "./QuestionModeration";

const ModerateContent = () => {
  const [filter, setFilter] = useState("all");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Moderate Questions</h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6">
        {["all", "answered", "unanswered"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded ${
              filter === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <QuestionModeration filter={filter} />
    </div>
  );
};

export default ModerateContent;
