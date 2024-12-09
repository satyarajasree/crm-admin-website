import React from "react";
import "./DefaultQuestions.css";

const DefaultQuestions = (props) => {
  const questions = [
    { text: "What are your services?", response: "We provide real estate services." },
    { text: "Where are you located?", response: "Our office is located in Hyderabad." },
    { text: "How can I contact you?", response: "You can reach us at contact@rajasreetownship.in." },
  ];

  const handleClick = (response) => {
    props.actionProvider.handleQuestionResponse(response);
  };

  return (
    <div className="default-questions">
      {questions.map((question, index) => (
        <button
          key={index}
          className="question-button"
          onClick={() => handleClick(question.response)}
        >
          {question.text}
        </button>
      ))}
    </div>
  );
};

export default DefaultQuestions;
