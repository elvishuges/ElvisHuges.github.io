export class ChatbotController {
  #view;
  #service;

  constructor({ view, service }) {
    this.#view = view;
    this.#service = service;
  }

  init() {
    this.#view.setupEventHandlers({
      onOpen: () => this.openChat(),
      onClose: () => this.closeChat(),
      onSend: (message) => this.handleSendMessage(message),
    });
  }

  openChat() {
    this.#view.togglePopup(true);
  }

  closeChat() {
    this.isOpen = false;
    this.#view.togglePopup(false);
  }

  async handleSendMessage(userMessage) {
    console.log("userMessage", userMessage.length);

    if (!userMessage || userMessage.trim() === "") return;

    // Limita o tamanho da mensagem
    if (userMessage.length > 50) {
      this.#view.appendMessage(
        "⚠️ A mensagem é muito longa. Tente ser mais breve.",
        "bot"
      );
      return;
    }

    this.#view.appendMessage(userMessage, "user");
    this.#view.showTyping();

    const basicReply = await this.#service.getAnswer(userMessage);
    this.#view.removeTyping();

    if (basicReply) {
      setTimeout(() => {
        this.#view.appendMessage(basicReply, "bot");
      }, 600);
    }
  }
}
