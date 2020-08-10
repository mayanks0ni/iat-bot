const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class WeatherCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'weather',
            group: 'util',
            memberName: 'weather',
            description: 'A Command To View The Weather Of The Specified Place!',
            examples: ["weather [Mumbai]"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            let place = args.join(" ");
            if (!place) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}weather [place]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());

            let res = await fetch(`https://weather.ls.hereapi.com/weather/1.0/report.json?product=forecast_hourly&name=${place}&apiKey=zgzVmU4HPct2yx7wVYa-XEKGRw6pyiRHmFuT1jbgpZk`).then(url => url.json());
            if (res.hourlyForecasts === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Invalid Loaction!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            const weatherEmb = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle("🌥️ Weather 🌥️")
                .setDescription(`**Hourly Weather Of ${res.hourlyForecasts.forecastLocation.city}!**`)
                .addField("**☁️ Sky Description**", `**${res.hourlyForecasts.forecastLocation.forecast[1].skyDescription}**`)
                .addField("**🌡️ Tempertaure**", `**${res.hourlyForecasts.forecastLocation.forecast[1].temperature}°C**`)
                .addField("**💦 Humidity**", `**${res.hourlyForecasts.forecastLocation.forecast[1].humidity}%**`)
                .addField("**💨 Wind Direction**", `**${res.hourlyForecasts.forecastLocation.forecast[1].windDesc}**`)
                .addField("**💬 Additional Description**", `**${res.hourlyForecasts.forecastLocation.forecast[1].description}**`)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setFooter(message.guild.me.displayName)
                .setColor("BLUE")
                .setTimestamp()
            message.embed(weatherEmb)
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

