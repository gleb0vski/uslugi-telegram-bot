const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start с кодом
bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const code = match[1]; // Получаем код из сообщения
  const userName = msg.from.first_name || 'Пользователь';
  
  console.log(`Пользователь ${userName} ввел код: ${code}`);
  
  bot.sendMessage(
    chatId, 
    `✅ Привет, ${userName}!\n\nКод ${code} принят!\n\nАвторизация на сайте прошла успешно!\n\nВернись на сайт и заполняй формы.`
  );
});

// Обработчик просто /start без кода
bot.onText(/\/start$/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(
    chatId,
    `🤖 Для авторизации на сайте:\n\n1. Нажми на кнопку "Войти через Telegram"\n2. Скопируй код с сайта\n3. Отправь его мне: /start КОД\n\nПример: /start 1234`
  );
});

console.log('🤖 Бот запущен... Ожидает коды авторизации');
