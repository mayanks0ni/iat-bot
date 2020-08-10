const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class FactCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'fact',
            group: 'fun',
            memberName: 'fact',
            description: 'A Command To Get A Random Fact!',
            examples: ["fact"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let body = await fetch(`https://nekos.life/api/v2/fact`).then(url => url.json());
            let factembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle('📄 Random Fact')
                .setDescription(`**${body.fact}**`)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(factembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

