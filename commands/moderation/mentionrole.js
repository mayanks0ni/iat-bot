const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class MroleCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'mentionrole',
			aliases: ['mrole', "mr"],
			group: 'moderation',
			memberName: 'mentionrole',
			description: 'A Command To Mention The Specified Role!',
            examples: ["mentionrole [role]"],
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            clientPermissions: [
                "MENTION_EVERYONE"
            ],
            argsType: "multiple",
            guildOnly: true,
		});
    }
    async run(message, args) {
        let rolename = args.join(" ")
        if (!rolename) {
            const nomenrole = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription('**You Didn\'t Specified The Role\'s Name!**')
                .setColor(0xff0000)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            message.embed(nomenrole);
        } else {
            message.delete();
            if(!message.guild.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase())) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**No Such Role Found!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            const mentionedRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === rolename.toLowerCase())
            mentionedRole.setMentionable(true)
            await message.say(`${mentionedRole}`)
            mentionedRole.setMentionable(false)
    
        }
	}
};

