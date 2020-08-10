const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ServerInfoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'serverinfo',
            aliases: ["sinfo", "si"],
            group: 'info',
            memberName: 'serverinfo',
            description: 'A Command To View The Server\'s Information!',
            examples: ["serverinfo"],
            guildOnly: true,
        });
    }
    async run(message) {
        try {
            function checkBots(guild) {
                let botCount = 0;
                guild.members.cache.forEach(member => {
                    if (member.user.bot) botCount++;
                });
                return botCount;
            }

            function checkMembers(guild) {
                let memberCount = 0;
                guild.members.cache.forEach(member => {
                    if (!member.user.bot) memberCount++;
                });
                return memberCount;
            }

            function checkOnlineUsers(guild) {
                let onlineCount = 0;
                guild.members.cache.forEach(member => {
                    if (member.user.presence.status === "online")
                        onlineCount++;
                });
                return onlineCount;
            }

            let sicon = message.guild.iconURL;
            let serverembed = new Discord.MessageEmbed()
                .setAuthor(`ℹ ${message.guild.name} - Informations`, message.guild.iconURL)
                .setColor(0x4f5f2)
                .addField('**Server Owner**', `**${message.guild.owner}**`, true)
                .addField('**Server Region**', `**${message.guild.region}**`, true)
                .setThumbnail(sicon)
                .addField("**Server Name**", `**${message.guild.name}**`)
                .addField('**Verification Level**', `**${message.guild.verificationLevel}**`, true)
                .addField('**Channel Count**', `**${message.guild.channels.cache.size}**`, true)
                .addField('**Total Member Count**', `**${message.guild.memberCount}**`, true)
                .addField('**Humans**', `**${checkMembers(message.guild)}**`, true)
                .addField('**Bots**', `**${checkBots(message.guild)}**`, true)
                .addField('**Online Users**', `**${checkOnlineUsers(message.guild)}**`)
                .setFooter('Server Created At ')
                .setTimestamp(message.guild.createdAt);

            return message.embed(serverembed);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

