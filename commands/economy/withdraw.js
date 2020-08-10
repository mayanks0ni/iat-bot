const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class WithdrawCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'withdraw',
            aliases: ["with"],
            group: 'economy',
            memberName: 'withdraw',
            description: 'A Command To Withdraw An Amount From Your Bank!',
            examples: ["withdraw [Amount]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.log(err);
            });

            const diamond = this.client.emojis.cache.get("706515264451117109");

            let amount = args[0];

            if (!amount) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}withdraw [Amount]\`!`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (isNaN(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be A Number!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (amount < 1) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (amount != Math.floor(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
            db.get(userInfo, [message.author.id], (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    if (row.bankbal < amount) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Bank!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    db.all(`UPDATE userdb SET bankbal = bankbal - "${amount}" WHERE userId = '${message.author.id}'`)
                    db.all(`UPDATE userdb SET bal = bal + "${amount}" WHERE userId = '${message.author.id}'`)
                    message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Have Withdrawn ${amount}${diamond} From Your Bank!**`).setFooter(message.guild.me.displayName).setColor(0xf600ff).setTimestamp())
                }
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

