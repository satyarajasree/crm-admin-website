import { createChatBotMessage } from "react-chatbot-kit";
import DefaultQuestions from './DefaultQuestions'

const botName = "HelperBot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(
      `Hi! I'm ${botName}. What can I help you with?`,
      {
        widget: "defaultQuestions",
      }
    ),
  ],
  widgets: [
    {
      widgetName: "defaultQuestions",
      widgetFunc: (props) => <DefaultQuestions {...props} />,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#007bff",
    },
    chatButton: {
      backgroundColor: "#007bff",
    },
  },
};

export default config;
