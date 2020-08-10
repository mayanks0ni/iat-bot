const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class WallpaperCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'wallpaper',
            aliases: ["wp"],
            group: 'fun',
            memberName: 'wallpaper',
            description: 'A Command To Get A Random Wallpaper!',
            examples: ["wallpaper"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let body = await fetch(`http://www.splashbase.co/api/v1/images/random`).then(url => url.json());
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Wallpaper For ${message.author.tag}!`)
                .setImage(body.url)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(embed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

