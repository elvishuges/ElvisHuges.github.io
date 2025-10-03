export class ChatbotView {
  #sendBtn = document.querySelector("#send-chat-btn");
  #openBtn = document.querySelector("#open-chat-btn");
  #closeBtn = document.querySelector("#close-btn");
  #chatBody = $(".chat-body");

  setupEventHandlers({ onOpen, sendMessage, onClose }) {
    this.#openBtn.onclick = () => {
      onOpen();
    };
    this.#sendBtn.onclick = () => {
      sendMessage();
    };
    this.#closeBtn.onclick = () => {
      onClose();
    };
  }
}
