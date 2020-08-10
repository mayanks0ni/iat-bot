const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Canvas = require("canvas");

module.exports = class RIPCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'rip',
            group: 'fun',
            memberName: 'rip',
            description: 'A Command To Generate A RIP Image For The Mentioned User!',
            examples: ["rip [@User/User ID]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const canvas = Canvas.createCanvas(720, 1280);
        const ctx = canvas.getContext("2d");
        const user = message.mentions.users.first() || this.client.users.cache.get(args[0]);
        if (!user) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setDescription(`**This Command Is Used \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}rip [user]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        const user2 = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        const background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/564520348821749766/687972262510329856/rest-in-peace-rip-headstone-blank-template-imgflip-53245711.png`)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '65px Segoe Print'
        ctx.fillText("2020-2021", 160, 1050)

        const userpfp = await Canvas.loadImage(user2)
        ctx.drawImage(userpfp, 200, 500, 300, 300);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rip.png')

        message.say(`😢 RIP ${user.username}`, attachment);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

