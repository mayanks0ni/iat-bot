const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'unban',
            group: 'moderation',
            memberName: 'unban',
            description: 'A Command To Unban The Specified User From The Guild!',
            examples: ["unban [User ID/User Tag] [Reason]"],
            userPermissions: [
                "BAN_MEMBERS"
            ],
            clientPermissions: [
                "BAN_MEMBERS"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
   async run(message, args) {
            const id = args[0];
            const reason = args.slice(1).join(" ");
            if (!id) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}unban [User ID/User Tag] [Reason]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            try {
                await message.guild.members.unban(id, reason || "None").then(user => message.embed(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL()).setDescription(`**Successfully Unbanned ${user.username || user.tag || user.id || user}!**`).addField("**Moderator**", `**${message.author.tag}**`).addField("**Reason**", `**${reason || "None"}**`).setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp()))
            } catch (error) {
                console.log(error);
                message.embed(new Discord.MessageEmbed().setTitle("An Error Ocurred!").setDescription(`**Error: \`${error.message}\`**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
         }
     }
};

