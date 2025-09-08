
const TelegramBot = require('node-telegram-bot-api');

export const BOT = (token:string): any => {
    
    return new TelegramBot(token, { polling: false, request: {
        agentOptions: {
            keepAlive: false,
            family: 4
        }
    }});
};