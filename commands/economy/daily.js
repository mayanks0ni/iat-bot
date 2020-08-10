const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");
const ms = require("parse-ms");

module.exports = class DailyCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'daily',
            group: 'economy',
            memberName: 'daily',
            description: 'A Command To Collect Daily Rewards!',
            examples: ["daily"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.log(err);
            });

            const trans = new sqlite.Database("./database/transactions.db", err => {
                if (err) console.error(err);
            });

            const diamond = this.client.emojis.cache.get("706515264451117109");

            let timeout = 86400000;

            let amount = 500;

            let pamount = 700;

            let userInfo = `SELECT * FROM userdb WHERE userId = ?`;

            db.get(userInfo, [message.author.id], (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    if (row.daily !== null && timeout - (Date.now() - row.daily) > 0) {
                        let time = ms(timeout - (Date.now() - row.daily));
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`\*\*You Need To Wait \`${time.hours} Hours ${time.minutes} Minutes ${time.seconds} Seconds\` To Collect Daily Reward Again!\*\*`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp())
                    } else {
                        if (row.premium === "yes") {
                            db.all(`UPDATE userdb SET bal = bal + '${pamount}' WHERE userId = '${message.author.id}'`);
                            db.all(`UPDATE userdb SET daily = ${Date.now()} WHERE userId = '${message.author.id}'`);
                            trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Daily Reward!", '+${pamount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`\*\*You Have Collected Your Daily ${pamount}${diamond} Amount! You Can Collect It Again After 24hrs!\*\*`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                        } else {
                            db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`);
                            db.all(`UPDATE userdb SET daily = ${Date.now()} WHERE userId = '${message.author.id}'`);
                            trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Daily Reward!", '+${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`\*\*You Have Collected Your Daily ${amount}${diamond} Amount! You Can Collect It Again After 24hrs!\*\*`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                        }
                    }
                }
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

