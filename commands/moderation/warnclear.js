const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3").verbose();

module.exports = class WarnClearCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'warnclear',
            aliases: ["wclear"],
            group: 'moderation',
            memberName: 'warnclear',
            description: 'A Command To Clear All The Warnings Of The Specified User!',
            examples: ["warnclear [user] [reason]"],
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
            if (err) {
                console.error(err);
            }
        });
        const user = message.mentions.users.first() || this.client.users.cache.get(args[0]);
        let reason = args.slice(1).join(" ");
        if (!user) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}warnclear [user] [reason]\`!`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));

        warnLog.all(`DELETE FROM warnlog WHERE userid = '${user.id}'`, (err, rows) => {
            if (err) {
                console.error(err);
            }
            if (rows === undefined) return message.embed(new Discord.MessageEmbed().setDescription("**No Warnings Found For The Specified User!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
            const warnEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle(`⚠ Cleared All Warnings For ${user.tag} ⚠`)
                .addField("**Moderator**", `**${message.author.tag}**`)
                .addField(`**Reason**`, `**${reason || "None"}**`)
                .setColor("GREEN")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            message.embed(warnEmbed);
            logs.send(warnEmbed);
        });
        warnLog.close();
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle(`An Error Occured!`).setDescription(`**Error: ${error}**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
        }
    }
};
