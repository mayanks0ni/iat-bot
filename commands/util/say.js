const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'say',
            group: 'util',
            memberName: 'say',
            description: 'A Command To Send The Message Through The Bot!',
            examples: ["say [Message]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let saymessage = args.join(" ");
            if (!saymessage) return message.embed(new Discord.MessageEmbed().setDescription(`**You Need To Provide A Text To Send!**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            message.delete();
            message.say(saymessage);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

