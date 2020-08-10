const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class CaptchaCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'captcha',
            aliases: ["cpt"],
            group: 'fun',
            memberName: 'captcha',
            description: 'A Command To View Captcha Image Of Your Avatar Or The Mentioned User\'s Avatar!',
            examples: ["captcha [User/User ID]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            let uname = args.slice(1).join(" ");
            let men = this.client.users.cache.get(args[0]) || message.mentions.users.first();
            if (!uname) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}captcha [User/User ID] [Text]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                let userurl = men.displayAvatarURL()
                let body = await fetch(`https://nekobot.xyz/api/imagegen?type=captcha&&username=${uname}&&url=${userurl}`).then(url => url.json());
                console.log(body);
                let captchaembed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor("RANDOM")
                    .setImage(body.message)
                    .setTimestamp()
                    .setFooter(message.guild.me.displayName)
                message.embed(captchaembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

