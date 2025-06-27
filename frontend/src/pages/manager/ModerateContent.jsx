import React from "react";
import QuestionModeration from "./QuestionModeration";

const ModerateContent = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Moderate Questions</h1>
      <QuestionModeration />
    </div>
  );
};

export default ModerateContent;
