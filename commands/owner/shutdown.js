const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ShutdownCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'shutdown',
            group: 'owner',
            memberName: 'shutdown',
            description: 'A Command To Shutdown The Bot!',
            examples: ["shutdown"],
            guildOnly: true,
            ownerOnly: true,
        });
    }
    async run(message) {
        try {
            const loading = this.client.emojis.cache.get("719087451100151858");
            const sd = await message.embed(new Discord.MessageEmbed().setDescription(`**${loading} Bot Is Shutting Down..**`).setColor("GREEN").setTimestamp().setFooter(message.guild.me.displayName));
            setTimeout(async function () {
                await sd.edit(new Discord.MessageEmbed().setDescription("**Bot Has Been Shutdown Successfully!**").setColor("GREEN").setTimestamp().setFooter(message.guild.me.displayName))
                process.exit();
            }, 5000);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

