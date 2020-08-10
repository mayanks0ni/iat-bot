const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class KickCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'A Command To Kick The Mentioned User!',
            examples: ["kick [user] [reason]"],
            userPermissions: [
                "KICK_MEMBERS"
            ],
            clientPermissions: [
                "KICK_MEMBERS"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    run(message, args) {
        let logs = this.client.channels.cache.get("726414689805795418");
        const user1 = message.mentions.users.first() || message.guild.member(this.client.users.cache.get(args[0]));
        const reason = args.slice(1).join(" ");
        if (!user1) return message.channel.send(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}kick [user] [reason]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        if (user1) {
            const member1 = message.guild.member(user1);
            if (member1) {
                member1.kick(reason).then(() => {
                    const kickembed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setTitle('❌ Member Kicked')
                        .setDescription(`**✅ Succesfully Kicked ${this.client.users.cache.get(user1.id).tag}!**`)
                        .addField("**Moderator**", `**${message.author.tag}**`)
                        .addField(`**Reason**`, `**${reason || "None"}**`)
                        .setColor(0x00fa21)
                        .setFooter(message.guild.me.displayName)
                        .setTimestamp()
                    message.embed(kickembed)
                    logs.send(kickembed);
                }).catch(err => {
                    const error = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setDescription('**I Don\'t Have Enough Permissions!**')
                        .setColor(0xfa0000)
                        .setFooter(message.guild.me.displayName)
                        .setTimestamp()
                    message.embed(error);
                    console.error(err);
                });
            } else {
                const errembed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription('**The Mentioned User Is Not In The Guild!**')
                    .setColor(0xff0000)
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()
                message.embed(errembed);
            }
        }
    }
};

