const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class HentaiCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hentai',
            group: 'nsfw',
            memberName: 'hentai',
            description: 'A Command To View Hentai Images/GIFs!',
            examples: ["hentai"],
            argsType: "multiple",
            guildOnly: true,
            nsfw: true,
        });
    }
    async run(message, args) {
        try {
            let body = await fetch(`https://nekobot.xyz/api/image?type=hentai_anal`).then(url => url.json());
            let nsfwembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Hentai Image/GIF For ${message.author.tag}!`)
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

