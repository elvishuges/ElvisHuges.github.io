// ChatbotController.js
export class ChatbotController {
  #view;
  #service;
  constructor({ chatbotView, geminiService }) {
    this.#view = chatbotView;
    this.#service = geminiService;
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
    this.#view.showTyping();
    this.#view.appendMessage(userMessage, "user");

    // Resposta do "service"
    try {
      const botResponse = await this.#service.sendMessage(userMessage);
      setTimeout(() => {
        this.#view.appendMessage(botResponse, "bot");
        this.#view.removeTyping();
      }, 500);
    } catch (error) {
      this.#view.removeTyping();
      this.#view.appendMessage(
        "Ocorreu um erro inesperado. Desculpe. Estou entrando em contato com Elvis para solucionar.",
        "bot"
      );
    }
  }
}
