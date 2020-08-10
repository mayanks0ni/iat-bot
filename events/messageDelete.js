const sqlite = require("sqlite3");

module.exports = (bot, message) => {
    const sdb = new sqlite.Database("./database/snipe.db", err => console.log(err));
    if (message.author.bot || message.channel.type === "dm") return;
    sdb.all(`INSERT INTO msg(message, date, author, guild, channel) VALUES('${message.content}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.tag}', '${message.guild.id}', '${message.channel.name}')`, err =>  console.log(err));
};