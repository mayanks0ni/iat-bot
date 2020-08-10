const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = class DMCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'slowmode',
            group: 'moderation',
            memberName: 'slowmode',
            description: 'A Command To Set Slowmode In The Channel Used!',
            examples: ["slowmode [1s/1m/1h]"],
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            clientPermissions: [
                "MANAGE_CHANNELS"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    run(message, args) {
        let duration1 = args[0];
        function checkDuration(duration) {
            if (duration.endsWith("s")) {
                return true;
            } else if (duration.endsWith("m")) {
                return true;
            } else if (duration.endsWith("h")) {
                return true;
            } else if (duration.endsWith("S")) {
                return true;
            } else if (duration.endsWith("M")) {
                return true;
            } else if (duration.endsWith("H")) {
                return true;
            } else {
                return false;
            }
        }
        if (!duration1 || checkDuration(duration1) === false) return message.embed(new MessageEmbed().setDescription(`**This Message Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}slowmode [1s/1m/1h]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        try {

            message.channel.setRateLimitPerUser(ms(duration1) / 1000)
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`**Successfully Enabled Slowmode For ${message.channel}, Duration: ${duration1}**`)
                .setColor("GREEN")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            message.embed(embed);
        } catch (error) {
            console.log(error);
            message.embed(new MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};