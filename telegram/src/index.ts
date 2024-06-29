import createBot from "@/create";
import bot from "@/bot";

const launchBot = async () => {
  bot.launch();
  if (bot)
    bot.telegram.getMe().then((res) => {
      console.log(`Bot started. Available at https://t.me/${res.username}`);
    });
};

const main = async () => {
  await createBot();
  await launchBot();
};

main();
