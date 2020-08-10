const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class CalcCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'calc',
			group: 'util',
			memberName: 'calc',
			description: 'A Command To Calculate The Given Expression!',
			examples: ["calc 69 + 69"],
            guildOnly: true,
            argsType: "multiple",
		});
    }
    async run(message, args) {
        try {
            let exp = args.join(" ");
            if (!exp) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}calc [expression]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            let res = this.client._eval(exp);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**${exp} = ${res}**`).setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp());
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
	}
};

