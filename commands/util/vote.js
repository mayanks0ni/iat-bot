const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class VoteCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'vote',
			group: 'util',
			memberName: 'vote',
			description: 'A Command To Which Shows The Links To Vote The Bot!',
			examples: ["vote"],
            guildOnly: true,
		});
    }
    async run(message) {
        try {
               let voteEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`You Can Vote The Bot Here:\n
                Top.gg - [Vote Here](https://top.gg/bot/636982876289892352/vote) (You Can Vote Again After Every 12 Hours!)\n\n
                Discord Bot List - [Upvote Here](https://discordbotlist.com/bots/indian-anime-tv) (You Can Upvote Again After Every 24 Hours!)`)
                .setColor("GREEN")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                message.embed(voteEmbed);
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
	}
};

