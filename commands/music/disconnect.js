const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class DisconnectCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'disconnect',
            aliases: ["dc", "leave"],
            group: 'music',
            memberName: 'disconnect',
            description: 'A Command To Stop The Dispatcher And Disconnect The Bot From The Voice Channel!',
            examples: ["disconnect"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            if (!message.member.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**You Should Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!message.guild.me.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**I Am Not In Any Voice Channel Currently!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            message.member.voice.channel.leave();
            this.client.queue.delete(message.guild.id);
            message.embed(new Discord.MessageEmbed().setDescription("**🛑 Player Has Been Stopped And Disconnected! 🛑**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

