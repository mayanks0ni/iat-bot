const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require("fs");
const { MessageAttachment } = require("discord.js");

module.exports = class GuildsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'guilds',
            group: 'owner',
            memberName: 'guilds',
            description: 'A Command To View The Servers The Bot Is In!',
            examples: ["guilds"],
            guildOnly: true,
            ownerOnly: true,
        });
    }
    async run(message) {
        try {
            fs.writeFile("./guilds.txt", this.client.guilds.cache.map(g => `Guild Name: ${g.name + ", Guild ID: " + g.id}`).join("\n"), err => console.log(err));
            const attachment = new MessageAttachment("./guilds.txt")
            message.say(attachment);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

