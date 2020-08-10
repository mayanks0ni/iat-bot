const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class RoleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'role',
            aliases: ['addrole'],
            group: 'moderation',
            memberName: 'role',
            description: 'A Command To Give/Take a Role!!',
            examples: ["role [user] [role]"],
            userPermissions: [
                "MANAGE_ROLES"
            ],

            clientPermission: [
                "MANAGE_ROLES"
            ],
            argsType: "multiple",
            argsCount: 2,
            guildOnly: true,
        });
    }
    async run(message, args) {
        let logs = this.client.channels.cache.get("726414689805795418");
        let member = message.guild.member(this.client.users.cache.get(args[0])) || message.mentions.members.first();
        let rolename = args.slice(1).join(" ");
        if (!member || !rolename) return message.embed(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}role [user] [role]\`!**`).setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName));
        let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase());
        if (!role) return message.embed(new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL).setDescription(`**No Such Role Found!**`).setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName));
        if (!member.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase())) {
            try {
                await member.roles.add(role);
                let owo = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("✅ Successfully Added Role!").addField("**Member**", `**${member.user.tag}**`).addField("**Role Added**", `**${role.name}**`).setFooter(message.guild.me.displayName).setColor("GREEN")
                message.embed(owo);
                logs.send(owo);
            } catch (error) {
                console.log(error)
                return message.embed(new MessageEmbed().setDescription("**Looks Like I Don\'t Have Permissions To Add That Role!\nI Can\'t Add Role That Are Above My Role!**").setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName))
            }
        } else {
            try {
                await member.roles.remove(role);
                let uwu = new MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("✅ Successfully Removed Role!").addField("**Member**", `**${member.user.tag}**`).addField("**Role Removed**", `**${role.name}**`).setFooter(message.guild.me.displayName).setColor("GREEN")
                message.embed(uwu);
                logs.send(uwu);
            } catch (error) {
                console.log(error)
                return message.embed(new MessageEmbed().setDescription("**Looks Like I Don\'t Have Permissions To Remove That Role!\nI Can\'t Remove Role That Are Above My Role!**").setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName))
            }
        }
    }
};

