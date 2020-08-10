const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class CmmCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'changemymind',
            aliases: ["cmm"],
            group: 'fun',
            memberName: 'changemymind',
            description: 'A Command To Get A Change My Mind Image For The Provided Text!',
            examples: ["changemymind [This Bot Will Be Verified]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let text = args.join(" ");
            if (!text) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}changemymind [Text]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            let body = await fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&&text=${text}`).then(url => url.json());
            let cmmembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setImage(body.message)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(cmmembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

