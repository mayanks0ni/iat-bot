const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class VolumeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'volume',
            aliases: ["vol"],
            group: 'music',
            memberName: 'volume',
            description: 'A Command To Set The Volume!',
            examples: ["volume 50"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            let vol = args[0];
            const serverQueue = this.client.queue.get(message.guild.id);
            if (!message.member.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**You Should Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!message.guild.me.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**I Am Not In Any Voice Channel Currently!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!serverQueue.songs[0]) return message.embed(new Discord.MessageEmbed().setDescription("**There's Nothing Playing Right Now!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!vol) return message.channel.send(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${prefix}volume [volume]\`!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (isNaN(vol) || vol > 100 || vol < 0) return message.channel.send(new Discord.MessageEmbed().setDescription("**Please Enter A Valid Number Between 0 and 100!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            try {
                serverQueue.connection.dispatcher.setVolumeLogarithmic(vol / 100);
                message.embed(new Discord.MessageEmbed().setTitle(`🔊 Changed The Volume To \`${vol}\` 🔊`).setColor(0x4f00ff).setFooter(message.guild.me.displayName).setTimestamp());
            } catch (e) {
                console.log(e);
                message.embed(new Discord.MessageEmbed().setTitle("There Was An Error In Setting That Volume!\nMake Sure That Volume Level Is Between 0 and 100.").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
            }
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

