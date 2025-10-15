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
    if (!userMessage || userMessage.trim() === "") return;

    // Limita o tamanho da mensagem
    if (userMessage.length > 100) {
      this.#view.appendMessage(
        "⚠️ A mensagem é muito longa. Tente ser mais breve.",
        "bot"
      );
      return;
    }

    this.#view.appendMessage(userMessage, "user");
    this.#view.showTyping();

    // --- Fluxo temporário: funcionalidade fora do ar ---
    setTimeout(() => {
      this.#view.removeTyping();

      // Mensagem principal
      this.#view.appendMessage(
        "🚧 No momento, esta funcionalidade está temporariamente interrompida.",
        "bot"
      );

      // Mensagem de ajuda básica
      this.#view.appendMessage(
        "Posso responder perguntas simples por aqui. Caso precise de suporte direto, fale com *Elvis* no WhatsApp: 📱 (75) 98164-2037",
        "bot"
      );

      // Respostas básicas automáticas
      const lowerMsg = userMessage.toLowerCase();
      let basicReply = null;

      if (lowerMsg.includes("oi") || lowerMsg.includes("olá")) {
        basicReply = "Olá! 😊 Como posso te ajudar?";
      } else if (
        lowerMsg.includes("horário") ||
        lowerMsg.includes("funciona")
      ) {
        basicReply = "Atendemos de segunda a sexta, das 8h às 18h.";
      } else if (
        lowerMsg.includes("contato") ||
        lowerMsg.includes("telefone")
      ) {
        basicReply = "Você pode chamar no WhatsApp 📞 (75) 98164-2037.";
      } else if (lowerMsg.includes("obrigado") || lowerMsg.includes("valeu")) {
        basicReply = "De nada! 😉";
      }

      if (basicReply) {
        setTimeout(() => this.#view.appendMessage(basicReply, "bot"), 600);
      }
    }, 800);
  }
}
