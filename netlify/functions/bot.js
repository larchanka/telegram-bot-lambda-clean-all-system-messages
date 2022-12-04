const TelegramBot = require('node-telegram-bot-api');

// Replace this with your Telegram bot token
const token = process.env.BOT_API;

// Create a new Telegram bot instance
const bot = new TelegramBot(token);

// Register a 'message' event handler
bot.on('message', async msg => {
  console.log('New message', msg);
  // Check if the message is a system message
  if (msg.new_chat_members || msg.left_chat_member || msg.group_chat_created || msg.supergroup_chat_created || msg.channel_chat_created || msg.migrate_to_chat_id || msg.migrate_from_chat_id || msg.pinned_message) {
    // Delete the message if it's a system message
    bot.deleteMessage(msg.chat.id, msg.message_id);
  }
});

exports.handler = async (event, context, callback) => {
  console.log('New request');
  // Parse the request body
  const { body } = event;

  // Check if the request is a webhook update
  if (body) {
    // Parse the update from the request body
    const update = JSON.parse(body);

    // Process the update using the bot
    await bot.processUpdate(update);

    // Return a 200 response to acknowledge receipt of the update
    const response = {
      statusCode: 200,
      body: 'OK'
    };

    // Encode the response as a JSON string
    const responseBody = JSON.stringify(response);

    // Return the response to the bot
    callback(null, responseBody);
  }
};