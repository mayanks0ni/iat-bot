const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const urban = require("urban");

module.exports = class UrbanCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'urban',
            aliases: ["ud"],
            group: 'info',
            memberName: 'urban',
            description: 'A Command To Get The Definition Of The Provided Word From Urban Dictionary!',
            examples: ["urban [Word]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            if (args.length < 1) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}urban [text]\``).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            let XD = args.join(" ");

            urban(XD).first(json => {
                if (!json) return message.embed(new Discord.MessageEmbed().setTitle('No Results Found For That Word!').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());

                let urbEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setTitle(json.word)
                    .setDescription(`**${json.definition}**`)
                    .addField("👍 Upvotes", json.thumbs_up, true)
                    .addField("👎 Downvotes", json.thumbs_down, true)
                    .setFooter(`✍ Written By: ${json.author} | ${message.guild.me.displayName}`)
                    .setTimestamp()
                message.embed(urbEmbed)
            });
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

