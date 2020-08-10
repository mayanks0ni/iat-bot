const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const { YTSearcher } = require("ytsearcher");
const config = require("../../config.json");
const play = require("../../functions/play");
const he = require("he");

module.exports = class PLayCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'play',
            aliases: ["p"],
            group: 'music',
            memberName: 'play',
            description: 'A Command To Play A Song!',
            examples: ["play blinding lights", "play https://www.youtube.com/watch?v=4NRXx6U8ABQ"],
            guildOnly: true,
            argsType: "multiple",
        });
    }
    async run(message, args) {
        try {
            const searcher = new YTSearcher({
                key: config.ytkey,
                revealkey: true,
            });
            let link = args.join(" ");
            if (message.member.voice.channel) {
                if (!link) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}play [URL/Name]\`!**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                let result = await searcher.search(link, { type: 'video' });
                const serverQueue = this.client.queue.get(message.guild.id);
                const info1 = await ytdl.getInfo(result.first.url)
                var date = new Date(0);
                date.setSeconds(info1.length_seconds);
                var timeString = date.toISOString().substr(11, 8);
                console.log(timeString);

                const queueSong = {
                    title: he.decode(result.first.title),
                    url: result.first.url,
                    thumbnail: result.first.thumbnails.high.url,
                    channel: he.decode(result.first.channelTitle),
                    requestedby: message.author.tag,
                    duration: timeString,
                    durationSecs: info1.length_seconds,
                    loop: false,
                }
                if (!serverQueue) {
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: message.member.voice.channel,
                        connection: null,
                        songs: [],
                        volume: 5,
                        playing: true
                    };
                    message.embed(new Discord.MessageEmbed().setTitle(`✅ Connected To \`${message.member.voice.channel.name}\`! ✅`).setColor(0xff008b).setFooter(message.guild.me.displayName).setTimestamp());
                    message.embed(new Discord.MessageEmbed().setAuthor(`Song Queued`, `https://cdn.discordapp.com/attachments/564520348821749766/696334217205907516/giphy.gif`).addField("**Queued**", `**[${he.decode(result.first.title)}](${result.first.url})**`).setColor("YELLOW").setFooter(message.guild.me.displayName).setTimestamp());
                    queueContruct.songs.push(queueSong)
                    this.client.queue.set(message.guild.id, queueContruct);
                    try {
                        var connection = await message.member.voice.channel.join();
                        queueContruct.connection = connection;
                        // play(message.guild, queueContruct.songs[0], this.client);
                        queueContruct.songs.splice(0);
                    } catch (err) {
                        console.log(err);
                        this.client.queue.delete(message.guild.id);
                        message.say(`\`${err}\``);
                    }
                } else {
                    message.embed(new Discord.MessageEmbed().setAuthor(`Song Queued`, `https://cdn.discordapp.com/attachments/564520348821749766/696334217205907516/giphy.gif`).addField("**Queued**", `**[${he.decode(result.first.title)}](${result.first.url})**`).setColor("YELLOW").setFooter(message.guild.me.displayName).setTimestamp());
                    serverQueue.songs.push(queueSong);
                }
            } else {
                return message.embed(new Discord.MessageEmbed().setDescription("**You Need To Be In A Voice Channel To Use That Command!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            }
        } catch (error) {
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

