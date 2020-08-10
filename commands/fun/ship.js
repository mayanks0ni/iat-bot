const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class ShipCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ship',
            group: 'fun',
            memberName: 'ship',
            description: 'A Command To Get A Ship Image Of The Two Mentioned Users!',
            examples: ["ship [User/User ID] [User/User ID]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            if (message.mentions.users.size < 2) {
                const nousers = new Discord.MessageEmbed()
                    .setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}ship [user 1] [user 2]\`!**`)
                    .setFooter(message.guild.me.displayName)
                    .setColor(0xff0000)
                    .setTimestamp()
                message.embed(nousers);
                return;
            } else {
                let user1 = message.mentions.users.first();
                let user2 = message.mentions.users.last();

                let body = await fetch(`https://nekobot.xyz/api/imagegen?type=ship&&user1=${user1.displayAvatarURL()}&&user2=${user2.displayAvatarURL()}`).then(url => url.json());

                let shipembed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor("RANDOM")
                    .setImage(body.message)
                    .setTimestamp()
                    .setFooter(message.guild.me.displayName)
                message.embed(shipembed);
            }
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

