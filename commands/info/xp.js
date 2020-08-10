const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class XPCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'xp',
            aliases: ["level"],
            group: 'info',
            memberName: 'xp',
            description: 'A Command To View Yours Or The Mentioned Users XP!',
            examples: ["xp [User]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/xp.db", err => {
                if (err) console.log(err);
            });

            let user = message.mentions.users.first() || this.client.users.cache.get(args[0]);
            if (user) {
                let userInfo = `SELECT * FROM xp WHERE userId = ?`;
                db.get(userInfo, [user.id], (err, row) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (row === undefined) {
                        return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Mentioned User Does Not Have XP!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    } else {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${user.tag}'s XP`).setDescription(`**XP - ${row.xp}\nLevel - ${row.level}**`).setFooter(message.guild.me.displayName).setColor("RANDOM").setTimestamp())
                    }
                });
            } else {
                db.get(`SELECT * FROM xp WHERE userId = ?`, [message.author.id], (err, row) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (row === undefined) {
                        return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Do Not Have XP!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    } else {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**XP - ${row.xp}\nLevel - ${row.level}**`).setFooter(message.guild.me.displayName).setColor("RANDOM").setTimestamp())
                    }
                });
            }
            db.close();
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

