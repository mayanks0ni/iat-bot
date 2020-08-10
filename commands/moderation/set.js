const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class SetCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'set',
            group: 'moderation',
            memberName: 'set',
            description: 'A Command To Set The Channel For Join-Leave/Suggestion Messages!',
            examples: ["set [welcome|suggest|updates] [#channel]"],
            userPermissions: ["ADMINISTRATOR"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    run(message, args) {
        try {
            let logs = this.client.channels.cache.get("726414689805795418");
            let db = new sqlite.Database("./database/config.db", err => console.log(err));
            let chn = message.mentions.channels.first();
            let toC = args[0];
            let toCList = ["welcome", "suggest", "updates"];

            if (!toCList.includes(toC) || !args[0] || !chn) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}set welcome|suggest|updates [#channel]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            if (!message.guild.channels.cache.find(c => c.id === chn.id)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Invalid Channel Mentioned! Please Mention A Valid Channel Which Is In This Server!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());

            if (args[0] === "welcome") {
                db.get(`SELECT * FROM config WHERE guildid = '${message.guild.id}' AND type = '${toC}'`, (err, rows) => {
                    if (rows === undefined) {
                        db.all(`INSERT INTO config(guildid, type, channel) VALUES('${message.guild.id}', '${toC}', '${chn.id}')`, err => {
                            console.log(err);
                            logs.send(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${err}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
                        });
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Welcome Messages Are Redirected To <#${chn.id}>!**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                    } else {
                        db.all(`UPDATE config SET channel = '${chn.id}' WHERE guildid = '${message.guild.id}' AND type = 'welcome'`, err => {
                            console.log(err);
                            logs.send(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${err}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
                        });
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Welcome Messages Are Redirected To <#${chn.id}>!**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                    }
                });
            } else if (args[0] === "suggest") {
                db.get(`SELECT * FROM config WHERE guildid = '${message.guild.id}' AND type = '${toC}'`, (err, rows) => {
                    if (rows === undefined) {
                        db.all(`INSERT INTO config(guildid, type, channel) VALUES('${message.guild.id}', '${toC}', '${chn.id}')`, err => {
                            console.log(err);
                            logs.send(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${err}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
                        });
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Suggestion Messages Are Redirected To <#${chn.id}>!**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                    } else {
                        db.all(`UPDATE config SET channel = '${chn.id}' WHERE guildid = '${message.guild.id}' AND type = '${toC}'`, err => {
                            console.log(err);
                            logs.send(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${err}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
                        });
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Suggestion Messages Are Redirected To <#${chn.id}>!**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                    } 
                });
            } 
            // else if (args[0] === "updates") {
            //     db.get(`SELECT * FROM config WHERE guildid = '${message.guild.id}' AND type = '${toC}'`, async (err, rows) => {
            //         if (rows === undefined) {
            //             db.all(`INSERT INTO config(guildid, type, channel) VALUES('${message.guild.id}', '${toC}', '${chn.id}')`, err => {
            //                 console.log(err);
            //                 logs.send(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${err}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
            //                 chn.createWebhook(`${this.client.user.username} Webhook Updates`, { avatar: this.client.user.displayAvatarURL(), reason: "Created Webhook For Update Messages!"});
            //             });
            //             message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Update Messages Are Redirected To <#${chn.id}>!**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
            //         } else {
            //             await chn.createWebhook(`${this.client.user.username} Webhook Updates`, { avatar: this.client.user.displayAvatarURL(), reason: "Created Webhook For Update Messages!"});
            //             let link = chn.fetchWebhooks().fetchWebhooks().then(w => w.find(e => e.name === `${this.client.user.uername} Webhook Updates`).url)
            //             db.all(`UPDATE config SET channel = '${chn.id}' WHERE guildid = '${message.guild.id}' AND type = '${toC}'`, err => {
            //                 console.log(err);
            //                 logs.send(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${err}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
            //             });
            //             message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Update Messages Are Redirected To <#${chn.id}>!**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
            //         }
            //     });
            // }
        } catch (error) {
            console.log(error);
            message.embed(new MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

