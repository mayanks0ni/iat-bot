const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class EmojiCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'emoji',
            group: 'util',
            memberName: 'emoji',
            description: 'A Command To View The The Information Of The Emoji!',
            examples: ["emoji <:hmm:721232726702686258>"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        const emoji = args[0]
        let isAni;
        if (!emoji) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}emoji [emoji]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        try {
            let e = Discord.Util.parseEmoji(emoji);
        if (e.id === null) return message.embed(new Discord.MessageEmbed().setDescription("**That Wasn't A Valid Emoji!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        if (e.animated) {
            isAni = ".gif"
        } else {
            isAni = ".png"
        }

        const emojiEmbed = new Discord.MessageEmbed()
            .setTitle("Emoji Information")
            .setDescription(`**• Emoji ID: ${e.id}\n\n• Emoji Name: ${e.name}\n\n• Animated: ${e.animated}**`)
            .setImage(`https://cdn.discordapp.com/emojis/${e.id}${isAni}?v=1`)
            .setColor("RANDOM")
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
        message.embed(emojiEmbed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

