const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class PauseCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'lyrics',
            aliases: ["lyc"],
            group: 'music',
            memberName: 'lyrics',
            description: 'A Command To View The Lyrics Of The Specified Song!',
            examples: ["lyrics [Song's Name]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const name = args.join(" ");
            if (!name) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}lyrics [Song's Name]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            const url = `https://some-random-api.ml/lyrics?title=${name}`;
            let res;
            res = await fetch(url).then(url => url.json());
            message.channel.send(`**• Title - ${res.title}\n• Author - ${res.author}**\nLyrics - ${res.lyrics}`, { split: true })
        } catch (error) {
            console.error(error);
            return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
        }
    }
};

