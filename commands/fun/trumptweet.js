const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class TTommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'trumptweet',
            aliases: ["tt"],
            group: 'fun',
            memberName: 'trumptweet',
            description: 'A Command See Trump Tweeting The Provided Text!',
            examples: ["trumptweet [Text]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let text = args.join(" ");
            if (!text) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}trumptweet [Text]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            let body = await fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&&text=${text}`).then(url => url.json());
            let ttembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setImage(body.message)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(ttembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

