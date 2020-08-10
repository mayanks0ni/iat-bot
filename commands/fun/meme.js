const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require("random-puppy");

module.exports = class MemeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'meme',
            group: 'fun',
            memberName: 'meme',
            description: 'A Command To Get A Random Meme!',
            examples: ["meme"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const subReddits = ["meme",
                "animemes",
                "MemesOfAnime",
                "animememes",
                "AnimeFunny",
                "dankmemes",
                "dankmeme",
                "wholesomememes",
                "MemeEconomy",
                "techsupportanimals",
                "meirl",
                "me_irl",
                "2meirl4meirl",
                "AdviceAnimals"
            ];

            const random = subReddits[Math.floor(Math.random() * subReddits.length)];

            const img = await randomPuppy(random);
            const memeembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From /r/${random}`)
                .setURL(`https://reddit.com/r/${random}`)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            message.embed(memeembed);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

