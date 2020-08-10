const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js");
const path = require('path');
const config = require("./config.json");
const requireAll = require("require-all");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const bot = new CommandoClient({
  commandPrefix: `${config.prefix}`,
  owner: ['516247416878530560', '377132426599727133', '477758607857942529'],
  invite: 'https://discord.gg/CEuG8Gb',
});

bot.commandsExecuted = 0;

bot.queue = new Map();
bot.repeatQueue = new Map();

bot.on("commandError", (cmd, err) => {
  console.log(`An Error Occured While Executing ${cmd.name} Command!\n${err}`);
  bot.channels.cache.get(config.logs).send(new MessageEmbed().setTitle("An Error Occured").setDescription(`**An Error Occured While Executing \`${cmd.name}\` Command!\nError: \`${err}\`**`).setColor(0xff0000).setTimestamp());
});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['moderation', 'Moderation'],
    ['info', 'Information'],
    ['util', 'Utility'],
    ['economy', 'Economy'],
    ['nsfw', 'NSFW'],
    ['fun', 'Fun'],
    ['music', 'Music'],
    ['gambling', 'Gambling'],
    ['owner', 'Owner'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false,
    ping: false,
    unknownCommand: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

const files = requireAll({
  dirname: `${__dirname}/events`,
  filter: /^(?!-)(.+)\.js$/
});

let db = new sqlite.Database("./database/xp.db", err => {
  if (err) console.log(err);
});

bot.removeListener("guildMemberAdd", err => console.log(err));
bot.removeListener("guildMemberRemove", err => console.log(err));
bot.removeListener("messageDelete", err => console.log(err));
bot.removeListener("ready", err => console.log(err));
bot.removeListener("message", err => console.log(err));
bot.removeListener("guildCreate", err => console.log(err));
bot.removeListener("commandRun", err => console.log(err));

try {
  for (const name in files) {
    const event = files[name];

    bot.on(name, event.bind(null, bot));

  }
  console.log(`All Events Loaded Successfully.`);
} catch (error) {
  console.log(error);
}

sqlite.open({ filename: `settings.sqlite3`, driver: sqlite3.Database }).then((db) => {
  bot.setProvider(new SQLiteProvider(db));
}).catch(err => console.log(err));

bot.login(config.token);

