const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const translate = require("@vitalets/google-translate-api");

module.exports = class TranslateCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'translate',
            aliases: ["trans"],
            group: 'info',
            memberName: 'translate',
            description: 'A Command To Translate The Provided Text Into Desired Language!',
            examples: ["translate [To Language] [Text]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const toLanguage = args[0];
            const text = args.slice(1).join(" ");
            if (!toLanguage || !text) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}translate [To Language] [Text]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            translate(text, { to: toLanguage }).then(res => {
                const translation = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setTitle("Translation!")
                    .addField("**From**", `${res.from.language.iso.toUpperCase()}`)
                    .addField("**To**", `${toLanguage.toUpperCase()}`)
                    .addField("**Tranlation**", `${res.text}`)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(message.guild.me.displayName, this.client.user.displayAvatarURL())
                    .setColor("RANDOM")
                    .setTimestamp()
                message.embed(translation);
            }).catch(error => {
                console.log(error);
                return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            });
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

