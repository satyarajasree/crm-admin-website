import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "react-chatbot-kit/build/main.css";
import "./Chatbot.css";

const Chatbots = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        {isOpen && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        )}
      </div>
      <button className="floating-button" onClick={handleToggleChatbot}>
        <i className="bi bi-robot" color="white"></i>
      </button>
    </>
  );
};

export default Chatbots;
