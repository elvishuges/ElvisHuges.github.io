import { ChatbotView } from "./views/chatbotView.js";
import { GeminiService } from "./services/geminiService.js";
import { ChatbotController } from "./controllers/chatbotController.js";
import { SimpleAnswerService } from "./services/simpleAnswerService.js";

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

  const view = new ChatbotView(
    "Olá Sou o assistente vistual de Elvis Huges. Para melhor atendimento, Você pode falar com *Elvis* pelo WhatsApp: 📱 (75) 98164-2037. Como que posso ajudá-lo?"
  );

  const answerDelayMessageInSec = 1;
  const service = new SimpleAnswerService(answerDelayMessageInSec);
  const controller = new ChatbotController({
    view,
    service,
  });
  controller.init();
})();
