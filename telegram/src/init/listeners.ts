import bot from "@/bot";
import start from "@/handlers/start";

function attachListeners() {
  bot.start(start);
}

export default attachListeners;
