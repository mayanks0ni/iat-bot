const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class TransactionsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'transactions',
            aliases: ["tns"],
            group: 'economy',
            memberName: 'transactions',
            description: 'A Command To View Your Transactions!',
            examples: ["transactions"],
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

            let page = args[0];

            const diamond = this.client.emojis.cache.get("706515264451117109");
            
            if (!page) {
                trans.all(`SELECT * FROM trans WHERE userid = '${message.author.id}' ORDER BY id DESC LIMIT 10`, (err, row) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (row === undefined) {
                        return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered Or No Transactions Found!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    } else {
                        var i;
                        let len;
                        if (row.length > 10) {
                            len = 10;
                        } else {
                            len = row.length;
                        }
                        const tra = new Discord.MessageEmbed()
                            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                            .setTitle("Your Past Transactions!")
                            .setFooter(message.guild.me.displayName)
                            .setThumbnail(this.client.user.displayAvatarURL())
                            .setColor("ORANGE")
                            .setTimestamp()
                        for (i = 0; i < len; i++) {
                            let rw = row[i];
                            tra.addField(`**\`#${i + 1}\` ${rw.money}${diamond} At ${rw.date}**`, `**Reason - ${rw.reason}**`)
                        }
                        message.embed(tra)
                    }
                });
            } else {
                let valTo = page * 10
                let valFrom = valTo - 10
                trans.all(`SELECT * FROM trans WHERE userid = '${message.author.id}' ORDER BY id DESC LIMIT '${valFrom}', '${valTo}'`, (err, row) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (row === undefined) {
                        return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered Or No Transactions Found On That Page!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    } else {
                        var i;
                        let len;
                        if (row.length > 10) {
                            len = 10;
                        } else {
                            len = row.length;
                        }
                        const tra = new Discord.MessageEmbed()
                            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                            .setTitle("Your Past Transactions!")
                            .setFooter(message.guild.me.displayName)
                            .setImage(this.client.user.displayAvatarURL())
                            .setColor("ORANGE")
                            .setTimestamp()
                        for (i = 0; i < len; i++) {
                            let rw = row[i];
                            tra.addField(`**\`#${i + 1}\` ${rw.money}${diamond} At ${rw.date}**`, `**Reason - ${rw.reason}**`)
                        }
                        message.embed(tra)
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

