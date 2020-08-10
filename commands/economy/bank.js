const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class BankCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'bank',
            aliases: ["bankbal"],
            group: 'economy',
            memberName: 'bank',
            description: 'A Command To View Bank Balance Of Yourself Or Others!',
            examples: ["bank"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.log(err);
            });

            const diamond = this.client.emojis.cache.get("706515264451117109");

            let user = message.mentions.users.first() || this.client.users.cache.get(args[0]);

            if (user) {
                let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
                db.get(userInfo, [user.id], (err, row) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (row === undefined) {
                        return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Mentioned User Is Not Registered!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    } else {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**${user.tag} Has ${row.bankbal}${diamond} In Their Bank!**`).setFooter(message.guild.me.displayName).setColor(0x00ffc8).setTimestamp())
                    }
                });
            } else {
                db.get(`SELECT * FROM userdb WHERE userId = ?`, [message.author.id], (err, row) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (row === undefined) {
                        return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!\n Register An Account By Sending \`+register\`!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    } else {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Have ${row.bankbal}${diamond} In Your Bank!**`).setFooter(message.guild.me.displayName).setColor(0x00ffc8).setTimestamp())
                    }
                });
            }
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

