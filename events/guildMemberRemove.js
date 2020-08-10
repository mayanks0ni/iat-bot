const Discord = require("discord.js");
const sqlite = require("sqlite3");

module.exports = (bot, member) => {
    const cg = new sqlite.Database("./database/config.db", err => console.log(err));
    cg.get(`SELECT * FROM config WHERE guildid = '${member.guild.id}' AND type = "welcome"`, async (err, row) => {
        if (row === undefined) return;
        const leaveembed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setThumbnail(member.guild.iconURL)
            .setDescription(`**${member}, Has Left The Server! Hope You'll Be Back Soon!\nWe Now Have ${member.guild.memberCount} Members!**`)
            .setColor(0x3dffcf)
            .setFooter(member.guild.me.displayName)
            .setTimestamp()
        bot.channels.cache.find(c => c.id == row.channel).send(leaveembed);
    });
};