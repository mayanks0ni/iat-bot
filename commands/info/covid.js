const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class CovidCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'covid',
            group: 'info',
            memberName: 'covid',
            description: 'A Command To View The COVID-19 Status Of The World!',
            examples: ["covid [country]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        let countryName = args.join(" ");
        if (!countryName) return message.embed(new Discord.MessageEmbed().setTitle("Error!").setDescription(`**Please Specify The Country\'s Name!**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
        try {
            const url = `https://coronavirus-19-api.herokuapp.com/countries/${countryName}`
            let res = await fetch(url).then(url => url.json());
            message.embed(new Discord.MessageEmbed().setTitle(`COVID-19 Status Of ${res.country}!`).setThumbnail("https://cdn.discordapp.com/attachments/564520348821749766/701422183217365052/2Q.png").addField("**Total Cases**", `${res.cases}`).addField("**Today Cases**", `${res.todayCases}`).addField("**Total Deaths**", `${res.deaths}`).addField("**Today Deaths**", `${res.todayDeaths}`).addField("**Recovered**", `${res.recovered}`).addField("**Active**", `${res.active}`).addField("**Critical**", `${res.critical}`).setDescription("**This Information Isn't Live Always, Hence May Not Be Accurate!**").setFooter(message.guild.me.displayName).setTimestamp().setColor("RANDOM"))
        } catch (e) {
            console.error(e);
            return message.embed(new Discord.MessageEmbed().setTitle("Error!").setDescription(`**Invalid Country Name Or API Error! Try Again..!**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
        }
    }
};

