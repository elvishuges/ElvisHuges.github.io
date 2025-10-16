// SimpleAnswerFakeService.js
export class SimpleAnswerFakeService {
  constructor(answerDelaySec = 1) {
    this.answerDelaySec = answerDelaySec;
  }

  async getAnswer(userMessage) {
    if (!userMessage || typeof userMessage !== "string") return null;

    const lowerMsg = userMessage.toLowerCase().trim();

    const responses = [
      {
        keywords: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"],
        answer: "Olá! Como posso te ajudar?",
      },
      {
        keywords: ["sites", "site", "app", "apps"],
        answer:
          "Se a pertunga é sobre desenvolvimento de siste, Elvis Desenvolve Sites, aplicativos e etc.",
      },
      {
        keywords: ["horário", "funciona", "abre", "fecha"],
        answer: "Atendemos de segunda a sexta, das 8h às 18h. 🕗",
      },
      {
        keywords: [
          "contato",
          "telefone",
          "whatsapp",
          "zap",
          "numero",
          "número",
        ],
        answer:
          "Você pode falar com *Elvis* pelo WhatsApp: 📱 (75) 98164-2037.",
      },
      {
        keywords: ["obrigado", "valeu", "agradecido", "thanks"],
        answer: "De nada!",
      },
      {
        keywords: ["ajuda", "problema", "erro", "bug"],
        answer:
          "Posso tentar ajudar com dúvidas simples! Para suporte completo, fale no WhatsApp: 📞 (75) 98164-2037.",
      },
    ];

    const found = responses.find((resp) =>
      resp.keywords.some((k) => lowerMsg.includes(k))
    );

    // Simula tempo de resposta
    if (found) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(found.answer), this.answerDelaySec * 1000)
      );
    } else {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              "Algumas perguntas não vou conseguir responder. Por favor entre em contato com Elvis Pelo WhatsApp"
            ),
          this.answerDelaySec * 1000
        )
      );
    }
  }
}
