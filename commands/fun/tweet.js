const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class Tweetommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tweet',
            group: 'fun',
            memberName: 'tweet',
            description: 'A Command To Tweet Through The Provided Text!',
            examples: ["tweet [Username] [Text]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let text = args.slice(1).join(" ");
            let uname = args[0];
            if (!text || !uname) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}tweet [Username] [Text]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            let body = await fetch(`https://nekobot.xyz/api/imagegen?type=tweet&&username=${uname}&&text=${text}`).then(url => url.json());
            let tweetembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setImage(body.message)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(tweetembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

