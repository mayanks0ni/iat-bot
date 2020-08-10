const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class NPCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'nowplaying',
            aliases: ["np"],
            group: 'music',
            memberName: 'nowplaying',
            description: 'A Command To View The Song Playing Currently!',
            examples: ["nowplaying"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const serverQueue = this.client.queue.get(message.guild.id);
            if (!message.member.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**You Should Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!message.guild.me.voice.channel) return message.embed(new Discord.MessageEmbed().setDescription("**I Am Not In Any Voice Channel Currently!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (!serverQueue) return message.embed(new Discord.MessageEmbed().setDescription("**There's Nothing Playing Right Now!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            let title;
            if (serverQueue.songs[1]) {
                title = serverQueue.songs[1].title;
            } else {
                title = "None";
            }

            var date = new Date(0);
            date.setSeconds(serverQueue.connection.dispatcher.streamTime / 1000);
            var timeString = date.toISOString().substr(11, 8);
            let dur = serverQueue.songs[0].duration
            let secs = serverQueue.connection.dispatcher.streamTime / 1000

            const percentage = secs / serverQueue.songs[0].durationSecs; 
            const progress = Math.round((20 * percentage)); 
            const emptyProgress = 20 - progress; 

            const progressText = '▣'.repeat(progress);
            const emptyProgressText = '▢'.repeat(emptyProgress);

            const bar =  `[${progressText}${emptyProgressText}](${serverQueue.songs[0].url})`;

            let np = new Discord.MessageEmbed()
                .setTitle(`Currently Playing \n\`${serverQueue.songs[0].title}\`!`)
                .setDescription(`**${timeString} / ${dur}** \n${bar}`)
                .addField("**Upcoming**", `\`${title}\``)
                .setColor(0xc5ff00)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            message.embed(np);
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

