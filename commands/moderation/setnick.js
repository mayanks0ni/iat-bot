const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SetNickCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'setnick',
            aliases: ["nick"],
            group: 'moderation',
            memberName: 'setnick',
            description: 'A Command To Change The Nickname Of The Mentioned User!',
            examples: ["setnick [User] [New Nick]"],
            userPermissions: ["MANAGE_NICKNAMES"],
            clientPermissions: ["MANAGE_NICKNAMES"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        let logs = this.client.channels.cache.get("726414689805795418");
        const user = message.mentions.members.first() || message.guild.member(this.client.users.cache.get(args[0]));
        const nickname = args.slice(1).join(" ");
        if (!user) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}setnick [User] [New Nick]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        try {
            await user.setNickname(nickname)
            message.embed(new Discord.MessageEmbed().setTitle(`Successfully Changed ${user.user.tag}'s Nickname To ${nickname}!`).setColor("RANDOM").setFooter(message.guild.me.displayName).setTimestamp());
            logs.send(new Discord.MessageEmbed().setTitle(`Successfully Changed ${user.user.tag}'s Nickname To ${nickname}!`).setColor("RANDOM").setFooter(message.guild.me.displayName).setTimestamp())
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle(`An Error Occured!`).setDescription(`**Error: ${error}**`).setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName))
        }
    }
};

