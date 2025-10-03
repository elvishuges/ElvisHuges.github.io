export class ChatbotController {
  #chatbotView;
  #promptService;

  constructor({ chatbotView, promptService }) {
    this.#setupEvents();
    this.#chatbotView = chatbotView;
    this.#promptService = promptService;
  }
  async init({ firstBotMessage, text }) {
    return this.#promptService.init(text);
  }
  #setupEvents() {
    this.#chatbotView.setupEventHandlers({
      onOpen: this.#onOpen.bind(this),
      onSend: this.#chatBotReply.bind(this),
      onStop: this.#handleStop.bind(this),
    });
  }
  #onOpen() {
    this.#chatbotView.appendBotMessage(messages);
  }
  #onSend() {}
}
