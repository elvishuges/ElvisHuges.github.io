// ChatbotController.js
export class ChatbotController {
  #view;
  #service;
  #maxMessageBySession = 10;
  #userMessageCount = 0; // contador de mensagens

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
    if (userMessage.length > 100) return;

    // Verifica se já atingiu o limite
    if (this.#userMessageCount >= this.#maxMessageBySession) {
      this.#view.appendMessage(
        "⚠️ Você atingiu o limite de mensagens desta sessão. Tente novamente mais tarde!",
        "bot"
      );
      return;
    }

    this.#userMessageCount++; // incrementa contador
    this.#view.showTyping();
    this.#view.appendMessage(userMessage, "user");

    // Aviso quando chegar em 5 mensagens
    if (this.#userMessageCount === 5) {
      this.#view.appendMessage(
        "ℹ️ Aviso: Você já enviou 5 mensagens nesta sessão.",
        "bot"
      );
    }

    // Aviso quando chegar no limite
    if (this.#userMessageCount === this.#maxMessageBySession) {
      this.#view.appendMessage(
        "🚫 Esta foi sua última mensagem. O limite da sessão foi atingido.",
        "bot"
      );
    }

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
