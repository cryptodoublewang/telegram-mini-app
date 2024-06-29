import bot from "@/bot";
import loggingMiddleware from "@/middlewares/logging";
import throttler from "@/middlewares/throttler";
import { session } from "telegraf";

// Attach all middlewares to the bot
function attachMiddlewares() {
  bot.use(loggingMiddleware);
  bot.use(throttler);
  bot.use(session());
}

export default attachMiddlewares;
