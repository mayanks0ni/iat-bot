const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class InviteCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'invite',
            group: 'info',
            memberName: 'invite',
            description: 'A Command To Get The Invite Link To Invite The Bot To Your Server!',
            examples: ["invite"],
            guildOnly: true,
        });
    }
    async run(message) {
        try {
            const invite = await this.client.generateInvite(["ADMINISTRATOR"]);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**[Click Me](<${invite}>) To Invite The Bot To Your Server!**`).setFooter(message.guild.me.displayName).setColor(message.guild.me.displayHexColor).setTimestamp());
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

