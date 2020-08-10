const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class RcolorCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'rolecolor',
            aliases: ["rcolor", "rc"],
            group: 'moderation',
            memberName: 'rolecolor',
            description: 'A Command To Change The Colour Of The Specified Role!',
            examples: ["rolecolor [#HEX Code] [Role's Name]"],
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            clientPermissions: [
                "MANAGE_ROLES"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        let rcolor = args[0];
        let rname = args.slice(1).join(" ");
        if (!rcolor || !rname) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}rolecolor [#HEX Code] [Role's Name]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        if(/^#[0-9A-F]{6}$/i.test(rcolor) === false) return message.embed(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**Invalid HEX Color!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === rname.toLowerCase())
        if (!role) return message.embed(new Discord.MessageEmbed().setTitle(`Role With That Name Doesn't Exists! Please Type The Role's Exact Same Name!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        try {
            await role.setColor(rcolor);
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**Error: \`${error}\`**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
        message.embed(new Discord.MessageEmbed().setTitle("✅ Role's Color Changed Successfully! ✅").addField("**• Role's Name**", `**${rname}**`).addField("**• HEX Color**", `**${rcolor}**`).setColor(`${rcolor}`).setFooter(message.guild.me.displayName).setTimestamp());
    }
};

