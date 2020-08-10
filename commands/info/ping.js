const { Command } = require('discord.js-commando');
const { MessageEmbed, DiscordAPIError } = require('discord.js');

module.exports = class PingCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'ping',
			aliases: ['lat'],
			group: 'info',
			memberName: 'ping',
			description: 'A Command To Check The Ping Of The Bot!',
			examples: ["ping"],
			guildOnly: true,
		});
    }
    async run(message) {
		const pingMsg = await message.embed(new MessageEmbed().setDescription("**Pinging...**").setColor("GREEN"));
		const embed = new MessageEmbed()
		.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
		.setDescription(`**🏓Pong! The Message Round-Trip Took ${
			(pingMsg.editedTimestamp || pingMsg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)
		}ms. The Hearbeat Ping Is ${this.client.ws.ping}ms!**`)
		.setColor(message.guild.me.displayHexColor)
		.setFooter(message.guild.me.displayName)
		.setTimestamp()
		pingMsg.edit(embed);
	}
};

