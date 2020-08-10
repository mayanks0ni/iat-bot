const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            description: 'A Command To Unmute The Specified Member!',
            examples: ["unmute [user] [reason]"],
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            clientPermissions: [
                "MANAGE_ROLES"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
    let logs = this.client.channels.cache.get("726414689805795418");
    let member = message.mentions.members.first() || message.guild.member(this.client.users.cache.get(args[1]));
    if(!member) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}unmute [member] [reason]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    if(!member.roles.cache.find(r => r.name === "Muted")) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Specified User Is Already Unmuted!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    let reason = args.slice(1).join(" ");

    let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");

    await member.roles.remove(muterole)
    const mEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setTitle(`${member.user.tag} Has Been Unmuted!`)
    .addField(`**Moderator**`, `**${message.author.tag}**`)
    .addField(`**Reason**`, `**${reason || "None"}**`)
    .setColor(0x00ff90)
    .setFooter(message.guild.me.displayName)
    .setTimestamp()
    message.embed(mEmbed);
    logs.send(mEmbed);
    }
};

