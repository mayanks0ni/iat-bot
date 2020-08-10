const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class CoinFlipCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'coinflip',
            aliases: ["cf"],
            group: 'gambling',
            memberName: 'coinflip',
            description: 'A Command To Gamble Coins By Flipping Coin!',
            examples: ["cf h|t [Bet Amount]"],
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

            let amount = args[1];

            let ht = args[0]

            let htList = ["h", "t", "h", "t"]

            let ch;

            let image;

            if (!amount || isNaN(amount) || !htList.includes(ht) || !ht) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}coinflip h|t [amount]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (amount < 1) return message.embed(new Discord.MessageEmbed().setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (amount != Math.floor(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
            db.get(userInfo, [message.author.id], (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    if (row.bal < amount) return message.embed(new Discord.MessageEmbed().setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                    let chance = htList[Math.floor(Math.random() * htList.length)]
                    console.log(chance);
                    if (chance === ht) {
                        if (chance === "h") {
                            ch = "Heads"
                            image = "https://cdn.discordapp.com/attachments/564520348821749766/707182326668460092/1588675642028.png"
                        } else if (chance === "t") {
                            ch = "Tails"
                            image = "https://cdn.discordapp.com/attachments/564520348821749766/707182327238754344/1588675597299.png"
                        }
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Flipped ${ch}!\nYou Won ${amount * 2}${diamond}**`).setImage(image).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Coin Flip!", '+${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else {
                        if (chance === "h") {
                            ch = "Heads"
                            image = "https://cdn.discordapp.com/attachments/564520348821749766/707182326668460092/1588675642028.png"
                        } else if (chance === "t") {
                            ch = "Tails"
                            image = "https://cdn.discordapp.com/attachments/564520348821749766/707182327238754344/1588675597299.png"
                        }
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Flipped ${ch}!\nYou Lost ${amount}${diamond}**`).setImage(image).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Coin Flip!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    }
                }
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

