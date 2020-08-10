const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class AddEmojiCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'addemoji',
			aliases: ['aemoji'],
			group: 'moderation',
			memberName: 'addemoji',
			description: 'A Command To Add A New Emoji In The Guild!!',
            examples: ["addemoji [link] [name]"],
            userPermissions: [
                "MANAGE_EMOJIS"
            ],
            clientPermissions: [
                "MANAGE_EMOJIS"
            ],
            argsType: "multiple",
            guildOnly: true,
		});
    }
    async run(message, args) {
	let link = args[0];
    let name = args.slice(1).join(" ");
    if (!link || !name) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}addemoji [link] [name]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    try {
        await message.guild.emojis.create(link, name);
        const e = this.client.emojis.cache.get(message.guild.emojis.cache.find(e => e.name === name).id)
        message.say(`✅ Successfully Created Emoji! ${e}`)
    } catch (error) {
        if (error) return message.embed(new Discord.MessageEmbed().setTitle(`Error: ${error}`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    }
	}
};

