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

NorrisBot.prototype._loadBotUser = function () {
 let self = this;
 this.user = this.users.filter(function (user) {
  return user.name = self.name;
 })[0];
};

NorrisBot.prototype._connectDb = function () {
 if (!fs.existSync(this.dbPath)) {
  console.error('Database path ' + this.dbPath + '" does not exist or it\'s not readable"');
  process.exit(1);

 }

 this.db = new SQLite.Databse(this.dbPath);
};

NorrisBot.prototype._welcomeMessage = function () {
 this.postMessageToChannel(this.channel[0].name, 'Hi guys, roundhouse kick anyone?' + '\n I can tell jokes, but very honest ones. Just say `Chuck Norris` or `' + this.name + '`to invoke me!`'){as_user: true});
}

NorrisBot.prototype._firstRunCheck = function () {
 let self = this;
 self.db.get('SELECT val FROM info WHERE name = "lastrun" LIMIT 1', function (err, record) {
  if (err) {
   return console.error('DATABASE ERROR', err);
  }

  let currentTime = (new Date()).toJSON();

  if (!record) {
   self._welcomeMessage();
   return self.db.run('INSERT INTO info(name, val) VALUES("lastrun", ?)', currentTime);
  }

  self.db.run('UPDATE info SET val = ? WHERE name = "lastrun"', currentTime);
 });
};

NorrisBot.prototype._onStart = function () {
 this._loadBotUser();
 this._connectDb();
 this._firstRunCheck();
};

NorrisBot.prototype.run = function () {
 NorrisBot.super_.call(this, this.settings);

 this.on('start', this._onStart);
 this.on('message', this._onMessage);
};












module.exports = NorrisBot;
