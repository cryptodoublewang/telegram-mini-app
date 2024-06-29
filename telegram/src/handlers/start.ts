import { Context } from "telegraf";

const start = (ctx: Context) => {
  ctx.reply(
    "Welcome to your Telegram bot! Use /help to see available commands."
  );
};

export default start;
