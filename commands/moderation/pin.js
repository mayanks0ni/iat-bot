const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PinCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pin',
            group: 'moderation',
            memberName: 'pin',
            description: 'A Command To Pin A Message By Providing Its ID!!',
            examples: ["pin [Message ID]"],
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            clientPermissions: [
                "MANAGE_MESSAGES"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
   async run(message, args) {
            const id = args[0];
            if (!id) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}pin [Message ID]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            try {
                (await message.channel.messages.fetch(id)).pin();
            } catch (error) {
                console.log(error);
                message.embed(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
         }
     }
};

