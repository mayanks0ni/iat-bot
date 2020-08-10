const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class CovidCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'inrole',
            group: 'util',
            memberName: 'inrole',
            description: 'A Command To View The Members In A Particular Role!',
            examples: ["inrole [role]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        const rolename = args.join(" ");
        if (!rolename) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}inrole [rolename]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        if (!message.guild.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase())) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**No Such Role Found!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        const inroleEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTitle(`◻ Members With ${message.guild.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase()).name} Role! ◻`)
            .setDescription(message.guild.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase()).members.map(m => `**${m.user.tag}**`).join('\n'))
            .setFooter(`Total Member: ${message.guild.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase()).members.size} | ${message.guild.me.displayName}`)
            .setTimestamp()
            .setColor("RANDOM")
        message.embed(inroleEmbed);
    }
};

