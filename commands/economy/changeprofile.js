const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class ChangeProfileCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'changeprofile',
            aliases: ["cprofile"],
            group: 'economy',
            memberName: 'changeprofile',
            description: 'A Command To Change Profile Cards!',
            examples: ["changepprofile [Profile ID]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.log(err);
            });

            let pdb = new sqlite.Database("./database/profiles.db", err => console.log(err));

            let pid = args[0];

            if (!pid) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}changeprofile [index]\`**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            
            let userInfo = `SELECT * FROM userdb WHERE userId = ?`
            db.get(userInfo, [message.author.id], (err, row) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (row === undefined) {
                    return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else {
                    pdb.get(`SELECT * FROM profile WHERE pid = '${pid}' AND userid = '${message.author.id}'`, (err, prow) => {
                        if (prow === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**Invalid Index Or You Don't Own That Profile!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                        db.all(`UPDATE userdb SET curpro = '${prow.link}' WHERE userId = '${message.author.id}'`);
                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Profile Card Changed Successfully!**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                    });
                    pdb.close();
                }
            });
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

