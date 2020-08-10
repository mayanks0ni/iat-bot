const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class FourKCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: '4k',
            group: 'nsfw',
            memberName: '4k',
            description: 'A Command To View 4k Nudes!',
            examples: ["4k"],
            argsType: "multiple",
            guildOnly: true,
            nsfw: true,
        });
    }
    async run(message, args) {
        try {
            let body = await fetch(`https://nekobot.xyz/api/image?type=4k`).then(url => url.json());
            let fourk = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`4k Image For ${message.author.tag}!`)
                .setImage(body.message)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(fourk);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

