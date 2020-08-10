const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ms = require("parse-ms");

module.exports = class UptimeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'uptime',
            group: 'info',
            memberName: 'uptime',
            description: 'A Command To View The Uptime Of The Bot!',
            examples: ["uptime"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            let upt = ms(Date.now() - this.client.readyTimestamp);
            let uptimeembed = new Discord.MessageEmbed()
                .setColor("GOLD")
                .setDescription(`**Uptime - ${upt.days} Days ${upt.hours} Hours ${upt.minutes} Minutes ${upt.seconds} Seconds!**`)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            message.embed(uptimeembed);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

