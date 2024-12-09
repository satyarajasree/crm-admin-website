class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleDefaultQuestions = () => {
      const message = this.createChatBotMessage(
        "Here are some questions I can answer:",
        {
          widget: "defaultQuestions",
        }
      );
      this.updateChatbotState(message);
    };
  
    handleQuestionResponse = (response) => {
      const message = this.createChatBotMessage(response);
      this.updateChatbotState(message);
    };
  
    updateChatbotState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;
  