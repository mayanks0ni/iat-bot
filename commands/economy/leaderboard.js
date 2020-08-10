const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class LeaderboardCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'leaderboard',
            aliases: ["lb", "ld"],
            group: 'economy',
            memberName: 'leaderboard',
            description: 'A Command To View The Economy Leaderboard!',
            examples: ["leaderboard"],
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

            let userInfo = `SELECT * FROM userdb ORDER BY bal DESC LIMIT 5`;

            db.all(userInfo, (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**An Error Occured! Please Try Again..!!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    var i;
                    let lb = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setTitle("📜 Economy Leaderboard 📜")
                        .setFooter(message.guild.me.displayName)
                        .setThumbnail(this.client.user.displayAvatarURL())
                        .setColor("YELLOW")
                        .setTimestamp()
                    for (i = 0; i < row.length; i++) {
                        let r = row[i];
                        lb.addField(`\`#${i + 1}\` **${this.client.users.cache.find(user => user.id == r.userId).tag}**`, `**Balance - ${r.bal}${diamond}**`)
                    }
                    message.embed(lb)
                }
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

