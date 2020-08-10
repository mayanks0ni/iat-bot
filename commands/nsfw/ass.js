const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class AssCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ass',
            group: 'nsfw',
            memberName: 'ass',
            description: 'A Command To View Ass Images!',
            examples: ["ass"],
            argsType: "multiple",
            guildOnly: true,
            nsfw: true,
        });
    }
    async run(message, args) {
        try {
            let body = await fetch(`https://nekobot.xyz/api/image?type=ass`).then(url => url.json());
            let nsfwembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Ass Image For ${message.author.tag}!`)
                .setImage(body.message)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(nsfwembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

