const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SetStatusCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'setstatus',
            group: 'owner',
            memberName: 'setstatus',
            description: 'A Command To Set The Status Of The Bot!',
            examples: ["setstatus Playing OwO"],
            guildOnly: true,
            argsType: "multiple",
            ownerOnly: true,
        });
    }
    async run(message, args) {
        try {
            const type = args[0];
            const status = args.slice(1).join(" ");
            if (!status || !type) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used LIke This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}setstatus [PLAYING|WATCHING|LISTENING|STREAMIMG] [status]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            await this.client.user.setActivity(status, { type: type.toUpperCase() });
            const statusembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`**✅ Updated My Status to ${type.charAt(0).toUpperCase() + type.slice(1)} ${status}**`)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setColor("GREEN")
            message.embed(statusembed);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

