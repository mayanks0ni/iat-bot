const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = async function play(guild, queueSong, bot) {
    const serverQueue = bot.queue.get(guild.id);
    if (!queueSong) {
        serverQueue.voiceChannel.leave();
        bot.queue.delete(guild.id);
        serverQueue.textChannel.send(new Discord.MessageEmbed().setDescription("**I Left The Voice Channel As There Weren\'t Any Songs!**").setColor(0xff0000).setTimestamp());
        return;
    }
    const dispatcher = serverQueue.connection
        .play(ytdl(queueSong.url, { filter: "audioonly", highWaterMark: 1024 * 1024 * 10 }))
        .on("finish", () => {
            if (serverQueue.songs[0].loop === false) {
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0], bot);
            } else {
                play(guild, serverQueue.songs[0], bot);
            }
        })
        .on("error", error => {
            console.log(error);
            serverQueue.textChannel.send(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setTimestamp());
        });
    if (serverQueue.songs[0].loop === false) {
        let title;
        if (serverQueue.songs[1]) {
            title = serverQueue.songs[1].title;
        } else {
            title = "None";
        }
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(new Discord.MessageEmbed().setAuthor(`Started Playing`, `https://cdn.discordapp.com/attachments/564520348821749766/696332404549222440/4305809_200x130..gif`).addField("**Title**", `**[${queueSong.title}](${queueSong.url})**`).addField("**Channel Name**", `${queueSong.channel}`).addField("**Duration**", `${queueSong.duration}`).addField("**Requested By**", `${queueSong.requestedby}`).addField("**Upcoming**", `${title}`).setThumbnail(queueSong.thumbnail).setTimestamp().setColor("GREEN"));
    } else {
        return;
    }
}