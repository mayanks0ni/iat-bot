const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class QueueCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'queue',
            aliases: ["q"],
            group: 'music',
            memberName: 'queue',
            description: 'A Command To View The Queue!',
            examples: ["queue"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const serverQueue = this.client.queue.get(message.guild.id);
            if (!message.member.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**You Should Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!message.guild.me.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**I Am Not In Any Voice Channel Currently!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!serverQueue) return message.embed(new Discord.MessageEmbed().setDescription("**There Are No Songs In The Queue!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!serverQueue.songs[0]) return message.embed(new Discord.MessageEmbed().setDescription("**There's Nothing In The Queue!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            message.embed(new Discord.MessageEmbed().setTitle(`🎶 Queued Songs 🎶`).setDescription(`${serverQueue.songs.map((queueSong, i) => `**${i+1}). ** **${queueSong.title}**`).join("\n")}`).setColor(0x00ffc1).setFooter(message.guild.me.displayName).setTimestamp());
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

