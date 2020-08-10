const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class CmmCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'trash',
            group: 'fun',
            memberName: 'trash',
            description: 'A Command To Get The Trash Image Of Yourself Or The Mentioned User!',
            examples: ["trash [User/User ID]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let user = this.client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;
            let body = await fetch(`https://nekobot.xyz/api/imagegen?type=trash&&url=${user.displayAvatarURL()}`).then(url => url.json());
            let trashembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setImage(body.message)
                .setTimestamp()
                .setFooter(message.guild.me.displayName)
            message.embed(trashembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

