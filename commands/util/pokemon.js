const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = class PokemonCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pokemon',
            aliases: ["pokeinfo", "pokedex", "dex"],
            group: 'util',
            memberName: 'pokemon',
            description: 'A Command To Get The Information Of The Specified Pokémon!',
            examples: ["pokemon [Pikachu]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        let name = args.join(" ");
        if (!name) return message.embed(new Discord.MessageEmbed().setDescription(`**This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}pokemon [Name]\`!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        try {
            const url = `https://some-random-api.ml/pokedex?pokemon=${name}`;
            let res;
            res = await fetch(url).then(url => url.json())
            const pokeinfo = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle(`Info Of ${res[0].name.charAt(0).toUpperCase() + res[0].name.slice(1)} Pokémon!`)
                .addField('**Name**', `**${res[0].name.charAt(0).toUpperCase() + res[0].name.slice(1)}**`)
                .addField('**Type**', `**${res[0].type.join(", ") || "None"}**`)
                .addField('**Species**', `**${res[0].species.join(", ")}**`)
                .addField('**Abilities**', `**${res[0].abilities.join(", ")}**`)
                .addField('**Height**', `**${res[0].height}**`)
                .addField('**Weight**', `**${res[0].weight}**`)
                .addField('**Base Experience**', `**${res[0].base_experience}**`)
                .addField('**Gender**', `**${res[0].gender.join(", ") || "None"}**`)
                .addField('**Egg Groups**', `**${res[0].egg_groups.join(", ") || "None"}**`)
                .addField('**Stats**', `**Hp - ${res[0].stats.hp}\nAttack - ${res[0].stats.attack}\nDefense - ${res[0].stats.defense}\nSp_Atk - ${res[0].stats.sp_atk}\nSp_Def - ${res[0].stats.sp_def}\nSpeed - ${res[0].stats.speed}\nTotal - ${res[0].stats.total}**`)
                .addField('**Evolution**', `**${res[0].family.evolutionLine.join(", ") || "None"}**`)
                .addField('**Description**', `**${res[0].description}**`)
                .addField('**Generation**', `**${res[0].generation}**`)
                .setThumbnail(res[0].sprites.normal)
                .setColor("GOLD")
            message.channel.send(pokeinfo);
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Couldn't Find That Pokémon!\nError: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

