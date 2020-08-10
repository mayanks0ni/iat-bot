const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ShutdownCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'restart',
            group: 'owner',
            memberName: 'restart',
            description: 'A Command To Reload All The Commands!',
            examples: ["restart"],
            guildOnly: true,
            ownerOnly: true,
        });
    }
    async run(message) {
        try {
            const loading = this.client.emojis.cache.get("719087451100151858");
            const sd = await message.embed(new Discord.MessageEmbed().setDescription(`**${loading} Bot Is Restarting..**`).setColor("GREEN").setTimestamp().setFooter(message.guild.me.displayName));
            this.client.registry.commands.forEach((cmd, key) => {
                cmd.reload();
            });
            setTimeout(async function () {
                await sd.edit(new Discord.MessageEmbed().setDescription("**Bot Has Been Restarted Successfully!**").setColor("GREEN").setTimestamp().setFooter(message.guild.me.displayName))
            }, 5000);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};