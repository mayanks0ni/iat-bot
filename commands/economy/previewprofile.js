const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");
const Canvas = require("canvas");

module.exports = class PProfileCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'previewprofile',
            aliases: ["pprofile"],
            group: 'economy',
            memberName: 'previewprofile',
            description: 'A Command To View Preview Profile Cards By Specifying Its ID!',
            examples: ["previewprofile [Profile ID]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            Canvas.registerFont("./assets/LemonMilk.otf", {family: "lemon"});

            const canvas = Canvas.createCanvas(1440, 1080);

            const ctx = canvas.getContext("2d");

            let pid = args[0];

            if (!pid) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}previewprofile [Profile ID]\`**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
            
            let pdb = new sqlite.Database("./database/proshop.db", err => console.log(err));

            pdb.get(`SELECT * FROM profile WHERE pid = '${pid}'`, async (err, rows) => {
                if (rows === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**Invalid Index!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                const background = await Canvas.loadImage(rows.link)

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#faf9f9';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                ctx.strokeStyle = '#faf9f9';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                ctx.font = '35px lemon'
                ctx.fillStyle = '#ffffff'
                ctx.fillText(`Your Name Here`, 376, 296)

                ctx.font = '35px lemon'
                ctx.fillStyle = '#ffffff'
                ctx.fillText(`Your XP Here`, 320, 447)

                ctx.font = '35px lemon'
                ctx.fillStyle = '#ffffff'
                ctx.fillText(`Your Balance Here`, 499, 600)

                ctx.font = '35px lemon'
                ctx.fillStyle = '#ffffff'
                ctx.fillText(`Your Level Here`, 381, 754)

                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png')
                message.say(attachment);
            });
            pdb.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

