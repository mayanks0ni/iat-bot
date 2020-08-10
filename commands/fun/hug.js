const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class HugCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hug',
            group: 'fun',
            memberName: 'hug',
            description: 'A Command To Get A Random Hug GIF!',
            examples: ["hug [User/User ID]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let user = this.client.users.cache.get(args[0]) || message.mentions.users.first();
            if (!user) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}hug [User/User ID]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            let body = await fetch(`https://nekos.life/api/v2/img/hug`).then(url => url.json());
            let hugembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`${message.author.username} Hugs ${user.username}! So cute!`)
                .setImage(body.url)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(hugembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

