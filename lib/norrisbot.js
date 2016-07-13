'use strict';

const Bot = require('slackbots');

const settings = {
 token: 'token here',
 name: 'My Bot'
};

let bot = new Bot(settings);

bot.on('start', function(){

});
