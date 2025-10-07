import { ChatbotView } from "./views/chatbotView.js";
import { GeminiService } from "./services/geminiService.js";
import { ChatbotController } from "./controllers/chatbotController.js";

(async () => {
  const root = new URL("../", import.meta.url);
  const fromMainProject = (path) => new URL(path, root).toString();
  const [css, html] = await Promise.all([
    fetch(fromMainProject("./chatbotsdk/chatbot.css")).then((r) => r.text()),
    fetch(fromMainProject("./chatbotsdk/chatbot.html")).then((r) => r.text()),
  ]);

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  const chatbotView = new ChatbotView(
    "Olá Sou o assistente vistual de Elvis Huges. em que posso ajudá-lo"
  );
  const geminiService = new GeminiService(
    "http://18.234.111.150:3000/api/gemini"
  );
  const controller = new ChatbotController({ chatbotView, geminiService });
  controller.init();
})();
