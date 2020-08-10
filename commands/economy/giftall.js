const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class GiftAllCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'giftall',
            group: 'economy',
            memberName: 'giftall',
            description: 'A Command To Gift Everyone Registered An Amount!',
            examples: ["giftall [Amount]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.log(err);
            });

            const tada = this.client.emojis.cache.get("706822382089666570");

            const diamond = this.client.emojis.cache.get("706515264451117109");

            const amount = args[0];

            if (!amount) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}giftall [Amount]\`!`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (isNaN(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be A Number!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (amount < 1) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (amount != Math.floor(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            db.all(`UPDATE userdb SET bal = bal + '${amount}'`)
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Congratulations! ${tada}`).setDescription(`**You Have Gifted ${amount}${diamond} To Everyone Who Is Registered!**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp())
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

