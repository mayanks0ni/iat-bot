const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3").verbose();

module.exports = class WarnCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'warn',
            group: 'moderation',
            memberName: 'warn',
            description: 'A Command To Warn The Specified User!',
            examples: ["warn [user] [reason]"],
            guildOnly: true,
            argsType: "multiple",
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
        });
    }
    run(message, args) {
        try {
            let logs = this.client.channels.cache.get("726414689805795418");
        let warnLog = new sqlite.Database("./database/warnLog.db", err => {
            console.error(err);
        });
        const user = message.mentions.users.first() || this.client.users.cache.get(args[0]);
        let reason = args.slice(1).join(" ");
        if (!user) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}warn [user] [reason]\`!`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
        const warnEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTitle(`⚠ Warned ${user.tag} ⚠`)
            .addField(`**Moderator**`, `**${message.author.tag}**`)
            .addField(`**Reason**`, `**${reason || "None"}**`)
            .setThumbnail(user.displayAvatarURL())
            .setColor("YELLOW")
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
        user.send(warnEmbed).catch(err => console.log(err));
        message.embed(warnEmbed);
        logs.send(warnEmbed);
        warnLog.all(`INSERT INTO warnlog (username, userid, wby, reason, dt) VALUES ('${user.tag}', '${user.id}', '${message.author.tag}', '${reason || "None"}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}')`, err => {
            if (err) {
                console.error(err);
            }
        });
        warnLog.close();
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle(`An Error Occured!`).setDescription(`**Error: ${error}**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
        }
    }
};
