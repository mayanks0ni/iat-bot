const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");
const sqlite = require("sqlite3");

module.exports = class GoogleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'google',
            group: 'util',
            memberName: 'google',
            description: 'A Command To Search Anything On Google!',
            examples: ["google search|image [Query]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            let udb = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.error(err);
            });

            const query = args.slice(1).join(" ");
            const type = args[0];
            const searchType = ["search", "image"];
            udb.get(`SELECT * FROM userdb WHERE userId = '${message.author.id}'`, async (err, rows) => {
                if (rows === undefined) return message.embed(new Discord.MessageEmbed().setTitle("You Need To Register An Account And Buy Premium Membership To Use This Command!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                if (rows.premium === "no") return message.embed(new Discord.MessageEmbed().setTitle("You Need To Buy Premium Membership To Use This Command!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
                if (!query || !type || !searchType.includes(type)) return message.embed(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}google [search | image] [query]\`!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                if (type === "search") {
                    const url = `https://website-screenshot.whoisxmlapi.com/api/v1?apiKey=at_qFtgwKuzPkEwu6TpIEXbJhpssgDXu&url=google.com/search?q=${query}&height=1080&width=1920&type=png`;
                    let res;
                    res = await fetch(url)

                    const googleEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`)
                        .setTitle("🔍 Search Results")
                        .setImage(res.url)
                        .setFooter(message.guild.me.displayName)
                        .setTimestamp()
                        .setColor("RANDOM")
                    message.embed(googleEmbed)
                }
                else {
                    const url12 = `https://www.google.com/search?q=${query}&tbm=isch`;
                    const encodedurl = encodeURIComponent(url12)
                    const url1 = `https://website-screenshot.whoisxmlapi.com/api/v1?apiKey=at_qFtgwKuzPkEwu6TpIEXbJhpssgDXu&url=${encodedurl}&height=1080&width=1920`;
                    let res1;
                    res1 = await fetch(url1)
                    console.log(res1)

                    const googleImgEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag}`)
                        .setTitle("🔍 Search Results")
                        .setImage(res1.url)
                        .setFooter(message.guild.me.displayName)
                        .setTimestamp()
                        .setColor("RANDOM")
                    message.embed(googleImgEmbed)
                }
            });
            udb.close();
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

