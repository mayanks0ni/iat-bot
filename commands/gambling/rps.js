const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class RPSCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'rps',
            group: 'gambling',
            memberName: 'rps',
            description: 'A Command To Gamble Diamonds By Playing Roch, Paper & Scissors!',
            examples: ["rps r|p|s [Bet Amount]"],
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

            var amount = args[1];

            let uchoice = args[0];

            let choices = ["r", "p", "s"];

            if (!amount || isNaN(amount) || !uchoice || !choices.includes(uchoice)) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}rps r|p|s [amount]\`!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            
            if (amount < 1) return message.embed(new Discord.MessageEmbed().setTitle("The Amount Should Be Greater Than 100!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            
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
                    let botChoice = choices[Math.floor(Math.random() * choices.length)]
                    if (uchoice === "r" && botChoice === "r") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Its A Tie We Both Chose Rock!\n✊ V/S ✊**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "p" && botChoice === "p") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Its A Tie We Both Chose Paper!\n✋ V/S ✋**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "s" && botChoice === "s") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Its A Tie We Both Chose Scissor!\n✌️ V/S ✌️**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "r" && botChoice === "p") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Lost ${amount}${diamond}!\n✊ V/S ✋**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "p" && botChoice === "r") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Won ${amount * 2}${diamond}!\n✋ V/S ✊**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Rock, Paper & Scissor!", '+${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "p" && botChoice === "s") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Lost ${amount}${diamond}!\n✋ V/S ✌️**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "s" && botChoice === "p") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Won ${amount * 2}${diamond}!\n✌️ V/S ✋**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Rock, Paper & Scissor!", '+${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "r" && botChoice === "s") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Won ${amount * 2}${diamond}!\n✊ V/S ✌️**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Rock, Paper & Scissor!", '+${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else if (uchoice === "s" && botChoice === "r") {
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Lost ${amount}${diamond}!\n✌️ V/S ✊**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
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

