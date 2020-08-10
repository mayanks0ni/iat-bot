const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Canvas = require("canvas");

module.exports = class AskDanCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'askdan',
            group: 'fun',
            memberName: 'askdan',
            description: 'Ask Dan A Question And Get The Reply In Yes/No!',
            examples: ["askdan [Are you a robot?]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const question = args.join(" ");
            if(!question) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}askdan [quesion]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            const reply = ["Yes", "No"];
            let emoji;
            let color;
            const replyChance = reply[Math.floor(Math.random() * reply.length)];
            if(replyChance === "Yes") {
              emoji = this.client.emojis.cache.get("676508968717123593")
              color = "#10ff00"
            }else if(replyChance === "No"){
              emoji = this.client.emojis.cache.get("676509007762030611")
              color = "#ff0000"
            }
            const danReply = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setTitle(`${emoji} Dan Has Replied!`)
            .addField("**Question**", `**${question}**`)
            .addField("**Dan's Reply**", `**${replyChance}**`)
            .setThumbnail(emoji.url)
            .setColor(color)
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
            message.embed(danReply);
         
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

