const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PauseCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'A Command To Pause The Playback!',
            examples: ["pause"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const serverQueue = this.client.queue.get(message.guild.id);
            if (!message.member.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**You Should Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!message.guild.me.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**I Am Not In Any Voice Channel Currently!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!serverQueue.songs[0]) return message.embed(new Discord.MessageEmbed().setDescription("**There Are No Songs To Pause!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            serverQueue.connection.dispatcher.pause();
            message.embed(new Discord.MessageEmbed().setDescription(`**⏸️ Paused \`${serverQueue.songs[0].title}\` ⏸️**`).setColor(0x86ff00).setFooter(message.guild.me.displayName).setTimestamp());
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

