const TelegramBot = require('node-telegram-bot-api');

// Твой токен бота из Environment Variables
const token = process.env.BOT_TOKEN;

// Используем polling вместо вебхука
const bot = new TelegramBot(token, { 
  polling: true,
  // Дополнительные опции для стабильности
  polling: {
    interval: 300,
    autoStart: true
  }
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Пользователь';
  
  console.log(`Пользователь ${userName} (${chatId}) авторизовался`);
  
  bot.sendMessage(
    chatId, 
    `✅ Привет, ${userName}!\n\nАвторизация на сайте прошла успешно!\n\nТеперь ты можешь вернуться на сайт и заполнять формы.`
  );
});

// Обработчик команды /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `🤖 Команды бота:\n/start - Авторизация на сайте\n/help - Помощь`
  );
});

// Обработчик всех сообщений (если не команда)
bot.on('message', (msg) => {
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(
      msg.chat.id, 
      'Отправь /start для авторизации на сайте'
    );
  }
});

// Логирование ошибок
bot.on('error', (error) => {
  console.error('Ошибка бота:', error);
});

bot.on('polling_error', (error) => {
  console.error('Ошибка polling:', error);
});

console.log('🤖 Бот запущен и готов к работе...');
console.log('Используется polling, вебхук не нужен');
