const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class NekoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'neko',
            group: 'nsfw',
            memberName: 'neko',
            description: 'A Command To View Neko NSFW GIFs!',
            examples: ["neko"],
            argsType: "multiple",
            guildOnly: true,
            nsfw: true,
        });
    }
    async run(message, args) {
        try {
            let db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.error(err);
            });
            db.get(`SELECT * FROM userdb WHERE userId = '${message.author.id}'`, async (err, rows) => {
                if (rows === undefined) return message.embed(new Discord.MessageEmbed().setDescription("**You Need To Register An Account And Buy Premium Membership To Use This Command!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                if (rows.pnsfw === "no") return message.embed(new Discord.MessageEmbed().setDescription("**You Need To Buy Premium NSFW In Order To Use This Command!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                let body = await fetch(`https://nekos.life/api/v2/img/nsfw_neko_gif`).then(url => url.json());

                let nsfwembed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setTitle(`Neko NSFW GIF For ${message.author.tag}!`)
                    .setImage(body.url)
                    .setTimestamp()
                    .setFooter(message.guild.me.displayName)
                message.embed(nsfwembed);
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

