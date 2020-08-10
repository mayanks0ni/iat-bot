const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class LroleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'listrole',
            aliases: ["lr"],
            group: 'util',
            memberName: 'listrole',
            description: 'A Command To View All The Roles Of The Guild!',
            examples: ["listrole"],
            guildOnly: true,
        });
    }
    async run(message, args) {
        const roles = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTitle(`📃 List Of Roles Of ${message.guild.name}`)
        .setDescription(message.guild.roles.cache.map(r => `${r}`).join(" | "))
        .setFooter(message.guild.me.displayName)
        .setTimestamp()
        .setColor("RANDOM")
    message.embed(roles);
    }
};

