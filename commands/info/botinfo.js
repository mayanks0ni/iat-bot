const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BotInfoCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'botinfo',
			aliases: ["about"],
			group: 'info',
			memberName: 'botinfo',
			description: 'A Command To View The Information About The Bot!',
            examples: ["botinfo"],
            guildOnly: true,
		});
    }
    async run(message, args) {
        const infoembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTitle(`${this.client.user.tag}'s Informations!`)
        .addField('**• Name**', `${this.client.user.tag}`)
        .addField('**• Prefix**', `${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}`)
        .addField('**• Owner(s)**', `${this.client.owners.join(", ")}`)
        .addField("**• Assets Made By -**", `${this.client.users.cache.find(user => user.id == "527911338157277184").tag}\nSpecial Thanks To Him!`)
        .addField("**• Commands Executed**", `${this.client.commandsExecuted}`)
        .addField("**• Support Server**", `[Support Server Invite](${this.client.options.invite})`)
        .addField("**• Invite Me**", `[Invite Link](${await this.client.generateInvite("ADMINISTRATOR")})`)
        .addField('**• Version**', "1.0.0")
        .addField("**• Node JS Version**", `${process.version}`)
        .setColor("GREEN")
        .setFooter(message.guild.me.displayName)
        .setThumbnail(this.client.user.displayAvatarURL())
        .setTimestamp()
    message.embed(infoembed);
	}
};

