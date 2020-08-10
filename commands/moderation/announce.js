const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class AnnounceCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'announce',
            aliases: ["anc"],
            group: 'moderation',
            memberName: 'announce',
            description: 'A Commamd To Make Announcements in a Particular Channel or In Which The Command Is Used!',
            examples: ["announce [#Channel] [Message]"],
            argsType: "multiple",
            guildOnly: true,
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
        });
    }
    async run(message, args) {
        try {
            let ancmessage;
            let mchannel = message.mentions.channels.first();
            if (!args.length > 1) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}announce [channel] [message]\` Or \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}announce [message]\` To Announce In The Channel Used!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            message.delete()
            if (mchannel) {
                ancmessage = args.slice(1).join(" ");
                if (!ancmessage) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}announce [channel] [message]\` Or \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}announce [message]\` To Announce In The Channel Used!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                const anc = new Discord.MessageEmbed()
                    .setDescription(`**${ancmessage}**`)
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()
                    .setColor(0x6bffe1)
                mchannel.send(anc);
            } else {
                ancmessage = args.join(" ");
                if (!ancmessage) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}announce [channel] [message]\` Or \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}announce [message]\` To Announce In The Channel Used!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
                const anc1 = new Discord.MessageEmbed()
                    .setDescription(`**${ancmessage}**`)
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()
                    .setColor(0xffc859)
                message.embed(anc1);
            }
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
        }
    }
};

