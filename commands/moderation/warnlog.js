const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3").verbose();

module.exports = class WarnLogCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'warnlog',
            group: 'moderation',
            memberName: 'warnlog',
            description: 'A Command To View The Warnlog Of The Specified User!',
            examples: ["warnlog [user]"],
            guildOnly: true,
            argsType: "multiple",
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
        });
    }
    run(message, args) {
        try {
            let warnLog = new sqlite.Database("./database/warnLog.db", err => {
                if (err) {
                    console.error(err);
                }
            });
            const user = message.mentions.users.first() || this.client.users.cache.get(args[0]);
            if (!user) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}warnlog [user]\`!`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            warnLog.all(`SELECT * FROM warnlog WHERE userid = '${user.id}' ORDER BY id DESC LIMIT 5`, (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (rows.length < 1) return message.embed(new Discord.MessageEmbed().setDescription("**No Warnings Found For The Specified User!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                var i;
                const warnEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setTitle(`⚠ Warnlog Of ${user.tag} ⚠`)
                    .setColor("YELLOW")
                    .setThumbnail(user.displayAvatarURL())
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()
                for (i = 0; i < rows.length; i++) {
                    const w = rows[i]
                    warnEmbed.addField(`\`#${i + 1}\`` + "**At**" + " " + `**${w.dt}**` + " " + "**By**" + " " + `**${w.wby}**`, "**Reason:**" + " " + `**${w.reason}**` + " ")
                }
                message.embed(warnEmbed)

            });
            warnLog.close();
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle(`An Error Occured!`).setDescription(`**Error: ${error}**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
        }
    }
};
