const { MessageEmbed } = require("discord.js");

module.exports = (bot, guild) => {
    console.log(`Joined A New Guild Named: ${guild.name}!`);
    bot.channels.cache.get('726414689805795418').send(new MessageEmbed().setTitle("Joined A New Guild!").addField("**Guild Name**", `**${guild.name}**`).addField("**Guild ID**", `**${guild.id}**`).addField("**Guild Owner**", `**${guild.owner}**`).addField("**Member Count**", `**${guild.memberCount}**`).setThumbnail(guild.iconURL()).setColor("GREEN").setTimestamp());
};