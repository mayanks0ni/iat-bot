const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ClearCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'clear',
            aliases: ["purge", "del"],
            group: 'moderation',
            memberName: 'clear',
            description: 'A Command To Purge The Specified Amount Of Messages In The Channel Used!',
            examples: ["clear 5"],
            argsType: "multiple",
            guildOnly: true,
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            clientPermissions: [
                "MANAGE_MESSAGES"
            ],
        });
    }
    async run(message, args) {
        try {
            if(args[0] < 1) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}clear [amount]\`!**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
    if(args[0] < 1 || args[0] > 100 || isNaN(args[0])) return message.embed(new Discord.MessageEmbed().setDescription("**The Amount Should Be Greater Than 0 And Less Than 100!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
    await message.delete().catch(err =>  console.log(err));
    await message.channel.messages.fetch({limit: args[0]}).then(m => message.channel.bulkDelete(m)).catch(err =>  message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${err}**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000)));
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
        }
    }
};

