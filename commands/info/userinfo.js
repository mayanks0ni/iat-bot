const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require("moment");

module.exports = class UserInfoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'userinfo',
            aliases: ["uinfo", "ui"],
            group: 'info',
            memberName: 'userinfo',
            description: 'A Command To View Your Information Or Of The Mentioned User!"',
            examples: ["userinfo"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const status = {
                online: "Online",
                idle: "Idle",
                dnd: "Do Not Disturb",
                offline: "Offline/Invisible"
            };

            var permissions = [];
            var acknowledgements = 'None';
            const member = message.mentions.members.first() || message.guild.member(this.client.users.cache.get(args[0])) || message.member;

            if (member.permissions.has("KICK_MEMBERS")) {
                permissions.push("Kick Members");
            }

            if (member.permissions.has("BAN_MEMBERS")) {
                permissions.push("Ban Members");
            }

            if (member.permissions.has("ADMINISTRATOR")) {
                permissions.push("Administrator");
            }

            if (member.permissions.has("MANAGE_MESSAGES")) {
                permissions.push("Manage Messages");
            }

            if (member.permissions.has("MANAGE_CHANNELS")) {
                permissions.push("Manage Channels");
            }

            if (member.permissions.has("MENTION_EVERYONE")) {
                permissions.push("Mention Everyone");
            }

            if (member.permissions.has("MANAGE_NICKNAMES")) {
                permissions.push("Manage Nicknames");
            }

            if (member.permissions.has("MANAGE_ROLES")) {
                permissions.push("Manage Roles");
            }

            if (member.permissions.has("MANAGE_WEBHOOKS")) {
                permissions.push("Manage Webhooks");
            }

            if (member.permissions.has("MANAGE_EMOJIS")) {
                permissions.push("Manage Emojis");
            }

            if (member.permissions.has("SEND_MESSAGES")) {
                permissions.push("Send Messages");
            }

            if (member.permissions.has("ADD_REACTIONS")) {
                permissions.push("Add Reactions");
            }

            if (member.permissions.has("CHANGE_NICKNAME")) {
                permissions.push("Change Nickname");
            }

            if (member.permissions.has("CONNECT")) {
                permissions.push("Connect");
            }

            if (member.permissions.has("DEAFEN_MEMBERS")) {
                permissions.push("Deafen Members");
            }

            if (member.permissions.has("READ_MESSAGE_HISTORY")) {
                permissions.push("Read Message History");
            }

            if (member.permissions.has("MUTE_MEMBERS")) {
                permissions.push("Mute Members");
            }

            if (member.permissions.has("SPEAK")) {
                permissions.push("Speak");
            }

            if (permissions.length === 0) {
                permissions.push("No Permissions Found!");
            }

            if (member.permissions.has("MANAGE_MESSAGES")) {
                acknowledgements = "Server Moderator"
            }

            if (member.permissions.has("ADMINISTRATOR")) {
                acknowledgements = "Server Admin"
            }

            if (member.user.id == message.guild.ownerID) {
                acknowledgements = 'Server Owner';
            }

            let p;

            if (permissions.length > 5 && permissions.includes("Administrator")) {
                p = "Administrator, Kick Memebers, Ban Members..."
            }
             
            else if (permissions.length > 5) {
                p = "Too Many Permissions To Show!"
            }
            
            else {
                p = permissions.join(", ");
            }

            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${member.user.id}>`)
                .setAuthor(`${member.user.tag}`, member.user.avatarURL())
                .setColor("RANDOM")
                .setFooter(`ID - ${member.id}`)
                .setThumbnail(member.user.displayAvatarURL)
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL())
                .addField("**Status**", `**${status[member.user.presence.status]}**`, true)
                .addField('**Joined at: **', `**${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}**`, true)
                .addField("** Account Created at: **", `**${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}**`, true)
                .addField("**Current Activity**", `**${member.user.presence.activities}**`, true)
                .addField("**Permissions: **", `**${p}**`, true)
                .addField(`**Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]**`, `**${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "No Roles"}**`, true)
                .addField("**Acknowledgements: **", `**${acknowledgements}**`, true);

            message.embed(embed);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

