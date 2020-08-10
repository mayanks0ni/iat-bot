const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'A Command To Ban The Mentioned User!',
            examples: ["ban [user] [reason]"],
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
        let logs = this.client.channels.cache.get("726414689805795418");
        const user1 = message.mentions.users.first() || message.guild.member(this.client.users.cache.get(args[0])) || args[0];
        const reason = args.slice(1).join(" ");
        if (!user1) return message.channel.send(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}ban [user] [reason]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        if (user1) {
            try {
                await message.guild.members.ban(user1).then(user => message.embed(new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle('🔨 Member Banned')
                .setDescription(`**✅ Succesfully Banned ${user.username || user.tag || user.id || user}!**`)
                .addField("**Moderator**", `**${message.author.tag}**`)
                .addField(`**Reason**`, `**${reason || "None"}**`)
                .setColor(0x00fa21)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()));
            } catch (error) {
                console.log(error);
                message.embed(new Discord.MessageEmbed().setTitle("An Error Ocurred!").setDescription(`**Error: \`${error.message}\`**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            }
        }
    }
};

