const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class SnipeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'snipe',
            group: 'moderation',
            memberName: 'snipe',
            description: 'A Command To View Your Past Deleted Messages!',
            examples: ["snipe"],
            userPermissions: [
                "MANAGE_MESSAGES"
            ],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    run(message, args) {
        try {
            const db = new sqlite.Database("./database/snipe.db", err => {
                if (err) console.log(err);
            });
            db.all(`SELECT * FROM msg WHERE guild = '${message.guild.id}' ORDER BY id DESC LIMIT 5`, (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**There's Nothing To Snipe!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    var i;
                    const snipeEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setTitle(`💬 Past Deleted Messages`)
                        .setFooter(message.guild.me.displayName)
                        .setColor("ORANGE")
                        .setTimestamp()
                    for (i = 0; i < row.length; i++) {
                        let rw = row[i];
                        snipeEmbed.addField(`**\`#${i + 1}\` Message From: \`${rw.author}\` Deleted At \`${rw.date}\` In \`#${rw.channel}\`**`, `**Message - ${rw.message}**`)
                    }
                    message.embed(snipeEmbed);
                }
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`**An Error Occured: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

