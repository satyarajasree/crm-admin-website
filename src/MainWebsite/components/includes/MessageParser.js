class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    // You can handle other bot logic here if necessary
    this.actionProvider.handleDefaultQuestions();
  }
}

export default MessageParser;
