const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class MuteCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'A Command To Mute The Specified Member!',
            examples: ["mute [user] [reason]"],
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            clientPermissions: [
                "MANAGE_ROLES",
                "MANAGE_CHANNELS"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        let logs = this.client.channels.cache.get("726414689805795418");
        let member = message.mentions.members.first() || message.guild.member(this.client.users.cache.get(args[1]));
        if (!member) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}mute [member] [reason]\``).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        if (member.roles.cache.find(r => r.name === "Muted")) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Specified User Is Already Muted!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        let reason = args.slice(1).join(" ");

        let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#000000",
                        permissions: [],
                    },
                    reason: "Created Role For Muting People!",
                })
                await message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.error(e);
            }
        } try {
            await member.roles.add(muterole)
        } catch (e) {
            console.log(e);
            return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**I Don't Have Enough Permissions!**").setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName))
        }

        const mEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTitle(`${member.user.tag} Has Been Muted!`)
            .addField(`**Moderator**`, `**${message.author.tag}**`)
            .addField(`**Reason**`, `**${reason || "None"}**`)
            .setColor(0x00ff90)
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
        message.embed(mEmbed);
        logs.send(mEmbed);

        const mmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setTitle(`You Have Been Muted In ${message.guild.name}!`)
            .addField(`**Moderator**`, `**${message.author.tag}**`)
            .addField(`**Reason**`, `**${reason || "None"}**`)
            .setColor(0x00ff90)
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
        member.user.send(mmbed)
    }
};

