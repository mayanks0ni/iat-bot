const Discord = require("discord.js");

module.exports = async (bot, error) => {
    console.log(err);
    bot.channels.cache.get('726414689805795418').send(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**An Error Occured!\nError: ${error}**`).setColor(0xff0000).setTimestamp());
};