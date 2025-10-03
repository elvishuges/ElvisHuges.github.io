// services/geminiService.js
export class GeminiService {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  async sendMessage(message) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.serverUrl + "/generate-answer",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ question: message }),

        success: (response) => {
          const botResponse =
            response.data ||
            response.answer ||
            "Desculpe, não consegui obter uma resposta.";
          resolve(botResponse);
        },

        error: (xhr, status, error) => {
          console.error("AJAX Error:", status, error, xhr.responseText);
          reject(error);
        },
      });
    });
  }
}
