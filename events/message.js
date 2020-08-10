const sqlite = require("sqlite3");
const { MessageEmbed } = require("discord.js");

let db = new sqlite.Database("./database/xp.db", err => {
    if (err) throw err;
});

module.exports = (bot, message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    //Adding XPs

    let addXp = Math.floor(Math.random() * 2) + 2;
    db.get(`SELECT * FROM xp WHERE userId = '${message.author.id}'`, (err, rows) => {

        if (err) {
            throw err;
        }

        if (rows === undefined) {
            return db.all(`INSERT INTO xp(userId, xp, level) VALUES('${message.author.id}', 0, "Newbie")`)
        } else {
            db.all(`UPDATE xp SET xp = xp + '${addXp}' WHERE userId = '${message.author.id}'`);
        }
        if (rows.xp > 1000) {
            db.all(`UPDATE xp SET level = "Rookie" WHERE userId = '${message.author.id}'`);
        }
        if (rows.xp > 5000) {
            db.all(`UPDATE xp SET level = "The Insider" WHERE userId = '${message.author.id}'`);
        }
        if (rows.xp > 10000) {
            db.all(`UPDATE xp SET level = "The Elite" WHERE userId = '${message.author.id}'`);
        }
    });
};