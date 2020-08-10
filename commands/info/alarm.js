const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ms = require("ms");

module.exports = class AlarmCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'alarm',
			group: 'info',
			memberName: 'alarm',
			description: 'A Command To Set A Alarm!',
            examples: ["alarm [duration] [message]"],
            argsType: "multiple",
            guildOnly: true,
		});
    }
    async run(message, args) {
        const time = args[0];
   const reminder = args.slice(1).join(" ");
   if(!time || !reminder) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}alarm [duration (1m/1h/1d)] [reminder]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
   message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**⏰ Your Alarm Has Been Set To Remind You! ⏰**").setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
   const alarmEmbed = new Discord.MessageEmbed()
   .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
   .setTitle("⏰ Alarm ⏰")
   .setDescription(`**Your Reminder To Do: \`${reminder}\`**!`)
   .setColor("RANDOM")
   .setFooter(message.guild.me.displayName)
   .setTimestamp()

   setTimeout( function(){
   	message.author.send(alarmEmbed).catch(err =>  console.log(err));
   }, ms(time));
	}
};

