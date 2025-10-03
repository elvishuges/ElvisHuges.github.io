export class ChatbotView {
  #sendBtn = document.querySelector("#send-chat-btn");
  #openBtn = document.querySelector("#open-chat-btn");
  #closeBtn = document.querySelector(".close-btn");
  #chatBody = document.querySelector(".chat-body");
  #chatPopup = document.querySelector("#chat-popup");
  #chatInput = document.querySelector("#chat-input");

  constructor(initialMessage = "Olá! Como posso te ajudar?") {
    if (initialMessage) {
      this.appendMessage(initialMessage, "bot");
    }
  }

  setupEventHandlers({ onOpen, onClose, onSend }) {
    this.#openBtn.onclick = () => onOpen();
    this.#closeBtn.onclick = () => onClose();
    this.#sendBtn.onclick = () => {
      const message = this.#chatInput.value.trim();
      if (message) {
        onSend(message);
        this.#chatInput.value = "";
      }
    };

    this.#chatInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const message = this.#chatInput.value.trim();
        if (message) {
          onSend(message);
          this.#chatInput.value = "";
        }
      }
    });
  }

  togglePopup(show) {
    this.#chatPopup.classList.toggle("show", show);
  }

  appendMessage(text, sender = "bot") {
    const p = document.createElement("p");
    p.classList.add("chat-message", sender);
    p.textContent = text;
    this.#chatBody.appendChild(p);
    this.#chatBody.scrollTop = this.#chatBody.scrollHeight;
  }

  showTyping() {
    this.#chatInput.placeholder = "Bot digitando...";
  }

  removeTyping() {
    this.#chatInput.placeholder = "Pergunte sobre Elvis...";
  }

  /**
   * Se detectar número de menu, transforma em link de WhatsApp
   * Ex: "1" => link "https://wa.me/5575981642037"
   */
  appendMessageWithLink(menuNumber, phoneNumber = "5575981642037") {
    const p = document.createElement("p");
    p.classList.add("chat-message", "bot");

    // Verifica se é número válido
    if (/^\d+$/.test(menuNumber)) {
      const link = `https://wa.me/${phoneNumber}`;
      p.innerHTML = `Você selecionou a opção ${menuNumber}. <a href="${link}" target="_blank">Clique aqui para falar no WhatsApp</a>`;
    } else {
      p.textContent = menuNumber; // se não for número, apenas exibe
    }

    this.#chatBody.appendChild(p);
    this.#chatBody.scrollTop = this.#chatBody.scrollHeight;
  }
}
