export class SimpleAnswerService {
  constructor(answerDelaySec = 1) {
    this.answerDelaySec = answerDelaySec;
  }

  async getAnswer(userMessage) {
    if (!userMessage || typeof userMessage !== "string") return null;

    const lowerMsg = userMessage.toLowerCase().trim();

    const responses = [
      {
        intent: "saudacao",
        keywords: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "eae", "opa", "tudo bem"],
        answer: "Olá! 👋 Tudo bem? Sou o assistente virtual do Elvis. Como posso te ajudar hoje?",
      },
      {
        intent: "servicos",
        keywords: ["sites", "site", "app", "apps", "sistema", "sistemas", "plataforma", "software", "web", "mobile", "aplicativo", "aplicativos"],
        answer: "O Elvis desenvolve sites institucionais, landing pages, aplicativos mobile e sistemas web complexos sob medida, focando em alta performance e design responsivo. 🚀",
      },
      {
        intent: "tecnologias",
        keywords: ["tech", "stack", "linguagem", "linguagens", "vue", "react", "node", "typescript", "ts", "js", "javascript", "graphql", "tailwind", "vuetify", "spring", "java", "docker"],
        answer: "As principais tecnologias que o Elvis domina são: **Vue.js (2 e 3/Composition API), React, TypeScript, Node.js, GraphQL, Tailwind CSS, Vuetify e Spring/Java**. Ele também tem forte experiência com arquiteturas limpas (Clean/Hexagonal) e DevOps (Docker, AWS, CI/CD). 💻",
      },
      {
        intent: "notarial_clinico",
        keywords: ["cartorio", "cartório", "notarial", "imoveis", "imóveis", "clinica", "clínica", "hospital", "atendimento", "medico", "médico", "fila"],
        answer: "O Elvis possui sólida experiência no desenvolvimento de sistemas especialistas, como plataformas de automação para **Cartórios (1º Registro de Imóveis)** e painéis de gerenciamento de filas/atendimento para **Clínicas Médicas**. 🏛️🏥",
      },
      {
        intent: "orcamento",
        keywords: ["orçamento", "orcamento", "preço", "custo", "quanto custa", "cotação", "cotacao", "valor", "valores", "cobrada", "cobrar"],
        answer: "Para entender o escopo do seu projeto e enviar um orçamento preciso, você pode alinhar os detalhes diretamente com o Elvis pelo WhatsApp: 📱 (75) 98164-2037. Ele fará uma análise detalhada da sua ideia!",
      },
      {
        intent: "portfolio",
        keywords: ["portfólio", "portfolio", "trabalhos", "exemplos", "projetos", "ver", "feito", "criou", "github", "codes"],
        answer: "Você pode dar uma olhada em alguns dos principais projetos dele diretamente aqui na seção de 'Projetos' da página! Se quiser ver o código-fonte ou o GitHub, o link é: 🐙 [github.com/elvishuges](https://github.com/elvishuges).",
      },
      {
        intent: "contato",
        keywords: ["contato", "telefone", "whatsapp", "zap", "numero", "número", "falar", "email", "e-mail", "linkedin", "rede social"],
        answer: "Você pode falar diretamente com o Elvis através dos canais abaixo:\n📱 **WhatsApp:** (75) 98164-2037\n✉️ **E-mail:** elvishuges@hot.com\n🔗 **LinkedIn:** [In/elvis-huges](https://www.linkedin.com/in/elvis-huges-41043897/)",
      },
      {
        intent: "contratacao",
        keywords: ["vaga", "contratar", "entrevista", "rh", "recrutador", "recrutamento", "oportunidade", "freela", "freelance"],
        answer: "Se você é recruiter ou busca um desenvolvedor focado em entregar código limpo e arquitetura sólida, o Elvis está disponível para propostas e projetos! Vamos conversar? 📱 WhatsApp: (75) 98164-2037.",
      },
      {
        intent: "localizacao",
        keywords: ["endereço", "local", "onde fica", "sede", "localização", "localizacao", "cidade", "mora", "rj", "rio das ostras", "bahia"],
        answer: "O Elvis reside atualmente em **Rio das Ostras - RJ**, mas atua de forma 100% remota atendendo empresas e clientes de qualquer lugar do Brasil com total agilidade e comunicação transparente! 📍🌐",
      },
      {
        intent: "horario",
        keywords: ["horário", "funciona", "abre", "fecha", "expediente", "disponivel", "disponível"],
        answer: "O horário normal de atendimento e desenvolvimento é de segunda a sexta, das 8h às 18h. 🕗",
      },
      {
        intent: "agradecimento",
        keywords: ["obrigado", "valeu", "agradecido", "thanks", "agradeço", "show", "perfeito", "obrigada"],
        answer: "De nada! 😄 Se precisar de mais alguma informação sobre as skills ou projetos do Elvis, é só chamar.",
      },
      {
        intent: "ajuda",
        keywords: ["ajuda", "problema", "erro", "bug", "duvida", "dúvida", "como funciona"],
        answer: "Consigo responder dúvidas sobre as experiências, tecnologias e projetos do Elvis. Para suporte técnico específico ou parcerias, o ideal é chamá-lo no WhatsApp: 📞 (75) 98164-2037.",
      },
    ];

    // Busca avançada: valida se a frase contém a palavra-chave usando limite de palavra (\b)
    // Isso evita que "oi" dispare em palavras como "foi", "noite", etc.
    const found = responses.find((resp) =>
      resp.keywords.some((keyword) => {
        // Escapa caracteres especiais da keyword para a RegExp não quebrar
        const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, "i");
        return regex.test(lowerMsg) || lowerMsg.includes(keyword); 
      })
    );

    const delay = this.answerDelaySec * 1000;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (found) {
          resolve(found.answer);
        } else {
          resolve(
            "Não entendi muito bem a sua pergunta. 🧭 Como sou um assistente simples, posso falhar com algumas frases. Que tal tentar palavras como *'Tecnologias'*, *'Contato'* ou *'Projetos'*? Se preferir, fale direto com o Elvis no WhatsApp: (75) 98164-2037!"
          );
        }
      }, delay);
    });
  }
}