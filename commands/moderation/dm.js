const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class DMCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'dm',
            aliases: ['send'],
            group: 'moderation',
            memberName: 'dm',
            description: 'A Command To Direct Message The Mentioned User To Through The Bot!',
            examples: ["dm [user] [message]"],
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
    run(message, args) {
        let user = this.client.users.cache.get(args[0]) || message.mentions.users.first();
        let msg = args.slice(1).join(" ");
        if (!user || !msg) return message.embed(new MessageEmbed().setTitle(`This Message Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}dm [user] [message]\`!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        try {
            const embed = new MessageEmbed()
                .setAuthor(`${user.tag}`, user.displayAvatarURL())
                .setDescription(`**${msg}**`)
                .setColor("YELLOW")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            user.send(embed)
            message.embed(new MessageEmbed().setDescription("**✅ Successfully Sent The Message To The User!**").setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp());
        } catch (error) {
            console.log(error);
            message.embed(new MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

