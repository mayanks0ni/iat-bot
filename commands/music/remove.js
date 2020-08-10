const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class RemoveCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'remove',
            aliases: ["rem"],
            group: 'music',
            memberName: 'remove',
            description: 'A Command To Remove A Song From The Queue!',
            examples: ["remove [Songs\'s Index]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const index = args[0];
            if(!index) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}remove [Song's Index]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            const serverQueue = this.client.queue.get(message.guild.id);
            if (!message.member.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**You Should Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!message.guild.me.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**I Am Not In Any Voice Channel Currently!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!serverQueue.songs[0]) return message.embed(new Discord.MessageEmbed().setDescription("**There's Nothing To Remove!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if(!serverQueue.songs[index]) return;
            serverQueue.songs.splice(index - 1);
            message.embed(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL()).setDescription("**Successfully Removed The Song!**").setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp());
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

