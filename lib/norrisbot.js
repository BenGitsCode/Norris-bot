'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');
const SQLite = require('sqlite3').verbose();
const Bot = require('slackbots');

let NorrisBot = function Constructor(settings) {
 this.settings = settings;
 this.settings.name = this.settings.name || 'norrisbot';
 this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

 this.user = null;
 this.db = null;
};

util.inherits(NorrisBot, Bot);

module.exports = NorrisBot;
