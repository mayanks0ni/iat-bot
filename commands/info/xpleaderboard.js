const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class XPLeaderboardCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'xpleaderboard',
            aliases: ["xplb"],
            group: 'info',
            memberName: 'xpleaderboard',
            description: 'A Command To View The XP Leaderboard!',
            examples: ["xpleaderboard"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/xp.db", err => {
                if (err) console.log(err);
            });

            let userInfo = `SELECT * FROM xp ORDER BY xp DESC LIMIT 5`;
            db.all(userInfo, (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**An Error Occured! Please Try Again..!!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    var i;
                    let xplb = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setTitle("📜 XP Leaderboard 📜")
                        .setFooter(message.guild.me.displayName)
                        .setThumbnail(this.client.user.displayAvatarURL())
                        .setColor("YELLOW")
                        .setTimestamp()
                    for (i = 0; i < row.length; i++) {
                        let r = row[i];
                        xplb.addField(`\`#${i + 1}\` **${this.client.users.cache.find(u => u.id == r.userId).tag || "User Not In The Server!"}**`, `**XP - ${r.xp}**`)
                    }
                    message.embed(xplb)
                }
            });
            db.close();
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

