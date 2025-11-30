// SimpleAnswerFakeService.js
export class SimpleAnswerService {
  constructor(answerDelaySec = 1) {
    this.answerDelaySec = answerDelaySec;
  }

  async getAnswer(userMessage) {
    if (!userMessage || typeof userMessage !== "string") return null;

    const lowerMsg = userMessage.toLowerCase().trim();

    const responses = [
      {
        keywords: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"],
        answer: "Olá! 👋 Tudo bem? Como posso te ajudar hoje?",
      },
      {
        keywords: ["sites", "site", "app", "apps", "sistema", "sistemas"],
        answer:
          "Se a dúvida for sobre desenvolvimento, o *Elvis* cria sites, aplicativos e sistemas sob medida. 🚀",
      },
      {
        keywords: ["horário", "funciona", "abre", "fecha", "expediente"],
        answer: "Nosso atendimento é de segunda a sexta, das 8h às 18h. 🕗",
      },
      {
        keywords: [
          "contato",
          "telefone",
          "whatsapp",
          "zap",
          "numero",
          "número",
          "falar",
        ],
        answer:
          "Você pode entrar em contato com *Elvis* pelo WhatsApp: 📱 (75) 98164-2037.",
      },
      {
        keywords: ["obrigado", "valeu", "agradecido", "thanks", "agradeço"],
        answer: "De nada! 😄 Fico feliz em ajudar.",
      },
      {
        keywords: ["ajuda", "problema", "erro", "bug", "duvida", "dúvida"],
        answer:
          "Posso tentar ajudar com dúvidas simples por aqui. Para suporte técnico completo, fale direto com *Elvis* no WhatsApp: 📞 (75) 98164-2037.",
      },
      // NOVAS RESPOSTAS PARA MAIOR COBERTURA DE TÓPICOS
      {
        keywords: [
          "orçamento",
          "orcamento",
          "preço",
          "custo",
          "quanto custa",
          "cotação",
          "cotacao",
          "valor",
        ],
        answer:
          "Para solicitar um orçamento, basta descrever seu projeto ou ideia para *Elvis* pelo WhatsApp 📱 (75) 98164-2037. Ele fará uma análise e enviará os valores!",
      },
      {
        keywords: [
          "portfólio",
          "portfolio",
          "trabalhos",
          "exemplos",
          "projetos",
          "ver",
        ],
        answer:
          "O *Elvis* tem diversos projetos de sucesso! Para ver exemplos de sites e apps que ele desenvolveu, é só pedir o link do portfólio no WhatsApp: 📱 (75) 98164-2037.",
      },
      {
        keywords: [
          "endereço",
          "local",
          "onde fica",
          "sede",
          "localização",
          "localizacao",
        ],
        answer:
          "O trabalho de desenvolvimento é realizado de forma remota, atendendo clientes de todo o Brasil, o que garante mais agilidade e flexibilidade!",
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
