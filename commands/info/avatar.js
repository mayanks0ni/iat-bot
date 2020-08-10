const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'avatar',
			aliases: ['av'],
			group: 'info',
			memberName: 'avatar',
			description: 'A Command To View Avatar Of Yourself Or The Mentioned User!',
			examples: ["avatar", "avatar [user]"],
			argsType:"single",
			argsCount: 1,
			guildOnly: true,
		});
    }
    run(message, id) {
        let user = this.client.users.cache.get(id) ||  message.mentions.users.first() || message.author;
		const embed = new MessageEmbed()
		.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`**${user.tag}'s Avatar!**`)
        .setImage(user.displayAvatarURL({format:"png", dynamic: true, size: 1024}))
		.setColor("RANDOM")
		.setFooter(message.guild.me.displayName)
		.setTimestamp()
		message.embed(embed)
	}
};