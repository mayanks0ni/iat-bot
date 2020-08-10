const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");
const Canvas = require("canvas");
const fs = require("fs");

module.exports = class SlotCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'slot',
            group: 'gambling',
            memberName: 'slot',
            description: 'A Command To Gamble Diamonds By Playing Slots!',
            examples: ["slot [Bet Amount]"],
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

            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');


            const background = await Canvas.loadImage('./assets/slot.jpg');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            let a;
            let b;
            let c;
            let m = ["2", "3", "4"];
            const diamond = this.client.emojis.cache.get("706515264451117109");
            let won = this.client.emojis.cache.get("712627199823315018");
            let amount = args[0];
            let sl = ["./assets/mango.png", "./assets/cherry.png", "./assets/bell.png"];
            let res1 = Math.floor(Math.random() * sl.length);
            let res2 = Math.floor(Math.random() * sl.length);
            let res3 = Math.floor(Math.random() * sl.length);

            if (!amount || isNaN(amount)) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}coinflip h|t [amount]\`!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            if (amount < 1) return message.embed(new Discord.MessageEmbed().setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            if (amount != Math.floor(amount)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
            db.get(userInfo, [message.author.id], async (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    if (row.bal < amount) return message.embed(new Discord.MessageEmbed().setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());

                    if (sl[res1] === sl[res2] && sl[res1] === sl[res3]) {
                        a = await Canvas.loadImage(sl[res1]);
                        b = await Canvas.loadImage(sl[res2]);
                        c = await Canvas.loadImage(sl[res3]);

                        ctx.drawImage(a, 110, 80, 100, 100)
                        ctx.drawImage(b, 293, 80, 100, 100)
                        ctx.drawImage(c, 473, 80, 100, 100)
                        fs.writeFileSync("./assets/slots.png", canvas.toBuffer());

                        let won1 = new Discord.MessageEmbed()
                            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                            .setDescription(`**${diamond} Bet Amount = ${amount}\n${won} Won = ${amount * 3}\n✖️ Multiplier - 3x**`)
                            .attachFiles(['./assets/slots.png'])
                            .setImage("attachment://slots.png")
                            .setThumbnail(this.client.user.displayAvatarURL())
                            .setFooter(message.guild.me.displayName)
                            .setColor("GREEN")
                            .setTimestamp()
                        message.embed(won1);
                        db.all(`UPDATE userdb SET bal = bal + '${amount * 3}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Slots!", '+${smount * 3}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    } else {
                        a = await Canvas.loadImage(sl[res1]);
                        b = await Canvas.loadImage(sl[res2]);
                        c = await Canvas.loadImage(sl[res3]);

                        ctx.drawImage(a, 110, 80, 100, 100)
                        ctx.drawImage(b, 293, 80, 100, 100)
                        ctx.drawImage(c, 473, 80, 100, 100)
                        fs.writeFileSync("./assets/slots.png", canvas.toBuffer());

                        let loss = new Discord.MessageEmbed()
                            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                            .setDescription(`**${diamond} Bet Amount = ${amount}\n${won} Won = 0\n✖️ Multiplier - 0x**`)
                            .attachFiles(['./assets/slots.png'])
                            .setImage('attachment://slots.png')
                            .setThumbnail(this.client.user.displayAvatarURL())
                            .setFooter(message.guild.me.displayName)
                            .setColor(0xff0000)
                            .setTimestamp()
                        message.embed(loss);
                        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Slots!", '-${amount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                    }
                }
            });
            db.close();
            trans.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

