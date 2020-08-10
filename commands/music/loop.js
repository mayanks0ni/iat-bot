const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class LoopCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'loop',
            group: 'music',
            memberName: 'loop',
            description: 'A Command To Loop The Current Song!',
            examples: ["loop"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const serverQueue = this.client.queue.get(message.guild.id);
            if (!message.member.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**You Should Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!message.guild.me.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**I Am Not In Any Voice Channel Currently!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!serverQueue.songs[0]) return message.embed(new Discord.MessageEmbed().setDescription("**There's Nothing To Loop!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (serverQueue.songs[0].loop === false) {
                serverQueue.songs[0].loop = true;
                message.embed(new Discord.MessageEmbed().setDescription(`**🔁 Repeat Turned On For Current Song! 🔁**`).setColor(0x86ff00).setFooter(message.guild.me.displayName).setTimestamp());
            } else {
                serverQueue.songs[0].loop = false;
                message.embed(new Discord.MessageEmbed().setDescription(`**✖ Repeat Turned Off For Current Song! ✖**`).setColor(0x86ff00).setFooter(message.guild.me.displayName).setTimestamp());
            }
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

