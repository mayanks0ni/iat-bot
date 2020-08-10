const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");
const tr = require("transliteration").transliterate;
const Canvas = require("canvas");

module.exports = class ProfileCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'profile',
            group: 'economy',
            memberName: 'profile',
            description: 'A Command To View Your Profile!',
            examples: ["profile"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            Canvas.registerFont("./assets/LemonMilk.otf", {family: "lemon"});

            const canvas = Canvas.createCanvas(1440, 1080);

            const ctx = canvas.getContext("2d");

            const db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.log(err);
            });

            const db1 = new sqlite.Database("./database/xp.db", err => {
                if (err) console.error(err);
            });

            let sender = message.author.id;

            let senderData = {};
            
            db.each("SELECT * FROM userdb", (err, row) => {
                if (row.userId == sender) {
                    senderData["userid"] = row.userId;
                    senderData["bal"] = row.bal;
                    senderData["bank"] = row.bankbal;
                    senderData["premium"] = row.premium;
                    senderData["link"] = row.curpro;
                }
            }, async () => {
                if (Object.keys(senderData).length != 0) {
                    let name = tr(message.author.tag)
                    db1.get(`SELECT * FROM xp WHERE userId = '${message.author.id}'`, async (err, rows) => {
                        if (rows === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered Or An Error Try Again..!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                        if (senderData.link == null) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Have Not Selected Any Profile Card!\nSelect One Using \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}changeprofile [index]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                        const background = await Canvas.loadImage(senderData.link)

                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        ctx.strokeStyle = '#faf9f9';
                        ctx.strokeRect(0, 0, canvas.width, canvas.height);

                        ctx.strokeStyle = '#faf9f9';
                        ctx.strokeRect(0, 0, canvas.width, canvas.height);

                        ctx.font = '60px lemon'
                        ctx.fillStyle = '#ffffff'
                        ctx.fillText(`${name}`, 376, 296)

                        ctx.font = '60px lemon'
                        ctx.fillStyle = '#ffffff'
                        ctx.fillText(`${rows.xp}`, 320, 447)

                        ctx.font = '60px lemon'
                        ctx.fillStyle = '#ffffff'
                        ctx.fillText(`${senderData.bal}`, 499, 600)

                        ctx.font = '60px lemon'
                        ctx.fillStyle = '#ffffff'
                        ctx.fillText(`${rows.level}`, 381, 754)

                        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png')
                        message.say(attachment);
                    });
                    db1.close();
                } else {
                    message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                }
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

