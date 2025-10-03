const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Твой токен бота (получи у @BotFather)
const token = process.env.BOT_TOKEN || '8115320266:AAF3E2mPfpcAaAUBHMn8MS20ES1nNMCw010';
const bot = new TelegramBot(token, { polling: false });

// Вебхук для Render
const WEBHOOK_URL = process.env.RENDER_EXTERNAL_URL + '/webhook';
bot.setWebHook(WEBHOOK_URL);

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Пользователь';
  
  bot.sendMessage(
    chatId, 
    `✅ Здравствуйте, ${userName}!\n\nАвторизация на сайте прошла успешно!\n\nТеперь вы можете вернуться на сайт и заполнить форму.`
  );
});

// Обработчик вебхука
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.use(express.json());

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
  console.log(`Webhook URL: ${WEBHOOK_URL}`);
});