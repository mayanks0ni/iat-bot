const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class GiveCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'give',
            group: 'economy',
            memberName: 'give',
            description: 'A Command To Give An Amount To Someone!',
            examples: ["give [User/User ID] [Amount]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.log(err);
            });

            const trans = new sqlite.Database("./database/transactions.db", err => {
                if (err) console.error(err);
            });

            const diamond = this.client.emojis.cache.get("706515264451117109");

            const tada = this.client.emojis.cache.get("706822382089666570");

            let user = message.mentions.users.first() || this.client.users.cache.get(args[0]);

            const amount = args[1];

            if (!user || !amount) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}give [user] [amount]\`!`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));

            if (user.id === message.author.id) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("You Can\'t Give Money To Yourself!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));

            if (isNaN(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be A Number!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));

            if (amount < 1) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));

            if (amount != Math.floor(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());


            db.get(`SELECT * FROM userdb WHERE userId = ?`, [message.author.id], (err, row) => {
                if (row === undefined) return  message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                db.get(`SELECT * FROM userdb WHERE userId = ?`, [user.id], (err, row) => {
                    if (row === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Specified User Is Not Registered**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                    db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${user.id}'`)
                    db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)

                    trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Amount Gifted By '${message.author.tag}'!", '+${amount}', '${new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}', '${user.id}')`)

                    trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Gifted Amount To ${user.tag}!", '-${amount}', '${new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}', '${message.author.id}')`)
                    message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Amount**", `**${amount}${diamond}**`).addField("**Given By**", `**${message.author.tag}**`).addField("**Given To**", `**${user.tag}**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                })
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

