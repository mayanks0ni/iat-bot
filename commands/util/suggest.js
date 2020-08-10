const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class CalcCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'suggest',
            group: 'util',
            memberName: 'suggest',
            description: 'A Command To Make Suggestion Which Are Posted In A Specific Channel!',
            examples: ["suggest [Suggestion]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            message.delete()
            let suggestion = args.join(" ");
            if (!suggestion) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}suggest [message]\`!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            let cg = new sqlite.Database("./database/config.db", err => console.log(err));
            cg.get(`SELECT * FROM config WHERE guildid = '${message.guild.id}' AND type = "suggest"`, async (err, row) => {
                if (row === undefined) return message.embed(new Discord.MessageEmbed().setDescription("**No Suggestion Channel Found!\nAsk The Admin To Set One Channel For Suggestion Using \`set\` Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                const sEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setTitle('💭 New Suggestion!')
                    .setDescription(`${suggestion}`)
                    .setColor(0xccff80)
                    .setFooter(`Suggestion By ${message.author.tag} | ${message.guild.me.displayName}`)
                    .setTimestamp()
                this.client.channels.cache.find(c => c.id == row.channel).send(sEmbed).then(function (message) {
                    message.react("👍")
                        .then(() => message.react('👎'))
                })
                message.reply(`✅ Your Suggestion Has Been Posted!`)
            });
            cg.close();
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

