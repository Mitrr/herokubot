process.env["NTBA_FIX_319"] = 1;

const Bot = require('node-telegram-bot-api');
const token = require('./config/config').telegram.token;
const http = require('http');
const bodyParser = require('body-parser');
const expressPort = 3001;
const express = require('express');
const app = express();
const testChatId = require('./config/config').telegram.chat;
const routes = require('./routes/routes');
let users = require('./users');
const keyboards = require('./ui/keyboards');
let clientID = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
routes(app);

const server = app.listen(expressPort, (e) => {console.log(e);});
const bot = new Bot(token,{
    polling:{
        interval: 300,
        autoStart: true,
        params:{
            timeout:10
        }
    }
});

bot.onText(/\/start/, (message)=>{
    let clientId = message.hasOwnProperty('chat') ? message.chat.id : message.from.id;

    bot.sendMessage(clientId, `chat id ${clientId} and vi pidars`).then(()=>console.log('cool'))
});

bot.onText(/\/manager/, (message) => {
    let clientId = message.hasOwnProperty('chat') ? message.chat.id : message.from.id;
    clientID = clientId;
    bot.sendMessage(clientId,'<strong>Авторизация</strong>',keyboards.menus.auth);
});

bot.on('message', msg =>{
    let clientId = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;

    if (msg.text === users.manager.password){
        bot.sendMessage(msg.from.id,'<strong>МЕНЮ МЕНЕДЖЕРА</strong>',keyboards.menus.managersMenu);
    }
});

bot.on('callback_query', query => {
    console.log(debug(query));
    let id = query.message.chat.id ? query.message.chat.id : query.from.id;

    switch (query.data) {
        case 'auth':
            bot.sendMessage(query.from.id,'Сначала введи пароль, Дружище');
            break;
        case 'closeAuth':
            bot.deleteMessage(id, query.message.message_id);
            /*bot.sendMessage(query.from.id,'exit');*/
            break;
    }
});

function debug(obj = {}) {
    return JSON.stringify(obj, null, 4);
}

